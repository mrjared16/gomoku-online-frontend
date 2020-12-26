import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	makeStyles,
	Button,
	Typography,
	Icon,
} from '@material-ui/core';
import AvatarCustom from 'components/AvatarCustom';
import React from 'react';

const useStyles = makeStyles({
	root: {
		'& .MuiDialog-paper': {
			width: 400,
		},
	},
	content: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	winner: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		'& h5': {
			color: 'green',
			marginBottom: 10,
		},
		'& span': {
			marginTop: 10,
			marginLeft: 5,
		},
	},
	loser: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		'& h5': {
			color: 'grey',
			marginBottom: 10,
		},
		'& span': {
			marginTop: 10,
			marginLeft: 5,
		},
	},
	elo: {
		display: 'flex',
		alignItems: 'flex-end',
	}
});

function ModalStatusGameFinish({
	open = false,
	toggle = () => { },
	onSubmit = () => { },
	winnerInfo = {
		name: '',
		photo: '',
	},
	loserInfo = {
		name: '',
		photo: '',
	},
}) {
	const classes = useStyles();

	return (
		<Dialog open={open} onClose={toggle} className={classes.root}>
			<DialogContent>
				<div className={classes.content}>
					<div className={classes.winner}>
						<Typography variant="h5">WINNER</Typography>
						<AvatarCustom online={true} photo={winnerInfo?.photo} />
						<span>{winnerInfo?.name}</span>
						<div className={classes.elo}>
							<Icon className="fas fa-trophy" style={{color: 'yellow', width: 'fit-content'}} />
							<span>+25</span>
						</div>
					</div>
					<div className={classes.loser}>
						<Typography variant="h5">LOSER</Typography>
						<AvatarCustom online={true} photo={loserInfo?.photo} />
						<span>{loserInfo?.name}</span>
						<div className={classes.elo}>
							<Icon className="fas fa-trophy" style={{color: 'yellow', width: 'fit-content'}} />
							<span>-25</span>
						</div>
					</div>
				</div>
			</DialogContent>
			<DialogActions>
				<Button
					variant="contained"
					color="primary"
					// className="text-white"
					onClick={toggle}
				>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default ModalStatusGameFinish;
