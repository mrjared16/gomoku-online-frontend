import { makeStyles } from '@material-ui/core';
import React from 'react';
import Square from 'features/Home/components/Square';
import { includes, range } from 'lodash';

const DEFAULT_SQUARE_SIZE = 22;

const useStyles = (sizeBoard = 0) =>
  makeStyles({
    root: {
      // display: 'flex',
      // alignItems: 'center',
    },
    board: {
      width: sizeBoard * (DEFAULT_SQUARE_SIZE + 2),
      height: sizeBoard * (DEFAULT_SQUARE_SIZE + 2),
      border: '5px solid #ff7b54',
    },
    row: {
      display: 'flex',
    },
  });

function Board({
  sizeBoard = 20,
  board = [],
  onSquareClick = () => {},
  winLine = [],
  isShowWinLine = true,
  lastIndex = null,
}) {
  const classes = useStyles(sizeBoard)();

  const renderRows = () =>
    range(0, sizeBoard, 1).map((indexRow) => (
      <div key={'row' + indexRow} className={classes.row}>
        {range(0, sizeBoard, 1).map((indexCol) => {
          const indexBoard = indexRow * sizeBoard + indexCol;
          const isBelongWinLine = includes(winLine, indexBoard);
          return (
            <Square
              key={indexBoard}
              value={board[indexBoard]}
              onClick={() => onSquareClick(indexBoard)}
              highlight={
                (lastIndex && lastIndex === indexBoard) ||
                (isShowWinLine && isBelongWinLine)
              }
            />
          );
        })}
      </div>
    ));

  return (
    <div className={classes.root}>
      <div className={classes.board}>{renderRows()}</div>
    </div>
  );
}

export default Board;
