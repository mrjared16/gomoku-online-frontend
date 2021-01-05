import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = (width, height) => makeStyles({
	root: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: width,
		width: height,
		backgroundColor: '#939b62',
		borderRadius: 5,
		color: 'white',
	}
})

function RankCustom({ title = '', width = 25, height = 25 }) {
	const classes = useStyles(width, height)();

	return (
		<div className={classes.root}>
			{title}
		</div>
	);
}

export default RankCustom;