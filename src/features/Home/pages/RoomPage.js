import { Box, Button, makeStyles } from '@material-ui/core';
import ExitRoomButton from 'features/Home/components/ExitRoomButton';
import Board from 'features/Home/components/Board';
import Table from 'features/Home/components/Table';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { roomSocket } from 'socket/roomSocket';
import { gameSocket } from 'socket/gameSocket';
import axiosClient from 'api/axiosClient';
import ModalStatusGameFinish from 'features/Home/components/ModalStatusGameFinish';
import ModalConfirmNewGame from 'features/Home/components/ModalConfirmNewGame';
import SpectatorButton from 'features/Home/components/SpectatorButton';
import ModalSpectator from 'features/Home/components/ModalSpectator';
import TurnHistory from 'features/Home/components/TurnHistory';
import Chat from 'features/Home/components/Chat';
import { removeRoomID, setRoomID } from 'app/roomSlice';
import { showToast } from 'utils/showToast';
import ModalUserInfo from '../components/ModalUserInfo';
import userApi from 'api/userApi';
import { userDTOToProp } from 'utils/mapResponseToProp';

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
		// justifyContent: 'space-between',
		height: 'calc(100vh - 88px)',
		overflow: 'auto',
	},
	userInfoContainer: {
		display: 'flex',
		flexDirection: 'column',
		// justifyContent: 'space-around',s
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
	//Modal
	const [openModalStatusGameFinish, setOpenModalStatusGameFinish] = useState(false);
	const [openModalConfirmNewGame, setOpenModalConfirmNewGame] = useState(false);
	const [openModalSpectator, setOpenModalSpectator] = useState(false);

	const [userInfoState, setUserInfoState] = useState(null);
	const [loadingUserInfo, setLoadingUserInfo] = useState(true);
	const [openModalUserInfo, setOpenModalUserInfo] = useState(false);

	const [listMessage, setListMessage] = useState([]);

	const { token, currentUserInfo } = useSelector((state) => state.user);
	const dispatch = useDispatch();
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

	const handleExitRoom = () => {
		dispatch(removeRoomID())
		history.push('/');
		roomSocket.emit('join', {
			action: 'leave',
			data: {
				token: token,
				roomID: roomID,
			}
		})
	};

	// handle room event
	useEffect(() => {
		console.log('join room', { roomID: roomID });
		dispatch(setRoomID(roomID));
		roomSocket.emit(
			'join',
			{
				action: 'join',
				data: {
					token: token,
					roomID: roomID,
				}
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


	const setRoomState = (response) => {
		const { host } = response;
		if (!host) {
			// TODO: show message for user
			console.log('this room is no longer exist');
			history.push('/');
			dispatch(removeRoomID());
			showToast('error', 'This room is no longer exist');
			return;
		}

		const { players, roomOption, gameID, users } = response;

		setHostInfo(host);

		const { boardSize } = roomOption;
		setSizeBoard(boardSize);

		setXPlayer(players['X']);
		setOPlayer(players['O']);
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

	const isPlayer = () => {
		if (!currentUserInfo || !XPlayer || !OPlayer) {
			return -1;
		}
		if (currentUserInfo.id === XPlayer.id)
			return 0;
		if (currentUserInfo.id === OPlayer.id)
			return 1;
	}

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
		
		const { game, gameState } = response;
		if (!game || game.id == null) {
			return;
		}
		const { id, startAt } = game;
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
			console.log('receive gameEventMsg emit: ', { response })
			const handleEndGame = (state, data) => {
				console.log({ data });
				// const { winnerID, line, rankRecord, duration } = data;
				const gameResult = 0;
				const isDraw = gameResult === 2;
				const isXWin = gameResult === 0;

				const line = '1-3-4-5-6';
				setStatusFinishGame({
					isDraw,
					isXWin,
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

	const canStartGame = () => XPlayer && OPlayer && hostInfo.id === currentUserInfo?.id && !isStart;

	const handleClickTable = (side = 0) => {
		roomSocket.emit('joinTable', {
			action: 'join',
			data: {
				token: token,
				side: side,
				roomID: roomID,
			}
		})

		if (side === 0 && XPlayer) {
			handleClickUser(XPlayer.id);
		}

		if (side === 1 && OPlayer) {
			handleClickUser(OPlayer.id);
		}
	}

	const getWinLinePosition = (line) => {
		const winLine = line.split('-').map(item => parseInt(item));
		return winLine;
	}

	const handleClickUser = (id) => {
		setLoadingUserInfo(true);
		setOpenModalUserInfo(true);
		userApi.getUserInfoByID(id).then((response) => {
			const userInfoData = userDTOToProp(response.user);
			setUserInfoState(userInfoData);
			setLoadingUserInfo(false);
		})
	};

	const handleSendMessage = (values, { resetForm }) => {
		const { text } = values;
		setListMessage([
			...listMessage,
			{
				username: 'test',
				text: text,
				createdAt: new Date(),
			}
		])
		resetForm();
	};

	const handleLeaveTable = () => {
		roomSocket.emit('joinTable', {
			action: 'leave',
			data: { 
				token: token,
				roomID: roomID,
			},
		});
	};

	const handleKickUser = (playerId) => {
		roomSocket.emit('joinTable', {
			action: 'kick',
      data: {
				token: token,
        roomID: roomID,
        playerId: playerId,
			},
		})
	}

	return (
		<div className={classes.root}>
			<div className={classes.container}>
				<Box display="flex">
					<Box display="flex" flexDirection="column">
						<Box display="flex" justifyContent="space-between" marginBottom={2}>
							<ExitRoomButton onClick={handleExitRoom} />
							<SpectatorButton onClick={() => setOpenModalSpectator(!openModalSpectator)} />
						</Box>
						<Board
							sizeBoard={sizeBoard}
							board={board}
							onSquareClick={handleSquareClick}
							winLine={statusFinishGame?.winLine}
						/>
					</Box>
					<div className={classes.userInfoContainer}>
						{!statusFinishGame && <Button
							variant="contained"
							color="primary"
							className="caro-button"
							disabled={!canStartGame()}
							onClick={handleStartGame}
							size="small"
						>
							Start
						</Button>}

						{statusFinishGame && <Button
							variant="contained"
							color="primary"
							className="caro-button"
							onClick={() => setOpenModalConfirmNewGame(true)}
							size="small"
						>
							New Game
						</Button>}


						<Table
							userInfo={XPlayer}
							symbol="X"
							playerTurn={isTurn(XPlayer, idPlayerTurn)}
							onProfileClick={() => handleClickTable(0)}
							isWinner={statusFinishGame?.isXWin}
							isOwner={currentUserInfo?.id === XPlayer?.id}
							isHost={currentUserInfo?.id === hostInfo?.id}
							isStart={isStart}
							onLeave={handleLeaveTable}
							onKick={handleKickUser}
						/>
						<Table
							userInfo={OPlayer}
							symbol="O"
							playerTurn={isTurn(OPlayer, idPlayerTurn)}
							onProfileClick={() => handleClickTable(1)}
							isWinner={statusFinishGame && !statusFinishGame.isXWin}
							isOwner={currentUserInfo?.id === OPlayer?.id}
							isHost={currentUserInfo?.id === hostInfo?.id}
							isStart={isStart}
							onLeave={handleLeaveTable}
							onKick={handleKickUser}
						/>

						<div className={classes.footerButton}>
							<Button
								className="surrender-button"
								variant="contained"
								style={{ backgroundColor: '#939b62' }}
								size="small"
							>
								Surrender
							</Button>

							<Button
								variant="contained"
								color="secondary"
								className="caro-button"
								size="small"
							>
								Tie
							</Button>
						</div>
					</div>
				</Box>
				<Box display="flex" marginLeft={5}>
					<Chat list={listMessage} onSubmit={handleSendMessage} />
					<TurnHistory list={gameMoves} onChangeMoveIndex={(index) => setMoveIndex(index)} />
				</Box>
			</div>
			<ModalStatusGameFinish
				open={openModalStatusGameFinish}
				toggle={() => setOpenModalStatusGameFinish(!openModalStatusGameFinish)}
				duration={620}
				XPlayer={XPlayer}
				OPlayer={OPlayer}
				isDraw={statusFinishGame?.isDraw}
				isXWin={statusFinishGame?.isXWin}
				isPlayer={isPlayer()}
			/>
			<ModalConfirmNewGame open={openModalConfirmNewGame} toggle={() => setOpenModalConfirmNewGame(!openModalConfirmNewGame)} onSubmit={handleNewGame} />
			<ModalSpectator open={openModalSpectator} toggle={() => setOpenModalSpectator(!openModalSpectator)} list={spectator} hostID={hostInfo?.id} onClick={handleClickUser} />
			<ModalUserInfo open={openModalUserInfo} toggle={() => setOpenModalUserInfo(!openModalUserInfo)} userInfo={userInfoState} loading={loadingUserInfo} />
		</div>
	);
}

export default RoomPage;
