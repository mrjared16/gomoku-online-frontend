import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import CreateRoom from 'features/Home/components/CreateRoom';
import SearchRoom from './SearchRoom';
import ModalCreateRoom from './ModalCreateRoom';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 10px',
  },
});

function HeaderOption({ onCreateRoom = () => {} }) {
  const classes = useStyles();

  const [openModalCreate, setOpenModalCreate] = useState(false);

  const toggleModalCreate = () => {
    setOpenModalCreate(!openModalCreate);
  };

  return (
    <div className={classes.root}>
      <CreateRoom onClick={toggleModalCreate} />
      <SearchRoom />
      <ModalCreateRoom open={openModalCreate} toggle={toggleModalCreate} onSubmit={onCreateRoom} />
    </div>
  );
}

export default HeaderOption;
