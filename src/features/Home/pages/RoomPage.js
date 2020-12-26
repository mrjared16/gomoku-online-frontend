import { Button, makeStyles } from '@material-ui/core';
import BackToListRoom from 'features/Home/components/BackToListRoom';
import Board from 'features/Home/components/Board';
import UserInfoInRoom from 'features/Home/components/UserInfoInRoom';
import { range } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { roomSocket } from 'socket/roomSocket';
import { gameSocket } from 'socket/gameSocket';
import axiosClient from 'api/axiosClient';
import OptionTabs from 'features/Home/components/OptionTabs';
import ModalStatusGameFinish from 'features/Home/components/ModalStatusGameFinish';
import ModalConfirmNewGame from '../components/ModalConfirmNewGame';

const DEFAULT_SIZE = 20;

const handleRoomChangeEvent = {
	newPlayerJoined: (setState, data) => {
		setState(data);
	},
	roomUpdated: (setState, data) => {
		setState(data);
	},
};

const handleGameEvent = {
	onHit: (hit, data) => {
		const { position, value } = data;
		hit(position, value);
	},
	changeTurn: (setTurn, data) => {
		const { turn } = data;
		const { playerID, remainingTime } = turn;
		setTurn(() => {
			return playerID;
		});
	},
	onFinish: (handleEndGame, data) => {
		handleEndGame(data);
	}
};

const useStyles = makeStyles({
	root: {
		padding: '20px 25px',
	},
	container: {
		display: 'flex',
		// justifyContent: 'center',
		marginTop: 20,
		height: 'calc(100vh - 168px)',
		overflow: 'auto',
	},
	userInfoContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'center',
		marginLeft: 100,
		marginRight: 100,
		'& button': {
			width: 115,
		}
	},
	footerButton: {
		display: 'flex',
		justifyContent: 'space-between',
		'& .surrender-button': {
			marginRight: 10,
		},
	},
});

function RoomPage() {
	const [hostInfo, setHostInfo] = useState(null);
	const [XPlayer, setXPlayer] = useState(null);
	const [OPlayer, setOPlayer] = useState(null);
	const [spectator, setSpectator] = useState(null);
	const [statusFinishGame, setStatusFinishGame] = useState(null);

	const [sizeBoard, setSizeBoard] = useState(DEFAULT_SIZE);
	const [gameID, setGameID] = useState(null);

	const [idPlayerTurn, setIdPlayerTurn] = useState(null);

	const [gameMoves, setGameMoves] = useState([]);
	const [moveIndex, setMoveIndex] = useState(0);
	// const [board, setBoard] = useState(initialBoard);

	const [openModalStatusGameFinish, setOpenModalStatusGameFinish] = useState(false);
	const [openModalConfirmNewGame, setOpenModalConfirmNewGame] = useState(false);

	const { token, currentUserInfo } = useSelector((state) => state.user);
	const classes = useStyles();

	const history = useHistory();
	const { id: roomID } = useParams();

	const isStart = useMemo(() => (gameID !== null), [gameID]);

	const board = useMemo(() => {
		const size = sizeBoard * sizeBoard;
		const newBoard = Array(size).fill(-1);
		gameMoves.slice(0, moveIndex).forEach(({ position, value }) => {
			newBoard[position] = value;
		});
		return newBoard;
	}, [gameMoves, sizeBoard, moveIndex])

	useEffect(() => {
		setMoveIndex(gameMoves.length);
	}, [gameMoves]);

	const handleBackTo = () => {
		history.push('/');
	};

	// }
	// handle room event
	useEffect(() => {
		console.log('join room', { roomID: roomID });
		roomSocket.emit(
			'join',
			{
				action: 'join',
				token: token,
				roomID: roomID,
			},
			(response) => {
				setRoomState(response);
			}
		);

		roomSocket.on('roomEventMsg', (response) => {
			const { data, event } = response;
			console.log('receive roomEventMsg emit: ', { response });

			handleRoomChangeEvent[event](setRoomState, data);
		});

		return () => {
			roomSocket.off('roomEventMsg', () => { });
		};
	}, [token]);

	// const fetchGameState = () => {
	// 	const [gameState] = useState([]);
	// 	const [currentStateIndex] = useState(0);
	// 	const currentGameState = useMemo(
	// 		() => gameState.slice(0, currentStateIndex),
	// 		[currentStateIndex, gameState]
	// 	);

	const setRoomState = (response) => {
		// roomState = {
		//   host: { id: '2', name: '', username: '', photo: '' },
		//   opponent: {},
		//   roomStatus: 'start' | 'waiting',
		// };

		//TODO: add waiting stage for room
		const { players, roomOption, gameID, host, users } = response;

		const { boardSize } = roomOption;
		setSizeBoard(boardSize);

		if (host) {
			setHostInfo(host);
		}
		if (players['X']) {
			setXPlayer(players['X']);
		}
		if (players['O']) {
			setOPlayer(players['O']);
		}
		if (users) {
			setSpectator(users);
		}

		if (gameID) {
			setGameID(gameID);
		}
	};

	const handleStartGame = () => {
		roomSocket.emit(
			'start',
			{
				roomID: roomID,
			},
			(response) => {
				console.log('game start response', { response });
				if (!response) return;
				const { gameID } = response;
				setGameID(gameID);
			}
		);
	};

	const handleNewGame = () => {
		setGameMoves([]);
		setStatusFinishGame(null);
		setOpenModalConfirmNewGame(false);
	};

	const fetchGameState = async (roomID) => {
		const response = await axiosClient.get(
			`${process.env.REACT_APP_API_URL}/game/room/${roomID}`
		);
		console.log({ response });
		if (!response.id) {
			return;
		}
		const { id, gameState, startAt } = response;
		const { move, turn } = gameState;
		const { playerID, remainingTime } = turn;
		if (!isStart) {
			setGameID(id);
		}
		setGameMoves(move);
		setIdPlayerTurn(playerID);
	};

	// handle game event
	useEffect(() => {
		if (gameID === null) {
			return;
		}

		// fetch game state of current room
		fetchGameState(roomID);

		console.log('listening on game event!');
		gameSocket.emit('join', {
			gameID,
			roomID,
		});
		gameSocket.on('gameEventMsg', (response) => {
			const { data, event } = response;
			console.log('receive gameEventMsg emit: ', { response });
			const handleEndGame = (state, data) => {
				console.log({ data });
				// const { winnerID, line, rankRecord, duration } = data;
				const winnerID = XPlayer.id;
				const line = '1-3-4-5-6';
				const winner = winnerID === XPlayer.id ? XPlayer : OPlayer;
				const loser = winnerID === XPlayer.id ? OPlayer : XPlayer;
				setStatusFinishGame({
					winner: winner || null,
					loser: loser || null,
					winLine: line ? getWinLinePosition(line) : [],
				})
				setOpenModalStatusGameFinish(true);
				// TODO: handle end game
				setGameID(null);
				// setGameMoves([]);
				setIdPlayerTurn(null);
			};
			const getSetter = {
				onHit: hit,
				changeTurn: setIdPlayerTurn,
				onFinish: handleEndGame
			};

			handleGameEvent[event](getSetter[event], data);
		});
		return () => {
			gameSocket.off('gameEventMsg', () => { });
		};
	}, [gameID]);

	const isTurn = (player, currentTurnPlayerId) =>
		isStart && player && player.id === currentTurnPlayerId;

	const hit = (position, value) => {
		setGameMoves(currentMoves => currentMoves.concat([{ position, value }]));
	};

	const handleSquareClick = (position) => {
		if (!isStart) return;
		if (board[position] !== -1) return;
		if (!isTurn(currentUserInfo, idPlayerTurn)) return;
		const value = currentUserInfo.id === XPlayer.id ? 0 : 1;
		hit(position, value);

		gameSocket.emit('hit', {
			roomID: roomID,
			gameID: gameID,
			position: position,
			value: value,
		});
	};

	const canStartGame = () => XPlayer && OPlayer && hostInfo.id === currentUserInfo.id && !isStart;

	const handleClickUserInfo = (side = 0) => {
		roomSocket.emit('joinTable', {
			token: token,
			side: side,
		})
	}

	const getWinLinePosition = (line) => {
		const winLine = line.split('-').map(item => parseInt(item));
		return winLine;
	}

	return (
		<div className={classes.root}>
			<BackToListRoom onClick={handleBackTo} />
			<div className={classes.container}>
				<Board
					sizeBoard={sizeBoard}
					board={board}
					onSquareClick={handleSquareClick}
					winLine={statusFinishGame?.winLine}
				/>
				<div className={classes.userInfoContainer}>
					{!statusFinishGame && <Button
						variant="contained"
						color="primary"
						className="caro-button"
						disabled={!canStartGame()}
						onClick={handleStartGame}
					>
						Start
					</Button>}

					{statusFinishGame && <Button
						variant="contained"
						color="primary"
						className="caro-button"
						onClick={() => setOpenModalConfirmNewGame(true)}
					>
						New Game
					</Button>}


					<UserInfoInRoom
						userInfo={XPlayer}
						symbol="X"
						playerTurn={isTurn(XPlayer, idPlayerTurn)}
						onClick={() => handleClickUserInfo(0)}
						isWinner={XPlayer && statusFinishGame?.winner?.id === XPlayer?.id}
					/>
					<UserInfoInRoom
						userInfo={OPlayer}
						symbol="O"
						playerTurn={isTurn(OPlayer, idPlayerTurn)}
						onClick={() => handleClickUserInfo(1)}
						isWinner={OPlayer && statusFinishGame?.winner?.id === OPlayer?.id}
					/>

					<div className={classes.footerButton}>
						<Button
							className="surrender-button"
							variant="contained"
							style={{ backgroundColor: '#2D9CDB' }}
						>
							Surrender
            </Button>

						<Button
							variant="contained"
							color="secondary"
							className="caro-button"
						>
							Tie
            </Button>
					</div>
				</div>
				<OptionTabs spectator={spectator} />
			</div>
			<ModalStatusGameFinish
				open={openModalStatusGameFinish}
				toggle={() => setOpenModalStatusGameFinish(!openModalStatusGameFinish)}
				winnerInfo={statusFinishGame?.winner}
				loserInfo={statusFinishGame?.loser}
			/>
			<ModalConfirmNewGame open={openModalConfirmNewGame} toggle={() => setOpenModalConfirmNewGame(!openModalConfirmNewGame)} onSubmit={handleNewGame} />
		</div>
	);
}

export default RoomPage;
