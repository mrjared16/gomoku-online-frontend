import { Fab, makeStyles, Tooltip } from '@material-ui/core';
import React from 'react';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFab-root': {
      width: 36,
      height: 36,
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
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));

function SearchRoom({ onClick = () => {} }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Tooltip title="Search room" aria-label="search" onClick={onClick}>
        <Fab color="secondary" className={classes.fab}>
          <SearchIcon style={{fontSize: 15	}} />
        </Fab>
      </Tooltip>
    </div>
  );
}

export default SearchRoom;
