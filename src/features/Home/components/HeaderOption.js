import { makeStyles } from '@material-ui/core';
import React from 'react';
import CreateRoom from 'features/Home/components/CreateRoom';
import SearchRoom from './SearchRoom';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 25px',
  },
});

function HeaderOption({ onCreateRoom = () => {} }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CreateRoom onSubmit={onCreateRoom} />
      <SearchRoom />
    </div>
  );
}

export default HeaderOption;
