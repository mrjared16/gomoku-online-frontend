import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = (width, height, color) => makeStyles({
	root: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: width,
		width: height,
		backgroundColor: color,
		borderRadius: 5,
	}
})

function RankCustom({ symbol, width = 25, height = 25 }) {
	const { color = '#e27802', title = 'B' } = symbol;
	const classes = useStyles(width, height, color)();

	return (
		<div className={classes.root}>
			{title}
		</div>
	);
}

export default RankCustom;