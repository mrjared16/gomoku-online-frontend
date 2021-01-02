import {
	Box, makeStyles, Typography, List,
	ListItem,
	ListItemAvatar,
	ListItemText,
} from '@material-ui/core';
import { range } from 'lodash';
import React from 'react';

const useStyles = makeStyles({
	root: {
		height: 'calc(100% - 38px)',
		border: '4px solid #d4a531',
		borderRadius: 5,
		width: '161px',
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
		overflow: 'auto',
	},
	xPlayer: {
		color: 'red',
		marginRight: 3,
	},
	oPlayer: {
		color: 'green',
		marginRight: 3,
	},
})

const test = range(0, 20, 1).map(index => (
	{
		id: index,
		position: index,
		player: index % 2 === 0 ? 'X' : 'O',
	}
))

const formatPosition = (position) => {
	let result = { x: 0, y: 0 };
	result.x = Math.floor(position / 20);
	result.y = position - 20 * result.x;
	return result;
}

function TurnHistory({ list = [] }) {
	const classes = useStyles();
	list = test;

	return (
		<div className={classes.root}>
			<Box display="flex" justifyContent="center" className={classes.containerTitle} >
				<Typography variant="subtitle1" className={classes.title}>Turn History</Typography>
			</Box>
			<div className={classes.body}>
				<List>
					{list && list.map(
						({ id, position, player }, index) => (
							<ListItem key={id} button>
								<ListItemAvatar>
									{`${index + 1}.`}
								</ListItemAvatar>
								<ListItemText>
									{player.toLowerCase() === 'x' ?
										<span className={classes.xPlayer}>
											{player}
										</span> :
										<span className={classes.oPlayer}>
											{player}
										</span>}

									{`(${formatPosition(position).x}, ${formatPosition(position).y})`}
								</ListItemText>
							</ListItem>
						)
					)}
				</List>
			</div>
		</div>
	);
}

export default TurnHistory;