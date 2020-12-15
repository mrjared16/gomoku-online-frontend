import { makeStyles } from "@material-ui/core";
import React from "react";
import Square from "features/Home/components/Square";

const useStyles = (sizeBoard = 0) =>
  makeStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      width: sizeBoard * 32,
      border: "5px solid #d4a531",
    },
  });

function Board({ sizeBoard = 30, board = [], onSquareClick = () => {} }) {
  const classes = useStyles(sizeBoard)();
  
  return (
    <div className={classes.root}>
      {board.map((value, index) => (
        <Square value={value} onClick={() => onSquareClick(index)} />
      ))}
    </div>
  );
}

export default Board;
