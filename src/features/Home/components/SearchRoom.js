import { Fab, makeStyles, Tooltip } from '@material-ui/core';
import React from 'react';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFab-root': {
      width: 50,
      height: 50,
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

function SearchRoom({ onSubmit = () => {} }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Tooltip title="Search room" aria-label="search">
        <Fab color="secondary" className={classes.fab}>
          <SearchIcon />
        </Fab>
      </Tooltip>
    </div>
  );
}

export default SearchRoom;
