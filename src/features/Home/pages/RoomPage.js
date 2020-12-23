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
const initialBoard = range(0, DEFAULT_SIZE * DEFAULT_SIZE, 1).map(
  (index) => -1
);

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
    const { index, value } = data;
    hit(index, value);
  },
  changeTurn: (setTurn, data) => {
    const { currentTurnPlayerID } = data;
    setTurn(() => {
      return currentTurnPlayerID;
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
  const [sizeBoard, setSizeBoard] = useState(DEFAULT_SIZE);
  const [board, setBoard] = useState(initialBoard);
  const [XPlayer, setXPlayer] = useState(null);
  const [OPlayer, setOPlayer] = useState(null);
  const [idPlayerTurn, setIdPlayerTurn] = useState(null);
  const [gameID, setGameID] = useState(null);
  const { token, currentUserInfo } = useSelector((state) => state.user);
  const classes = useStyles();

  const history = useHistory();
  const { id: roomID } = useParams();

  const isStart = useMemo(() => (gameID !== null), [gameID]);


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
    // const { boardSize } = response;
    // setSizeBoard(boardSize);
    // 	gameState ={
    // 		board: [],
    // 		turn: {
    // 			id: '',
    // 			remainingTime: 0
    // 		}
    // 	}
    if (!response.id) {
      return;
    }
    const { id, gameState } = response;
    const { move, turn } = gameState;
    const { playerID, remainingTime } = turn;
    if (!isStart) {
      setGameID(id);
    }
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

  const hit = (index, value) => {
    setBoard((currentBoard) => {
      const newBoard = [...currentBoard];
      newBoard[index] = value;
      return newBoard;
    });
  };

  const handleSquareClick = (index) => {
    if (!isStart) return;
    if (board[index] !== -1) return;
    if (!isTurn(currentUserInfo, idPlayerTurn)) return;
    const value = currentUserInfo.id === XPlayer.id ? 0 : 1;
    hit(index, value);

    gameSocket.emit('hit', {
      roomID: roomID,
      gameID: gameID,
      index: index,
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
