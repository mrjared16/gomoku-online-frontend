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

function ModalConfirmAction({
	open = false,
	toggle = () => { },
	onSubmit = () => { },
	title = '',
}) {
	const classes = useStyles();

	return (
		<Dialog open={open} onClose={toggle} className={classes.root}>
			<DialogTitle>{title}</DialogTitle>
			<DialogActions>
				<Button
					variant="contained"
					color="primary"
					// className="text-white"
					onClick={onSubmit}
					size="small"
				>
					Yes
				</Button>
				<Button
					variant="contained"
					color="secondary"
					// className="text-white"
					onClick={toggle}
					size="small"
				>
					No
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default ModalConfirmAction;
