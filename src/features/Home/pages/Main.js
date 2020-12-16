import HeaderOption from "features/Home/components/HeaderOption";
import ListRoomInfo from "features/Home/components/ListRoomInfo";
import { range } from "lodash";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import socketIOClient from "socket.io-client";

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

let roomSocket = null;
function Main({ }) {
  const [roomList, setRoomList] = useState(listRoom);
  const history = useHistory();
  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    roomSocket = socketIOClient(
      `${process.env.REACT_APP_SOCKET_URL}/room`,
      {
        transports: ["websocket"],
        upgrade: false,
        query: { token },
      }
    );

    roomSocket.on("waitingRoomEventMsg", (response) => {
      const { data, event } = response;
      console.log({ response });
      handleRoomListOnchangeEvent[event](setRoomList, data);
    });

    return () => {
      // roomSocket.close();
      // roomSocket = null;
    };
  }, [token]);


  const handleCreateRoom = () => {
    roomSocket.emit('create');
    history.push("/rooms/newID");
  };

  const handleRoomClick = (id) => {
    roomSocket.emit('join', id);
    history.push(`/rooms/${id}`);
  };


  return (
    <>
      <HeaderOption onCreateRoom={handleCreateRoom} />
      <ListRoomInfo list={roomList} onRoomClick={handleRoomClick} />
    </>
  );
}

export default Main;
