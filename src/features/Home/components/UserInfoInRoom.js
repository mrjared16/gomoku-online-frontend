import { Icon, makeStyles } from '@material-ui/core';
import AvatarCustom from 'components/AvatarCustom';
import React from 'react';
import Timer from './Timer';
import BrushIcon from '@material-ui/icons/Brush';

const useStyles = makeStyles({
	root: {
		display: 'flex',
		flexDirection: 'column',
		// justifyContent: 'center',
		alignItems: 'center',
		width: 150,
		height: 150,
		border: '3px solid #ce9782',
		position: 'relative',
		cursor: 'pointer',
		'& .MuiBadge-root': {
			marginTop: 20,
		}
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
		animationName: "$winner",
		animationDuration: "2.25s",
		animationIterationCount: "infinite",
		animationTimingFunction: "ease-in-out",
		animationDirection: "alternate",
	},
	"@keyframes winner": {
		"0%": {
			transform: "scale( .75 )",
		},
		"20%": {
			transform: "scale( 1 )",
		},
		"40%": {
			transform: "scale( .75 )",
		},
		"60%": {
			transform: "scale( 1 )",
		},
		"80%": {
			transform: "scale( 0.75 )",
		},
		"100%": {
			transform: "scale( 1 )",
		},
	},
});

function UserInfoInRoom({
	userInfo = null,
	symbol = 'X',
	playerTurn = false,
	isWinner = false,
	onClick = () => { },
}) {
	const classes = useStyles();
	const { name, photo } = userInfo || {
		name: '',
		photo: '',
	};

	return (
		<div className={classes.root} onClick={onClick}>
			{userInfo && <AvatarCustom online={true} photo={photo} />}
			<p>{name}</p>
			<div className={classes.time}>
				{playerTurn && <>
					<Timer value={60} />
					<BrushIcon style={{ color: 'blue' }} />
				</>}
			</div>
			<span
				className={classes.symbol}
				style={{ color: symbol === 'X' ? 'red' : 'green' }}
			>
				{symbol}
			</span>
			{isWinner && (
				<span className={classes.winner}>
					<Icon className={"fas fa-crown " + classes.winnerSymbol} style={{ color: 'yellow', width: 'fit-content', fontSize: 50 }} />
				</span>
			)}
		</div>
	);
}

export default UserInfoInRoom;
