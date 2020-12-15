import React, { useEffect, useState } from "react";
import BackTo from "features/Home/components/BackTo";
import { Button, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Board from "features/Home/components/Board";
import { range } from "lodash";
import UserInfoInRoom from "features/Home/components/UserInfoInRoom";

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

function RoomPage(props) {
  const classes = useStyles();
  const history = useHistory();

  const [sizeBoard, setSizeBoard] = useState(30);
  const [board, setBoard] = useState([]);
  const [hostId, setHostId] = useState(null);
  const [opponentId, setOpponentId] = useState(null);
  const [idPlayerTurn, setIdPlayerTurn] = useState(null);

  const handleBackTo = () => {
    history.push("/");
  };

  const handleSquareClick = (index) => {
    if (board[index] === -1) {
      if (hostId === idPlayerTurn) {
        board[index] = 0;
        setIdPlayerTurn(opponentId);
      } else {
        board[index] = 1;
        setIdPlayerTurn(hostId);
      }
      setBoard([...board]);
      const x = Math.floor(index / sizeBoard);
      const y = index % sizeBoard;
      //send x, y to server
    }
  };

  useEffect(() => {
    const dataResponse = {
      sizeBoard: 20,
      board: [],
      hostId: "1",
      opponentId: "2",
      idPlayerTurn: "1",
    };

    setSizeBoard(dataResponse.sizeBoard);
    setHostId(dataResponse.hostId);
    setOpponentId(dataResponse.opponentId);
    setIdPlayerTurn(dataResponse.idPlayerTurn);
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
            name="Phuc"
            symbol="X"
            playerTurn={hostId === idPlayerTurn}
          />
          <UserInfoInRoom
            name="Huy"
            symbol="O"
            playerTurn={opponentId === idPlayerTurn}
          />
          <Button
            variant="contained"
            color="primary"
            className="caro-button"
            disabled={Boolean(opponentId)}
          >
            Join
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RoomPage;
