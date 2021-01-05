import { Box, CircularProgress, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
	loading: {
		height: '100%',
		width: '100%',
	}
}));

function Loading(props) {
	const classes = useStyles();

	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			className={classes.loading}
		>
			<CircularProgress color="secondary" size={30} />
		</Box>
	);
}

export default Loading;