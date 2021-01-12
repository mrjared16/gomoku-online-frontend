import {
	Dialog,
	DialogActions,
	makeStyles,
	Button,
	DialogContent,
	DialogTitle,
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
	root: {
		'& .MuiDialog-paper': {
			width: 400,
		},
	},
});

function ModalRequestTie({
	open = false,
	toggle = () => { },
	onSubmit = () => { },
	userInfo,
}) {
	const classes = useStyles();

	const handleSubmit = () => {
		onSubmit();
		toggle();
	}

	return (
		<Dialog open={open} onClose={toggle} className={classes.root}>
			<DialogTitle>{userInfo && userInfo?.username} sent you request tie</DialogTitle>
			<DialogActions>
				<Button
					variant="contained"
					color="primary"
					onClick={handleSubmit}
					size="small"
				>
					Accept
				</Button>
				<Button
					variant="contained"
					color="secondary"
					onClick={toggle}
					size="small"
				>
					Decline
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default ModalRequestTie;
