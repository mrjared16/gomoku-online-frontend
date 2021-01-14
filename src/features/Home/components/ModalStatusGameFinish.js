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
import TypographyCustom from 'components/TypographyCustom';

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
	username: {
		width: 100,
		textAlign: 'center',
	}
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
	rankRecords = [],
	gameEndingType = '',
}) {
	const classes = useStyles();

	const getTitleStatusGameFinish = () => {
		if (isDraw)
			// return 'Draw';
			return 'Tie';
		if (isPlayer === -1) {
			return (isXWin ? 'X Player win' : 'O Player win');
		}
		return ((isPlayer === 0 && isXWin) || (isPlayer === 1 && !isXWin)) ? 'You win' : 'You lose';

	}
	const getTitleClass = {
		// 'Draw': classes.draw,
		'Tie': classes.draw,
		'X Player win': classes.xWin,
		'O Player win': classes.oWin,
		'You win': classes.win,
		'You lose': classes.lose,
	}

	const renderRankRecord = (rankRecord, isWinner) => {
		if (!rankRecord || rankRecord.length === 0) return;
		const { newRank, oldRank } = rankRecord;
		if (isWinner) {
			return <span style={{ color: 'green' }}>{`${newRank} (+${newRank - oldRank})`}</span>
		} else {
			return <span style={{ color: 'red' }}>{`${newRank} (-${oldRank - newRank})`}</span>
		}
	}

	const renderGameEndingType = (type) => {
		if (!type || type === 'normal') return;
		if (type === 'timeout' || type === 'quit' || type === 'surrender') {
			// return <span>{isXWin ? `${OPlayer?.username} (O)` : `${XPlayer?.username} (X)`} {type}</span>
			return <span>{`${isXWin ? 'O' : 'X'} ${type}`}</span>
		}
	}

	const title = getTitleStatusGameFinish();
	return (
		<Dialog open={open} onClose={toggle} className={classes.root}>
			<DialogContent>
				<div className={classes.content}>
					<Box display='flex' flexDirection='column' alignItems='center'>
						<Typography variant="h4" className={getTitleClass[title]}>{title}</Typography>
						<Typography variant="subtitle1">Duration: {moment.unix(duration).format('mm:ss')}</Typography>
						{renderGameEndingType(gameEndingType)}
					</Box>
					<Box display='flex' justifyContent='space-around'>
						<div className={classes.playerInfo}>
							<AvatarCustom online={true} photo={XPlayer?.photo} />
							{/* <span>{XPlayer?.username}</span> */}
							<div className={classes.username}>
								<TypographyCustom text={XPlayer?.username} />
							</div>
							<div className={classes.elo}>
								<Icon className="fas fa-trophy" style={{ color: 'yellow', width: 'fit-content' }} />
								{rankRecords.length !== 0 && renderRankRecord(rankRecords[0], isXWin)}
							</div>
						</div>
						<div className={classes.playerInfo}>
							<AvatarCustom online={true} photo={OPlayer?.photo} />
							{/* <span>{OPlayer?.username}</span> */}
							<div className={classes.username}>
								<TypographyCustom text={OPlayer?.username} />
							</div>
							<div className={classes.elo}>
								<Icon className="fas fa-trophy" style={{ color: 'yellow', width: 'fit-content' }} />
								{rankRecords.length !== 0 && renderRankRecord(rankRecords[1], !isXWin)}
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
