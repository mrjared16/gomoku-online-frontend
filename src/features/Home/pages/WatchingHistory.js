import { Box, makeStyles } from '@material-ui/core';
import ExitRoomButton from 'features/Home/components/ExitRoomButton';
import Board from 'features/Home/components/Board';
import Table from 'features/Home/components/Table';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TurnHistory from 'features/Home/components/TurnHistory';
import Chat from 'features/Home/components/Chat';
import { resetHistory } from 'app/historySlice';
import { range } from 'lodash';
import { userDTOToProp } from 'utils/mapResponseToProp';

const DEFAULT_SIZE = 20;

const useStyles = makeStyles({
	root: {
		padding: '20px 25px',
	},
	container: {
		display: 'flex',
		// justifyContent: 'space-between',
		height: 'calc(100vh - 88px)',
		overflow: 'auto',
	},
	userInfoContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 30,
		marginRight: 30,
		'& button': {
			width: 115,
			marginTop: 52,
			marginBottom: 30,
		}
	},
	footerButton: {
		display: 'flex',
		justifyContent: 'space-between',
		'& .surrender-button': {
			marginRight: 10,
		},
		'& button': {
			marginTop: 0,
		}
	},
});

function WatchingHistory() {
	const [XPlayer, setXPlayer] = useState(null);
	const [OPlayer, setOPlayer] = useState(null);
	const [statusFinishGame, setStatusFinishGame] = useState(null);
	const [isShowWinLine, setIsShowWinLine] = useState(true);

	const [sizeBoard, setSizeBoard] = useState(DEFAULT_SIZE);

	const [gameMoves, setGameMoves] = useState([]);
	const [moveIndex, setMoveIndex] = useState(0);

	const { currentUserInfo } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const classes = useStyles();

	const history = useHistory();

	const board = useMemo(() => {
		const size = sizeBoard * sizeBoard;
		const newBoard = Array(size).fill(-1);
		gameMoves.slice(0, moveIndex).forEach(({ position, value }) => {
			newBoard[position] = value;
		});
		setIsShowWinLine(moveIndex === gameMoves.length);
		return newBoard;
	}, [gameMoves, sizeBoard, moveIndex])

	useEffect(() => {
		setMoveIndex(gameMoves.length);
	}, [gameMoves]);

	const handleExitRoom = () => {
		dispatch(resetHistory());
		history.push('/');
	};

	const getWinLinePosition = (line) => {
		const winLine = line.split('-').map(item => parseInt(item));
		return winLine;
	};

	useEffect(() => {
		//call api
		const dataResponse = {
			id: 1,
			startAt: '2021-01-08T17:56:38.800Z',
			duration: 3720,
			// statusFinishGame: {
			// 	gameResult: 0,
			// 	line: '1-2-3-4-5',
			// },
			result: 0,
			line: '1-2-3-4-5',
			boardSize: 20,
			chatRecord: [],
			players: {
				X: {
					username: 'test1',
					photo: '',
				},
				O: {
					username: 'test2',
					photo: '',
				},
			},
			moveRecord: range(0, 20, 1).map(index => ({
				id: index,
				position: index,
				time: '2021-01-08T17:56:38.800Z',
				value: index % 2 === 0 ? 0 : 1,
			})),
		}

		setXPlayer(dataResponse.players.X);
		setOPlayer(dataResponse.players.O);
		setGameMoves(dataResponse.moveRecord);
		setMoveIndex(dataResponse.moveRecord.length - 1);
		setSizeBoard(dataResponse.boardSize);

		const { gameResult, line } = dataResponse;
		const isDraw = gameResult === 2;
		const isXWin = gameResult === 0;

		setStatusFinishGame({
			isDraw,
			isXWin,
			winLine: line ? getWinLinePosition(line) : [],
		})

	}, [])

	return (
		<div className={classes.root}>
			<div className={classes.container}>
				<Box display="flex">
					<Box display="flex" flexDirection="column">
						<Box display="flex" justifyContent="space-between" marginBottom={2}>
							<ExitRoomButton onClick={handleExitRoom} />
						</Box>
						<Board
							sizeBoard={sizeBoard}
							board={board}
							winLine={statusFinishGame?.winLine}
							isShowWinLine={isShowWinLine}
						/>
					</Box>
					<div className={classes.userInfoContainer}>
						<Table
							userInfo={XPlayer}
							symbol="X"
							isWinner={statusFinishGame?.isXWin}
							online={false}
						/>
						<Table
							userInfo={OPlayer}
							symbol="O"
							isWinner={statusFinishGame && !statusFinishGame.isXWin}
							online={false}
						/>
					</div>
				</Box>
				<Box display="flex" marginLeft={5}>
					<Chat />
					<TurnHistory list={gameMoves} onChangeMoveIndex={(index) => setMoveIndex(index)} />
				</Box>
			</div>
		</div>
	);
}

export default WatchingHistory;