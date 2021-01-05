import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
	root: {
		overflow: "hidden",
		maxWidth: '100%',
		"& h6": {
			whiteSpace: "nowrap",
			overflow: "hidden",
			textOverflow: "ellipsis",
		},
	}
})

function TypographyCustom({ text = '', variant = 'subtitle1', className = "" }) {
	const classes = useStyles();

	return (
		<div className={classes.root + ' ' + className}>
			<Typography variant={variant}>{text}</Typography>
		</div>
	);
}

export default TypographyCustom;