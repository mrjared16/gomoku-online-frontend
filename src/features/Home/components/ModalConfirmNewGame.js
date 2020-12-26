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

function ModalConfirmNewGame({
	open = false,
	toggle = () => { },
	onSubmit = () => { },
}) {
	const classes = useStyles();

	return (
		<Dialog open={open} onClose={toggle} className={classes.root}>
			<DialogTitle>Are you sure create new game?</DialogTitle>
			<DialogActions>
				<Button
					variant="contained"
					color="primary"
					// className="text-white"
					onClick={onSubmit}
				>
					Yes
				</Button>
				<Button
					variant="contained"
					color="secondary"
					// className="text-white"
					onClick={toggle}
				>
					No
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default ModalConfirmNewGame;
