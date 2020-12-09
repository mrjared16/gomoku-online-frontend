import { Grid, makeStyles } from "@material-ui/core";
import React, { useState, useRef, useEffect } from "react";
import ListUserStatus from "features/Home/components/ListUserStatus";
import { range } from "lodash";
import socketIOClient from "socket.io-client";
import { useSelector } from 'react-redux';


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

var socket = socketIOClient('localhost:3001', {
	transports: ['websocket']
});;

function Home() {
	const classes = useStyles();
	const [list, setList] = useState([]);
	const { token } = useSelector(state => state.user);
	const socketRef = useRef();
	useEffect(() => {
		if (socket) {
			return;
		}

		socket.on('new user connected', (user) => {
			const { id, username } = user;
			setList(currentList => {
				const newUserList = list.concat([{
					online: true,
					fullName: username,
					photo: "",
					time: null
				}]);
				return newUserList
			});
		});
		socket.on('new user disconnected', (user) => {
			const { id } = user;
			setList(currentList => {
				const newUserList = currentList.filter(user => user.id != id);
				return newUserList
			});
		});
		socket.emit('first');
		console.log('test emit');
	}, []);

	return (
		<div className={classes.root}>
			<Grid container>
				<Grid item xs={10}></Grid>
				<Grid item xs={2}>
					<ListUserStatus list={list} />
				</Grid>
			</Grid>
		</div>
	);
}

export default Home;
