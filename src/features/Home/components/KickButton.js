import { Fab, Icon, makeStyles, Tooltip } from '@material-ui/core';
import React from 'react';

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
		backgroundColor: '#ef4f4f',
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));

function KickButton({ onClick = () => {} }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Tooltip title="Kick" aria-label="kick" onClick={onClick}>
        <Fab color="primary" className={classes.fab}>
					<Icon className="fas fa-times" style={{fontSize: 15}} />
        </Fab>
      </Tooltip>
    </div>
  );
}

export default KickButton;
