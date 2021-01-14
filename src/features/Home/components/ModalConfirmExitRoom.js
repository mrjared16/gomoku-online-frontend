import {
	Dialog,
	DialogActions,
	DialogTitle,
	makeStyles,
	Button,
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
	root: {
		'& .MuiDialog-paper': {
			width: 400,
		},
	},
});

function ModalConfirmExitRoom({
	open = false,
	toggle = () => { },
	onSubmit = () => { },
}) {
	const classes = useStyles();

	return (
		<Dialog open={open} onClose={toggle} className={classes.root}>
			<DialogTitle>Are you sure leave room?</DialogTitle>
			<DialogActions>
				<Button
					variant="contained"
					color="primary"
					onClick={onSubmit}
					size="small"
				>
					Yes
				</Button>
				<Button
					variant="contained"
					color="secondary"
					onClick={toggle}
					size="small"
				>
					No
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default ModalConfirmExitRoom;
