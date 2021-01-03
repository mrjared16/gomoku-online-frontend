import { Fab, Icon, makeStyles, Tooltip } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFab-root': {
      width: 36,
      height: 36,
    },
    '& .MuiFab-primary': {
      color: 'white',
    },
    '& button': {
      margin: 0,
		},
		'& .MuiIcon-root': {
			width: 'fit-content',
		},
  },
  fab: {
		margin: theme.spacing(2),
		backgroundColor: '#939b62',
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));

function LeaveTableButton({ onClick = () => {} }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Tooltip title="Leave" aria-label="leave" onClick={onClick}>
        <Fab className={classes.fab}>
					<Icon className="fas fa-share" style={{fontSize: 15	}} />
        </Fab>
      </Tooltip>
    </div>
  );
}

export default LeaveTableButton;
