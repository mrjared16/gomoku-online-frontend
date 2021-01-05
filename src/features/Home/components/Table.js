import { Box, Icon, makeStyles } from '@material-ui/core';
import AvatarCustom from 'components/AvatarCustom';
import React from 'react';
import Timer from './Timer';
import BrushIcon from '@material-ui/icons/Brush';
import LeaveTableButton from './LeaveTableButton';
import KickButton from './KickButton';

const useStyles = makeStyles({
	root: {
		display: 'flex',
		flexDirection: 'column',
		// justifyContent: 'center',
		alignItems: 'center',
		width: 150,
		height: 150,
		border: '3px solid #ffb26b',
		position: 'relative',
		cursor: 'pointer',
		marginBottom: 30,
		'& .MuiBadge-root': {
			marginTop: 20,
		},
	},
	symbol: {
		position: 'absolute',
		left: 10,
		top: -17,
		backgroundColor: 'white',
		fontSize: 30,
		userSelect: 'none',
	},
	time: {
		display: 'flex',
		alignItems: 'center',
		alignSelf: 'flex-start',
		marginLeft: 20,
		'& span': {
			marginLeft: 5,
			marginRight: 15,
		},
	},
	winner: {
		position: 'absolute',
		right: -30,
		top: -30,
		backgroundColor: 'white',
	},
	winnerSymbol: {
		animationName: '$winner',
		animationDuration: '2.25s',
		animationIterationCount: 'infinite',
		animationTimingFunction: 'ease-in-out',
		animationDirection: 'alternate',
	},
	'@keyframes winner': {
		'0%': {
			transform: 'scale( .75 )',
		},
		'20%': {
			transform: 'scale( 1 )',
		},
		'40%': {
			transform: 'scale( .75 )',
		},
		'60%': {
			transform: 'scale( 1 )',
		},
		'80%': {
			transform: 'scale( 0.75 )',
		},
		'100%': {
			transform: 'scale( 1 )',
		},
	},
	optionButton: {
		position: 'absolute',
		right: 0,
		top: '50%',
		transform: 'translate(120%, -60%)',
	},
});

function Table({
	userInfo = null,
	symbol = 'X',
	playerTurn = false,
	isWinner = false,
	onClick = () => { },
	isHost = false,
	isOwner = false,
	isStart = false,
}) {
	const classes = useStyles();
	const { name, photo, username } = userInfo || {
		name: '',
		photo: '',
		username: '',
	};

	return (
		<div className={classes.root} onClick={onClick}>
			{userInfo && <AvatarCustom online={true} photo={photo} size="large" />}
			<p>{username}</p>
			<div className={classes.time}>
				{userInfo && <Timer value={60} start={isStart && playerTurn} />}
				{playerTurn && (
					<BrushIcon style={{ color: 'blue' }} />
				)}
			</div>
			<span
				className={classes.symbol}
				style={{ color: symbol === 'X' ? 'red' : 'green' }}
			>
				{symbol}
			</span>
			{isWinner && (
				<span className={classes.winner}>
					<Icon
						className={'fas fa-crown ' + classes.winnerSymbol}
						style={{ color: 'yellow', width: 'fit-content', fontSize: 50 }}
					/>
				</span>
			)}
			{!isStart && userInfo && isOwner && (
				<div className={classes.optionButton}>
					<LeaveTableButton />
				</div>
			)}
			{!isStart && userInfo && isHost && !isOwner && (
				<div className={classes.optionButton}>
					<KickButton />
				</div>
			)}
		</div>
	);
}

export default Table;