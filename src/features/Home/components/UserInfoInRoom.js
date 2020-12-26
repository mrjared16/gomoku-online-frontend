import { makeStyles } from '@material-ui/core';
import AvatarCustom from 'components/AvatarCustom';
import React from 'react';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Timer from './Timer';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 150,
    border: '3px solid #ce9782',
		position: 'relative',
		cursor: 'pointer',
		paddingTop: 20,
  },
  symbol: {
    position: 'absolute',
    left: 10,
    top: -17,
    backgroundColor: 'white',
		fontSize: 30,
		userSelect: 'none',
  },
  time: {
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginLeft: 20,
    '& span': {
      marginLeft: 5,
      marginRight: 15,
    },
  },
  winner: {
    position: 'absolute',
    right: 10,
    top: -17,
    backgroundColor: 'white',
  },
});

function UserInfoInRoom({
  userInfo = null,
  symbol = 'X',
  playerTurn = false,
	winner = false,
	onClick = () => {},
}) {
  const classes = useStyles();
  const { name, photo } = userInfo || {
    name: '',
    photo: '',
  };

  return (
    <div className={classes.root} onClick={onClick}>
      {userInfo && <AvatarCustom online={true} photo={photo} />}
      <p>{name}</p>
      <div className={classes.time}>
        {playerTurn && <Timer value={60} />}
      </div>
      <span
        className={classes.symbol}
        style={{ color: symbol === 'X' ? 'red' : 'green' }}
      >
        {symbol}
      </span>
      {winner && (
        <span className={classes.winner}>
          <Brightness7Icon style={{ color: 'yellow', fontSize: 30 }} />
        </span>
      )}
    </div>
  );
}

export default UserInfoInRoom;
