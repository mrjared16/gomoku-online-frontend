import { Fab, makeStyles, Tooltip } from '@material-ui/core';
import React from 'react';
import AddIcon from '@material-ui/icons/Add';
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

function CreateRoom({ onSubmit = () => {} }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Tooltip title="Create room" aria-label="create">
        <Fab color="primary" className={classes.fab}>
          <AddIcon />
        </Fab>
      </Tooltip>
    </div>
  );
}

export default CreateRoom;
