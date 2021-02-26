import { Fab, Icon, makeStyles, Tooltip } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFab-root': {
      width: 36,
      height: 36,
      backgroundColor: 'var(--color-background-header)',
      boxShadow: 'none',
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
    '& span': {
      color: 'white',
    },
  },
  fab: {
    margin: theme.spacing(2),
    backgroundColor: '#ff7b54',
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));

function SunButton({ onClick = () => {} }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Tooltip title="Light Mode" aria-label="back" onClick={onClick}>
        <Fab color="primary" className={classes.fab}>
          <Icon className="fas fa-sun" style={{ fontSize: 15 }} />
        </Fab>
      </Tooltip>
    </div>
  );
}

export default SunButton;
