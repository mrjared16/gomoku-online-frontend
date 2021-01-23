import { Box, makeStyles } from '@material-ui/core';
import ExitRoomButton from 'features/Home/components/ExitRoomButton';
import Board from 'features/Home/components/Board';
import Table from 'features/Home/components/Table';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TurnHistory from 'features/Home/components/TurnHistory';
import Chat from 'features/Home/components/Chat';
import { resetHistory } from 'app/historySlice';
import gameHistoryApi from 'api/gameHistoryApi';
import moment from 'moment';

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
    // justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
    minWidth: 240,
    '& button': {
      width: 115,
      marginTop: 52,
      marginBottom: 30,
    },
  },
  footerButton: {
    display: 'flex',
    justifyContent: 'space-between',
    '& .surrender-button': {
      marginRight: 10,
    },
    '& button': {
      marginTop: 0,
    },
  },
  tie: {
    fontSize: '2rem',
    color: 'grey',
  },
  win: {
    fontSize: '2rem',
    color: 'green',
  },
  lose: {
    fontSize: '2rem',
    color: 'red',
  },
  resultContainer: {
    marginTop: 52,
    marginBottom: 30,
    minHeight: 96,
  },
  gameEndingType: {
    marginTop: 10,
  },
});

function WatchingHistory() {
  const [XPlayer, setXPlayer] = useState(null);
  const [OPlayer, setOPlayer] = useState(null);
  const [statusFinishGame, setStatusFinishGame] = useState(null);
  const [isShowWin, setIsShowWin] = useState(true);

  const [sizeBoard, setSizeBoard] = useState(DEFAULT_SIZE);

  const [gameMoves, setGameMoves] = useState([]);
  const [moveIndex, setMoveIndex] = useState(0);
  const [listMessage, setListMessage] = useState([]);

  const { currentUserInfo } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const classes = useStyles();

  const history = useHistory();

  const { id: gameHistoryId } = useParams();

  const board = useMemo(() => {
    const size = sizeBoard * sizeBoard;
    const newBoard = Array(size).fill(-1);
    gameMoves.slice(0, moveIndex).forEach(({ position, value }) => {
      newBoard[position] = value;
    });
    setIsShowWin(moveIndex === gameMoves.length);
    return newBoard;
  }, [gameMoves, sizeBoard, moveIndex]);

  useEffect(() => {
    setMoveIndex(gameMoves.length);
  }, [gameMoves]);

  const handleExitRoom = () => {
    dispatch(resetHistory());
    history.push('/history');
  };

  const getWinLinePosition = (line) => {
    const winLine = line.split('-').map((item) => parseInt(item));
    return winLine;
  };

  useEffect(() => {
    gameHistoryApi.getGameHistory(gameHistoryId).then((response) => {
      if (!response) return;
      const { game } = response;
      const {
        players,
        moveRecord,
        boardSize,
        result,
        chatRecord,
        gameEndingType,
        duration,
        winningLine,
      } = game;
      const { X, O } = players;

      setXPlayer(X);
      setOPlayer(O);
      setGameMoves(moveRecord);
      setMoveIndex(moveRecord.length - 1);
      setSizeBoard(boardSize);
      setListMessage(chatRecord);

      const isDraw = result === 2;
      const isXWin = result === 0;

      setStatusFinishGame({
        isDraw,
        isXWin,
        winLine: getWinLinePosition(winningLine),
        gameEndingType,
        duration,
      });
    });
  }, []);

  const renderGameResult = (gameStatus) => {
    if (!gameStatus) return;
    const { isDraw = false, isXWin = false } = statusFinishGame;
    if (isDraw) {
      return <span className={classes.tie}>TIE</span>;
    }
    let isWinner = false;
    if (isXWin) {
      isWinner = XPlayer?.id === currentUserInfo?.id;
    } else {
      isWinner = OPlayer?.id === currentUserInfo?.id;
    }
    if (isWinner) {
      return <span className={classes.win}>WIN</span>;
    } else {
      return <span className={classes.lose}>LOSE</span>;
    }
  };

  const renderGameEndingType = (type) => {
    const { isXWin = false } = statusFinishGame;
    if (!type || type === 'normal') return;
    if (type === 'timeout' || type === 'quit' || type === 'surrender') {
      return (
        <span>
          {isXWin ? `${OPlayer?.username} (O)` : `${XPlayer?.username} (X)`}{' '}
          {type}
        </span>
      );
    }
  };

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
              isShowWinLine={isShowWin}
              lastIndex={gameMoves[moveIndex - 1]?.position || null}
            />
          </Box>
          <div className={classes.userInfoContainer}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              className={classes.resultContainer}
            >
              {currentUserInfo &&
                XPlayer &&
                OPlayer &&
                renderGameResult(statusFinishGame)}
              <span className={classes.gameEndingType}>
                {statusFinishGame &&
                  renderGameEndingType(statusFinishGame?.gameEndingType)}
              </span>
              <span className={classes.gameEndingType}>
                {statusFinishGame &&
                  `Duration: ${moment
                    .unix(statusFinishGame?.duration)
                    .format('mm:ss')}`}
              </span>
            </Box>

            <Table
              userInfo={XPlayer}
              symbol="X"
              isWinner={
                statusFinishGame &&
                !statusFinishGame?.isDraw &&
                statusFinishGame?.isXWin
              }
              online={false}
              isShowWinSymbol={isShowWin}
            />
            <Table
              userInfo={OPlayer}
              symbol="O"
              isWinner={
                statusFinishGame &&
                !statusFinishGame?.isDraw &&
                !statusFinishGame?.isXWin
              }
              online={false}
              isShowWinSymbol={isShowWin}
            />
          </div>
        </Box>
        <Box display="flex" marginLeft={5}>
          <Chat list={listMessage} />
          <TurnHistory
            list={gameMoves}
            onChangeMoveIndex={(index) => setMoveIndex(index)}
          />
        </Box>
      </div>
    </div>
  );
}

export default WatchingHistory;
