import { Button, makeStyles } from "@material-ui/core";
import BackTo from "features/Home/components/BackTo";
import Board from "features/Home/components/Board";
import UserInfoInRoom from "features/Home/components/UserInfoInRoom";
import { range } from "lodash";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { roomSocket } from 'socket/roomSocket';

const DEFAULT_SIZE = 20;
const initialBoard = range(
  0,
  DEFAULT_SIZE * DEFAULT_SIZE,
  1
).map((index) => -1);

const useStyles = makeStyles({
  root: {
    padding: "20px 25px",
  },
  container: {
    display: "flex",
  },
  userInfoContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    marginLeft: 25,
  },
});
const defaultResponse = {
  sizeBoard: 20,
  board: [],
  host: {
    id: '1',
    name: '',
    username: '',
    photo: ''
  },
  opponent: {
    id: '2',
    name: '',
    username: '',
    photo: ''
  },
  idPlayerTurn: "1",
};

function RoomPage() {
  const [sizeBoard, setSizeBoard] = useState(DEFAULT_SIZE);
  const [board, setBoard] = useState(initialBoard);
  const [host, setHost] = useState(null);
  const [opponent, setOpponent] = useState(null);
  const [idPlayerTurn, setIdPlayerTurn] = useState(null);
  const [isStart, setIsStart] = useState(false);
  const { token, currentUserInfo } = useSelector((state) => state.user);
  const classes = useStyles();

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    console.log('join room', { roomID: id });
    roomSocket.emit('join', {
      action: 'join',
      token: token,
      roomID: id
    }, (response) => {
      setRoomState(response);
    });

    roomSocket.on('roomEventMsg', (response) => {
      const { data, event } = response;
      console.log('receive roomEventMsg emit: ', { response });
      const handleRoomChangeEvent = {
        'newPlayerJoined': (setState, data) => {
          setState(data);
        }
      };
      handleRoomChangeEvent[event](setRoomState, data);
    });

    return () => {
      roomSocket.off('roomEventMsg', () => { });
    };
  }, [token]);

  useEffect(() => {
    roomSocket.emit('game', {}, (response) => {
      if (!response)
        return;
      const { board } = response;
      setBoard(board);
    });

    roomSocket.on('gameEventMsg', (response) => {
      const { data, event } = response;
      console.log('receive gameEventMsg emit: ', { response });
      // const getSetter = {
      //   'onHit': hit,
      //   'changeTurn': setIdPlayerTurn
      // }
      // const handleRoomChangeEvent = {
      //   'onHit': (hit, data) => {
      //     const { index, value } = data;
      //     hit(index, value);
      //   },
      //   'changeTurn': (setTurn, data) => {
      //     const { currentTurnPlayerID } = data;
      //     setTurn(currentTurnPlayerID);
      //   }
      // };
      if (event == 'onHit') {
        const { index, value } = data;
        hit(index, value);
      }
      if (event == 'changeTurn') {
        const { currentTurnPlayerID } = data;
        setIdPlayerTurn(currentTurnPlayerID);
      }
      // handleRoomChangeEvent[event](getSetter[event], data);
    });
    return () => {
      roomSocket.off('gameEventMsg', () => { });
    };
  }, [isStart]);

  const handleStartGame = () => {
    setIsStart(true);
    setIdPlayerTurn(host.id);
    roomSocket.emit('start', {
      roomID: id
    });
  }

  const setRoomState = (response) => {
    console.log({ response });
    const { host, opponent, currentTurnPlayerID, boardSize, board } = response;
    setHost(host);
    setOpponent(opponent);
    setSizeBoard(boardSize);
  }

  const isTurn = (player, currentTurnPlayerId) => isStart && player && player.id == currentTurnPlayerId

  const handleBackTo = () => {
    history.push("/");
  };

  const hit = (index, value) => {
    board[index] = value;
    setBoard([...board]);
  }

  const handleSquareClick = (index) => {
    if (!isStart)
      return;
    if (board[index] !== -1)
      return;
    if (!isTurn(currentUserInfo, idPlayerTurn))
      return;
    const value = (currentUserInfo.id == host.id) ? 0 : 1;
    hit(index, value);

    roomSocket.emit('hit', {
      roomID: id,
      index: index,
      value: value
    })
    // if (isTurn(host, idPlayerTurn)) {
    //   board[index] = 0;
    //   setIdPlayerTurn(opponent.id);
    // }
    // else {
    //   board[index] = 1;
    //   setIdPlayerTurn(host.id);
    // }
    //send x, y to server
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
            userInfo={host}
            symbol="X"
            playerTurn={isTurn(host, idPlayerTurn)}
          />
          <UserInfoInRoom
            userInfo={opponent}
            symbol="O"
            playerTurn={isTurn(opponent, idPlayerTurn)}
          />
          <Button
            variant="contained"
            color="primary"
            className="caro-button"
            disabled={(!host || host.id != currentUserInfo.id) || (isStart)}
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
