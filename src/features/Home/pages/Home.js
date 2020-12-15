import { Grid, makeStyles, Button } from "@material-ui/core";
import React, { useState, useRef, useEffect } from "react";
import ListUserStatus from "features/Home/components/ListUserStatus";
import { range } from "lodash";

import { useSelector } from 'react-redux';
import socketIOClient from "socket.io-client";
import axiosClient from "api/axiosClient";



const useStyles = makeStyles({
	root: {
		height: "calc(100vh - 48px)",
		"& .MuiGrid-container": {
			height: "100%",
			"& .MuiGrid-item": {
				maxHeight: "100%",
				overflow: "auto",
				"&::-webkit-scrollbar": {
					width: "0.3em",
				},
				"&::-webkit-scrollbar-track": {
					boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
					webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
				},
				"&::-webkit-scrollbar-thumb": {
					backgroundColor: "#d4a531",
				},
			}
		}
	}
})

function userDTOToProp({ id, username, name }) {
	return {
		id: id,
		online: true,
		fullName: name,
		photo: "",
		// time: null
	}
}

const handleChangeListUserEvent = {
	'connected': (setState, user) => {
		setState(current => {
			return current.concat[{ user }]
		});
	},
	'disconnected': (setState, user) => {
		setState(current => {
			return current.filter(e => e.id != user.id);
		});
	}
}

function Home() {
	const classes = useStyles();
	const [list, setList] = useState([]);
	const { token } = useSelector(state => state.user);

	const fetchUsers = () => {
		axiosClient.get(`${process.env.REACT_APP_API_URL}/waitingRoom`)
			.then((response) => {
				const { users } = response;
				const userMap = users.map(user => {
					const convertedUser = userDTOToProp(user);
					return convertedUser;
				});
				setList(list => userMap);
			});
	}


	useEffect(() => {
		const socketClient = socketIOClient(`${process.env.REACT_APP_SOCKET_URL}/waitingRoom`, {
			transports: ['websocket'],
			upgrade: false,
			query: { token }
		});
		console.log({ socketClient });
		socketClient.on('connect', () => {
			socketClient.emit('ping');
			console.log('connect');
		})
		socketClient.on('userEventMsg', (response) => {
			console.log({ response });
			const { user, event } = response;
			if (user == 'anonymous') {
				return;
			}
			handleChangeListUserEvent[event](setList, user);
		});

		fetchUsers();

		return () => {
			socketClient.close();
		}
	}, []);


	return (
		<div className={classes.root}>
			<Grid container>
				<Grid item xs={9}></Grid>
				<Grid item xs={3}>
					<Button variant='outlined' onClick={() => fetchUsers()}>Load</Button>
					<ListUserStatus list={list} />
				</Grid>
			</Grid>
		</div>
	);
}

export default Home;
