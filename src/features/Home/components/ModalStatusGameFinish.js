import {
	Dialog,
	DialogActions,
	DialogContent,
	makeStyles,
	Button,
	Typography,
	Icon,
	Box,
} from '@material-ui/core';
import AvatarCustom from 'components/AvatarCustom';
import React from 'react';
import moment from 'moment';

const useStyles = makeStyles({
	root: {
		'& .MuiDialog-paper': {
			width: 400,
		},
	},
	content: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		paddingTop: 20,
	},
	playerInfo: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		'& span': {
			marginTop: 10,
			marginLeft: 5,
		},
	},
	elo: {
		display: 'flex',
		alignItems: 'flex-end',
	},
	draw: {
		color: 'blue',
	},
	win: {
		color: 'green',
	},
	lose: {
		color: 'red'
	},
	xWin: {
		color: 'red',
	},
	oWin: {
		color: 'green',
	},
});

function ModalStatusGameFinish({
	open = false,
	toggle = () => { },
	duration = 0,
	XPlayer = {
		name: '',
		photo: '',
	},
	OPlayer = {
		name: '',
		photo: '',
	},
	isDraw = false,
	isXWin = false,
	isPlayer = -1,
}) {
	const classes = useStyles();
	const getTitleStatusGameFinish = () => {
		if (isDraw)
			return 'Draw';
		if (isPlayer === -1) {
			return (isXWin ? 'X Player win' : 'O Player win');
		}
		return (isPlayer === 0 && isXWin || isPlayer === 1 && !isXWin) ? 'You win' : 'You lose';

	}
	const getTitleClass = {
		'Draw': classes.draw,
		'X Player win': classes.xWin,
		'O Player win': classes.oWin,
		'You win': classes.win,
		'You lose': classes.lose,
	}

	const title = getTitleStatusGameFinish();
	return (
		<Dialog open={open} onClose={toggle} className={classes.root}>
			<DialogContent>
				<div className={classes.content}>
					<Box display='flex' flexDirection='column' alignItems='center'>
						<Typography variant="h4" className={getTitleClass[title]}>{title}</Typography>
						<Typography variant="subtitle">{moment(duration * 1000).format('mm:ss')}</Typography>
					</Box>
					<Box display='flex' justifyContent='space-around'>
						<div className={classes.playerInfo}>
							<AvatarCustom online={true} photo={XPlayer?.photo} />
							<span>{XPlayer?.username}</span>
							<div className={classes.elo}>
								<Icon className="fas fa-trophy" style={{ color: 'yellow', width: 'fit-content' }} />
								<span style={{ color: 'green' }}>50 (+25)</span>
							</div>
						</div>
						<div className={classes.playerInfo}>
							<AvatarCustom online={true} photo={OPlayer?.photo} />
							<span>{OPlayer?.username}</span>
							<div className={classes.elo}>
								<Icon className="fas fa-trophy" style={{ color: 'yellow', width: 'fit-content' }} />
								<span style={{ color: 'red' }}>25 (-25)</span>
							</div>
						</div>
					</Box>
				</div>
			</DialogContent>
			<DialogActions>
				<Button
					variant="contained"
					color="secondary"
					onClick={toggle}
					size="small"
				>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default ModalStatusGameFinish;
