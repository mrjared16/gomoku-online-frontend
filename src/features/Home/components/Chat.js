import {
	Box, makeStyles, Typography
} from '@material-ui/core';
import { range } from 'lodash';
import React from 'react';

const useStyles = makeStyles({
	root: {
		height: 'calc(100% - 38px)',
		border: '4px solid #d4a531',
		borderRadius: 5,
		width: 300,
		marginRight: 30,
	},
	containerTitle: {
		backgroundColor: '#d4a531',
		padding: 5,
	},
	title: {
		color: 'white',
	},
	body: {
		height: 'calc(100% - 38px)',
	},
})

const test = range(0, 20, 1).map(index => (
	{
		id: index,
		position: index,
		player: index % 2 === 0 ? 'X' : 'O',
	}
))

function Chat({ list = [] }) {
	const classes = useStyles();
	list = test;

	return (
		<div className={classes.root}>
			<Box display="flex" justifyContent="center" className={classes.containerTitle} >
				<Typography variant="subtitle1" className={classes.title}>Chat</Typography>
			</Box>
			<div className={classes.body}>
			</div>
		</div>
	);
}

export default Chat;