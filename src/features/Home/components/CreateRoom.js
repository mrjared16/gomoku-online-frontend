import { Fab, makeStyles, Tooltip } from '@material-ui/core';
import React from 'react';
import AddIcon from '@material-ui/icons/Add';
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFab-root': {
      width: 36,
      height: 36,
    },
    // '& .MuiFab-primary': {
    //   color: 'white',
    // },
    '& button': {
      margin: 0,
		},
		'& .MuiIcon-root': {
			width: 'fit-content',
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

function CreateRoom({ onClick = () => {} }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Tooltip title="Create room" aria-label="create" onClick={onClick}>
        <Fab color="primary" className={classes.fab}>
          <AddIcon style={{fontSize: 15	}} />
        </Fab>
      </Tooltip>
    </div>
  );
}

export default CreateRoom;
