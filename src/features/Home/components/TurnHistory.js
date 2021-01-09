import {
	Box, makeStyles, Typography, List,
	ListItem,
	ListItemAvatar,
	ListItemText,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
	root: {
		height: 550,
		border: '4px solid #ff7b54',
		borderRadius: 5,
		width: 180,
	},
	containerTitle: {
		backgroundColor: '#ff7b54',
		padding: 5,
	},
	title: {
		// color: 'white',
	},
	body: {
		height: 'calc(550px - 38px)',
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

const formatPosition = (position) => {
	let result = { x: 0, y: 0 };
	result.x = Math.floor(position / 20);
	result.y = position - 20 * result.x;
	return result;
}

function TurnHistory({ list = [], onChangeMoveIndex = () => {} }) {
	const classes = useStyles();
	const [selectedIndex, setSelectedIndex] = useState(null);
	const { isWatchingHistory } = useSelector(state => state.history);

	const handleChangeMoveIndex = (index) => {
		onChangeMoveIndex(index + 1);
		setSelectedIndex(index);
	}

	return (
		<div className={classes.root}>
			<Box display="flex" justifyContent="center" className={classes.containerTitle} >
				<Typography variant="subtitle1" className={classes.title}>Turn History</Typography>
			</Box>
			<div className={classes.body}>
				<List>
					{list && list.map(
						({ position, value }, index) => (
							<ListItem key={index} button selected={selectedIndex === index} onClick={() => handleChangeMoveIndex(index)} disabled={!isWatchingHistory}>
								<ListItemAvatar>
									<span>
										{`${index + 1}.`}
									</span>
								</ListItemAvatar>
								<ListItemText>
									{value === 0 ?
										<span className={classes.xPlayer}>
											X
										</span> :
										<span className={classes.oPlayer}>
											O
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