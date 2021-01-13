import HeaderOption from 'features/Home/components/HeaderOption';
import ListRoom from 'features/Home/components/ListRoom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { roomSocket } from 'socket/roomSocket';
import axiosClient from 'api/axiosClient';
import { Grid, makeStyles } from '@material-ui/core';
import HomeInfoLeft from '../components/HomeInfoLeft';
import { find } from 'lodash';
import { showToast } from 'utils/showToast';

const DEFAULT_ROOM_RESPONSE = {
	id: '',
	host: {
		id: '',
		name: '',
		username: '',
	},
	players: { X: null, O: null },
	numberOfUsers: 0,
	roomOption: {
		boardSize: 20,
		hasPassword: false,
		time: 60,
	},
	gameID: null,
};

function roomDTOToProp({
	id,
	host,
	players,
	numberOfUsers,
	roomOption,
	gameID,
}) {
	const XPlayer =
		players['X'] && players['X'].name && players['X'].username
			? {
				name: players['X'].name,
				photo: '',
				username: players['X'].username,
			}
			: {};
	const OPlayer =
		players['O'] && players['O'].name && players['O'].username
			? {
				name: players['O'].name,
				photo: '',
				username: players['O'].username,
			}
			: null;
	const roomConverted = {
		id,
		host,
		XPlayer: { ...XPlayer },
		OPlayer: { ...OPlayer },
		numberOfUsers,
		roomOption,
		gameID,
	};
	return roomConverted;
}

const handleRoomListOnchangeEvent = {
	roomUpdated: (
		setRoomList,
		{
			id,
			host,
			players = { X: null, O: null },
			numberOfUsers = 0,
			roomOption,
			gameID,
		} = DEFAULT_ROOM_RESPONSE
	) => {
		setRoomList((current = []) => {
			if (!host) {
				return current.filter((room) => room.id !== id);
			}
			const changedRoom = {
				...roomDTOToProp({
					id,
					players,
					host,
					numberOfUsers,
					roomOption,
					gameID,
				}),
			};
			if (!!current.find((item) => item.id === id))
				return current.map((currentRoom) => {
					// const { id } = currentRoom;
					if (currentRoom.id === id) {
						return changedRoom;
					}
					return currentRoom;
				});

			return current.concat([changedRoom]);
		});
	},
};

const useStyles = makeStyles({
	root: {
		height: '100%',
		'& nav': {
			display: 'flex',
			flexDirection: 'column',
			height: 'calc(100% - 16px)',
		},
		'& .MuiCollapse-entered': {
			flexGrow: 1,
			overflow: 'auto',
		}
	},
	homeInfoLeft: {
		padding: '4px 0px',
		height: '100%',
	}
})

function Main({ onlineUsers = [], onInvite = () => {} }) {
	const classes = useStyles();
	const [roomList, setRoomList] = useState([]);
	const history = useHistory();
	const { token } = useSelector((state) => state.user);
	const [roomSelected, setRoomSelected] = useState(null);
	const [loading, setLoading] = useState(true);
	const [isFinding, setIsFinding] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		fetchRooms();
	}, []);

	useEffect(() => {
		roomSocket.on('waitingRoomEventMsg', (response) => {
			const { data, event } = response;
			console.log('receive waitingRoomEventMsg emit: ', { response });
			handleRoomListOnchangeEvent[event](setRoomList, data);
		});

		return () => {
			roomSocket.off('waitingRoomEventMsg');
		};
	}, [token]);

	const fetchRooms = async () => {
		axiosClient
			.get(`${process.env.REACT_APP_API_URL}/rooms`)
			.then((response) => {
				const { rooms } = response;
				const roomsProp = rooms.map((room) => {
					const convertedRoom = roomDTOToProp(room);
					return convertedRoom;
				});
				setRoomList((list) => roomsProp);
				setLoading(false);
			});
	};

	const handleCreateRoom = (values) => {
		const { password, boardSize, time } = values;

		roomSocket.emit(
			'create',
			{
				token: token,
				roomOption: {
					password: password,
					boardSize: boardSize,
					time: time,
				}
			},
			(response) => {
				console.log('create room response', { response });
				if (!response) return;
				const { roomID } = response;
				history.push(`/rooms/${roomID}`);
			}
		);
	};

	const handleJoinClick = () => {
		if (!roomSelected) return;
		history.push(`/rooms/${roomSelected.id}`);
	};

	const handleRoomSelected = (row) => {
		setRoomSelected(row.data);
	};

	const handleQuickPlayClick = () => {
		setIsFinding(!isFinding);
	};

	const handleJoinWithIDClick = (id) => {
		if (!id) return;
		if (!find(roomList, { id })) {
			showToast('error', 'Room is not exist');
			return;
		}
		history.push(`/rooms/${id}`);
	};

	return (
		<Grid container className={classes.root}>
			<Grid item xs={2} className={classes.homeInfoLeft}>
				<HomeInfoLeft onlineUsers={onlineUsers} onInvite={onInvite} />
			</Grid>
			<Grid item xs={10}>
				<HeaderOption onCreateRoom={handleCreateRoom} onJoinRoomWithID={handleJoinWithIDClick} />
				<ListRoom
					loading={loading}
					list={roomList}
					onRoomSelected={handleRoomSelected}
					onJoin={handleJoinClick}
					roomSelected={roomSelected}
					isFinding={isFinding}
					onQuickPlay={handleQuickPlayClick}
				/>
			</Grid>
		</Grid>
	);
}

export default Main;
