import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	makeStyles,
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
	root: {
		'& .MuiDialog-paper': {
			width: 300,
		},
	},
});

function ModalMatchMaking({
	open = false,
	toggle = () => { },
	onAccept = () => { },
	onDecline = () => { },
}) {
	const classes = useStyles();

	const handleAccept = () => {
		onAccept();
		toggle();
	};

	const handleDecline = () => {
		onDecline();
		toggle();
	};

	return (
		<Dialog open={open} onClose={toggle} className={classes.root}>
			<DialogTitle>Matchmaking Status</DialogTitle>
			<DialogContent>
				<Box
					display="flex"
					justifyContent="center"
				>
					Your game is ready					
				</Box>
			</DialogContent>
			<DialogActions>
				<Button
					variant="contained"
					color="primary"
					onClick={handleAccept}
					size="small"
				>
					Accept
        </Button>
				<Button
					variant="contained"
					color="secondary"
					onClick={handleDecline}
					size="small"
				>
					Decline
        </Button>
			</DialogActions>
		</Dialog>
	);
}

export default ModalMatchMaking;
