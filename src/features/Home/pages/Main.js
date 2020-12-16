import HeaderOption from "features/Home/components/HeaderOption";
import ListRoomInfo from "features/Home/components/ListRoomInfo";
import { range } from "lodash";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { roomSocket } from 'socket/roomSocket';

const listRoom = range(0, 4, 1).map((index) => {
  let board = {};

  if (index % 3 === 0) {
    board = {
      id: index,
      listUser: [
        {
          name: "Jhin",
          photo: "",
        },
        {
          name: "Swift",
          photo: "",
        },
      ],
    };
  } else {
    board = {
      id: index,
      listUser: [
        {
          name: "Jhin",
          photo: "",
        },
      ],
    };
  }

  return board;
});
function roomDTOToProp({ id }) {
  return {
    id: id,
    listUser: [
      {
        name: "Jhin",
        photo: "",
      },
      {
        name: "Swift",
        photo: "",
      },
    ],
  };
}
const handleRoomListOnchangeEvent = {
  'newRoomCreated': (setRoomList, { room }) => {
    setRoomList((current = []) => current.concat([{ ...roomDTOToProp({ id: room }) }]));
  }
}

function Main({ }) {
  const [roomList, setRoomList] = useState(listRoom);
  const history = useHistory();
  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    roomSocket.on('waitingRoomEventMsg', (response) => {
      const { data, event } = response;
      console.log('receive waitingRoomEventMsg emit: ', { response });
      handleRoomListOnchangeEvent[event](setRoomList, data);
    });

    return () => {
      roomSocket.off('waitingRoomEventMsg', () => { });
    };
  }, [token]);


  const handleCreateRoom = () => {
    roomSocket.emit('create', {
      token: token
    }, (response) => {
      console.log('create room response', { response });
      const { roomID } = response;
      history.push(`/rooms/${roomID}`);
    }
    );
  };

  const handleRoomClick = (roomID) => {
    history.push(`/rooms/${roomID}`);
  };


  return (
    <>
      <HeaderOption onCreateRoom={handleCreateRoom} />
      <ListRoomInfo list={roomList} onRoomClick={handleRoomClick} />
    </>
  );
}

export default Main;
