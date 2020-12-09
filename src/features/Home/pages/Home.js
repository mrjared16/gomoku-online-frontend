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
		online: true,
		fullname: name,
		photo: "",
		// time: null
	}
}

function Home() {
	const classes = useStyles();
	const [list, setList] = useState([]);
	// const { token } = useSelector(state => state.user);
	// TODO: get Token here
	const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YjQzOWExNC04ODViLTQxOGUtYjQ2My05YzQxZDFmYjg2NzEiLCJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaWF0IjoxNjA3NTA2OTg4fQ.-cklTx8PdHrJ7FOdj-jFJ7SV77s3YBWViMNMWKEc6OY'
	// const socketRef = useRef();
	const fetchUsers = () => {
		axiosClient.get(`http://localhost:3001/game`)
			.then((response) => {
				const { users } = response;
				const userMap = users.map(user => {
					const convertedUser = userDTOToProp(user);
					console.log({ user, convertedUser });
					return convertedUser;
				});
				console.log({ userMap });
				setList(list => userMap);
			});
	}
	useEffect(() => {
		const socketClient = socketIOClient(`${process.env.REACT_APP_SOCKET_URL}/game`, {
			transports: ['websocket'],
			query: { token }
		});
		console.log('component mount');
		console.log({ socketClient });
		socketClient.emit('initial-client', (e) => {
			console.log('first emit to server');
			console.log(e);
		});

		socketClient.on('initial-server', (e) => console.log(e));

		socketClient.on('new user connected', (user) => {
			console.log({ user });
			const { id, username } = user;
			setList(currentList => {
				const newUserList = currentList.concat([{
					online: true,
					fullName: username,
					photo: "",
					time: null
				}]);
				return newUserList;
			});
		});

		socketClient.on('new user disconnected', (user) => {
			console.log({ user });
			const { id } = user;
			setList(currentList => {
				const newUserList = currentList.filter(user => user.id != id);
				return newUserList
			});
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
