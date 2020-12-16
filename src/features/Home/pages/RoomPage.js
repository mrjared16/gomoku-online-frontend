import { Button, makeStyles } from "@material-ui/core";
import BackTo from "features/Home/components/BackTo";
import Board from "features/Home/components/Board";
import UserInfoInRoom from "features/Home/components/UserInfoInRoom";
import { range } from "lodash";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { roomSocket } from 'socket/roomSocket';

const DEFAULT_SIZE = 30;
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
  const [board, setBoard] = useState([]);
  const [host, setHost] = useState(null);
  const [opponent, setOpponent] = useState(null);
  const [idPlayerTurn, setIdPlayerTurn] = useState(null);
  const [isStart, setIsStart] = useState(true);
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

    });

    roomSocket.on('roomEventMsg', (response) => {
      const { data, event } = response;
      console.log('receive roomEventMsg emit: ', { response });
      // handleRoomListOnchangeEvent[event](setRoomList, data);
    });

    return () => {
      roomSocket.off('roomEventMsg', () => { });
    };
  }, [token]);


  useEffect(() => {
    const dataResponse = defaultResponse;
    console.log({ dataResponse });
    setHost(dataResponse.host);
    setOpponent(dataResponse.opponent);

    setIdPlayerTurn(dataResponse.idPlayerTurn);

    setSizeBoard(dataResponse.sizeBoard);

    if (dataResponse.board.length !== 0) {
      setBoard(dataResponse.board);
    } else {
      const initialBoard = range(
        0,
        dataResponse.sizeBoard * dataResponse.sizeBoard,
        1
      ).map((index) => -1);
      setBoard(initialBoard);
    }
  }, []);

  const isTurn = (player, currentTurnPlayerId) => isStart && player && player.id == currentTurnPlayerId

  const handleBackTo = () => {
    history.push("/");
  };

  const handleSquareClick = (index) => {
    if (!isStart)
      return;
    if (board[index] !== -1)
      return;
    if (isTurn(host, idPlayerTurn)) {
      board[index] = 0;
      setIdPlayerTurn(opponent.id);
    }
    else {
      board[index] = 1;
      setIdPlayerTurn(host.id);
    }
    setBoard([...board]);
    const x = Math.floor(index / sizeBoard);
    const y = index % sizeBoard;
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
            disabled={!host || host.id != currentUserInfo.id}
          >
            Start
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RoomPage;
