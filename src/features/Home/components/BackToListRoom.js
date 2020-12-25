import { Fab, makeStyles, Tooltip } from '@material-ui/core';
import React from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFab-root': {
      width: 50,
      height: 50,
    },
    '& .MuiFab-primary': {
      color: 'white',
    },
    '& button': {
      margin: 0,
    },
  },
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));

function BackToListRoom({ onClick = () => {} }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Tooltip title="Back to home" aria-label="back" onClick={onClick}>
        <Fab color="primary" className={classes.fab}>
          <ArrowBackIcon />
        </Fab>
      </Tooltip>
    </div>
  );
}

export default BackToListRoom;
