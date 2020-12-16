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
    console.log({ room });
    setRoomList((current = []) => current.concat([{ ...roomDTOToProp(room) }]));
  }
}

function Main({ }) {
  const [roomList, setRoomList] = useState(listRoom);
  const history = useHistory();
  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    roomSocket.on('waitingRoomEventMsg', (response) => {
      const { data, event } = response;
      console.log({ response });
      handleRoomListOnchangeEvent[event](setRoomList, data);
    });

    return () => {
      roomSocket.off('waitingRoomEventMsg', () => { });
    };
  }, [token]);


  const handleCreateRoom = () => {
    roomSocket.emit('create');
    history.push("/rooms/newID");
  };

  const handleRoomClick = (roomID) => {
    roomSocket.emit('join', {
      token: token,
      roomID: roomID
    });
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
