import {
	Box, makeStyles, Typography, List,
	ListItem,
	ListItemAvatar,
	ListItemText,
} from '@material-ui/core';
import React, { useState } from 'react';

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

const formatPosition = (position) => {
	let result = { x: 0, y: 0 };
	result.x = Math.floor(position / 20);
	result.y = position - 20 * result.x;
	return result;
}

function TurnHistory({ list = [], onChangeMoveIndex = () => {} }) {
	const classes = useStyles();
	const [selectedIndex, setSelectedIndex] = useState(null);

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
							<ListItem key={index} button selected={selectedIndex === index} onClick={() => handleChangeMoveIndex(index)}>
								<ListItemAvatar>
									{`${index + 1}.`}
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