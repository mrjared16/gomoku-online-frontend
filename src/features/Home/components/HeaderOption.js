import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import CreateRoom from 'features/Home/components/CreateRoom';
import SearchRoom from './SearchRoom';
import ModalCreateRoom from './ModalCreateRoom';
import ModalJoinRoomWithID from './ModalJoinRoomWithID';
import { showToast } from 'utils/showToast';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 10px',
  },
});

function HeaderOption({ onCreateRoom = () => {}, onJoinRoomWithID = () => {} }) {
  const classes = useStyles();

  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalJoin, setOpenModalJoin] = useState(false);

  const toggleModalCreate = () => {
    setOpenModalCreate(!openModalCreate);
	};
	
	const toggleModalJoin = () => {
    setOpenModalJoin(!openModalJoin);
	};
	
	const handleJoinRoomWithIDClick = (values) => {
		const { inputRoomID } = values;
		onJoinRoomWithID(inputRoomID);
		toggleModalJoin();
	} 

  return (
    <div className={classes.root}>
      <CreateRoom onClick={toggleModalCreate} />
      <SearchRoom onClick={toggleModalJoin} />
      <ModalCreateRoom open={openModalCreate} toggle={toggleModalCreate} onSubmit={onCreateRoom} />
			<ModalJoinRoomWithID open={openModalJoin} toggle={toggleModalJoin} onSubmit={handleJoinRoomWithIDClick} />
    </div>
  );
}

export default HeaderOption;
