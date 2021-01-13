import { makeStyles } from '@material-ui/core';
import axiosClient from 'api/axiosClient';
import { setUser, setLoadingProfile } from 'app/userSlice';
import Header from 'components/Header';
import Main from 'features/Home/pages/Main';
import RoomPage from 'features/Home/pages/RoomPage';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import { userDTOToProp } from 'utils/mapResponseToProp';
import LeaderBoard from './pages/LeaderBoard';
import userApi from 'api/userApi';
import History from 'features/Home/pages/History';
import WatchingHistory from './pages/WatchingHistory';
import ModalInviteJoinRoom from './components/ModalInviteJoinRoom';
import ModalMatchMaking from './components/ModalMatchMaking';
import PrivateRoomRoute from 'components/PrivateRoomRoute';

const useStyles = makeStyles({
	root: {
		height: 'calc(100vh - 48px)',
	},
	listUserStatus: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		padding: '20px 10px 10px 0px',
	},
});

const handleOnlineUsersOnchangeEvent = {
	connected: (setState, user) => {
		setState((current = []) => {
			if (!!current.find((item) => item.id == user.id)) return current;
			return current.concat([{ ...userDTOToProp(user) }]);
		});
	},
	disconnected: (setState, user) => {
		setState((current = []) => current.filter((e) => e.id !== user.id));
	},
};
let socketClient;
function Home() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();

	const [onlineUsers, setOnlineUsers] = useState([]);

	const [openModalInvite, setOpenModalInvite] = useState(false);
	const [roomIDInvite, setRoomIDInvite] = useState(null);
	const [userInfoInvite, setUserInfoInvite] = useState(null);

	const [openModalMatchMaking, setOpenModalMatchMaking] = useState(false);
	const [roomIDMatchMaking, setRoomIDMatchMaking] = useState(null);

	const { token } = useSelector((state) => state.user);

	const fetchUserData = async () => {
		const response = await userApi.fetch();
		dispatch(setUser(response));
		dispatch(setLoadingProfile(false));
	};

	const fetchOnlineUsers = () => {
		axiosClient
			.get(`${process.env.REACT_APP_API_URL}/waitingRoom`)
			.then((response) => {
				const { users } = response;
				const userMap = users.map((onlineUser) => {
					const { user, roomID, isPlayingGame } = onlineUser;
					const convertedUser = userDTOToProp(user, roomID);
					return convertedUser;
				});
				setOnlineUsers((list) => userMap);
			});
	};

	useEffect(() => {
		fetchOnlineUsers();
		fetchUserData();
	}, [token]);

	useEffect(() => {
		socketClient = socketIOClient(
			`${process.env.REACT_APP_SOCKET_URL}/waitingRoom`,
			{
				transports: ['websocket'],
				upgrade: false,
				query: { token },
			}
		);

		socketClient.on('userEventMsg', (response) => {
			const { user, event } = response;
			if (user === 'anonymous') {
				return;
			}
			handleOnlineUsersOnchangeEvent[event](setOnlineUsers, user);
		});

		socketClient.on('reconnectEventMsg', (response) => {
			console.log('receive reconnectEventMsg: ', response);
			const { roomID } = response;
			history.push(`/rooms/${roomID}`);
		})

		socketClient.on('roomEventMsg', (response) => {
			console.log('receive roomEventMsg: ', response);
			const { event, data } = response;
			if (event === 'invite') {
				const { roomID, host } = data;
				setRoomIDInvite(roomID);
				const mapHost = userDTOToProp(host);
				setUserInfoInvite(mapHost);
				setOpenModalInvite(true);
			}
		})

		return () => {
			socketClient.off('userEventMsg', () => { });
			socketClient.off('reconnectEventMsg', () => { });
			socketClient.close();
		};
	}, [token]);

	const handleInviteUser = (username) => {
		socketClient.emit('room', {
			action: 'invite',
			data: {
				token: token,
				username: username,
			}
		})
	}

	const handleAcceptInvite = () => {
		history.push(`/rooms/${roomIDInvite}`);
	}

	const handleAcceptMatchMaking = () => {

	}

	return (
		<>
			<Header />
			<div className={classes.root}>
				<Switch>
					<Route exact path="/" component={() => <Main onlineUsers={onlineUsers} onInvite={handleInviteUser} />} />
					{/* <Route exact path="/rooms/:id" component={RoomPage} /> */}
					<PrivateRoomRoute exact path="/rooms/:id" component={RoomPage} />
					<Route exact path="/rank" component={LeaderBoard} />
					<Route exact path="/history" component={History} />
					<Route exact path="/watching-history/:id" component={WatchingHistory} />
				</Switch>
				<ModalInviteJoinRoom open={openModalInvite} toggle={() => setOpenModalInvite(!openModalInvite)} onAccept={handleAcceptInvite} userInfo={userInfoInvite} />
				<ModalMatchMaking open={openModalMatchMaking} toggle={() => setOpenModalMatchMaking(!openModalMatchMaking)} onAccept={handleAcceptMatchMaking} />
			</div>
		</>
	);
}

export default Home;
