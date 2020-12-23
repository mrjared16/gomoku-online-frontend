import { Button, makeStyles } from '@material-ui/core';
import BackTo from 'features/Home/components/BackTo';
import Board from 'features/Home/components/Board';
import UserInfoInRoom from 'features/Home/components/UserInfoInRoom';
import { range } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { roomSocket } from 'socket/roomSocket';
import { gameSocket } from 'socket/gameSocket';
import axiosClient from "api/axiosClient";

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
};


const useStyles = makeStyles({
  root: {
    padding: '20px 25px',
  },
  container: {
    display: 'flex',
  },
  userInfoContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginLeft: 25,
  },
});

function RoomPage() {
  const [XPlayer, setXPlayer] = useState(null);
  const [OPlayer, setOPlayer] = useState(null);

  const [sizeBoard, setSizeBoard] = useState(DEFAULT_SIZE);
  const [gameID, setGameID] = useState(null);

  const [idPlayerTurn, setIdPlayerTurn] = useState(null);

  const [gameMoves, setGameMoves] = useState([]);
  const [moveIndex, setMoveIndex] = useState(0);
  // const [board, setBoard] = useState(initialBoard);

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
    const { players, roomOption, gameID } = response;

    const { boardSize } = roomOption;
    setSizeBoard(boardSize);

    if (players['X']) {
      setXPlayer(players['X']);
    }
    if (players['O']) {
      setOPlayer(players['O']);
    }

    if (gameID) {
      setGameID(gameID);
    }
  };

  const handleStartGame = () => {
    roomSocket.emit('start', {
      roomID: roomID,
    }, (response) => {
      console.log('game start response', { response });
      if (!response)
        return;
      const { gameID } = response;
      setGameID(gameID);
    }
    );
  };

  const fetchGameState = async (roomID) => {
    const response = await axiosClient
      .get(`${process.env.REACT_APP_API_URL}/game/room/${roomID}`);
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
  }

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
      roomID
    })
    gameSocket.on('gameEventMsg', (response) => {
      const { data, event } = response;
      console.log('receive gameEventMsg emit: ', { response });
      const getSetter = {
        onHit: hit,
        changeTurn: setIdPlayerTurn,
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

  return (
    <div className={classes.root}>
      <BackTo onSubmit={handleBackTo} />
      <div className={classes.container}>
        <Board
          sizeBoard={sizeBoard}
          board={board}
          onSquareClick={handleSquareClick}
        />
        <div className={classes.userInfoContainer}>
          <UserInfoInRoom
            userInfo={XPlayer}
            symbol="X"
            playerTurn={isTurn(XPlayer, idPlayerTurn)}
          />
          <UserInfoInRoom
            userInfo={OPlayer}
            symbol="O"
            playerTurn={isTurn(OPlayer, idPlayerTurn)}
          />

          <Button
            variant="contained"
            color="primary"
            className="caro-button"
            disabled={!XPlayer || XPlayer.id != currentUserInfo.id || isStart}
            onClick={handleStartGame}
          >
            Start
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RoomPage;
