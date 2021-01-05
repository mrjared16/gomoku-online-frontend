import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
	root: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%',
		width: '100%',
		backgroundColor: '#939b62',
		borderRadius: 5,
		color: 'white',
	}
})

function RankCustom({ title = '' }) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			{title}
		</div>
	);
}

export default RankCustom;