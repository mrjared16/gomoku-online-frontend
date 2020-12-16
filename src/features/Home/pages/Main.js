import HeaderOption from "features/Home/components/HeaderOption";
import ListRoomInfo from "features/Home/components/ListRoomInfo";
import { range } from "lodash";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { roomSocket } from 'socket/roomSocket';
import axiosClient from "api/axiosClient";

function roomDTOToProp({ id, host = {}, opponent = {} }) {
  const hostMapped = host.name ? {
    name: host.name,
    photo: ""
  } : {};
  const opponentMapped = (opponent && opponent.name) ? {
    name: opponent.name,
    photo: ""
  } : null;
  const roomConverted = {
    id: id,
    host: { ...hostMapped },
    opponent: opponentMapped,
  };
  return roomConverted;
}
const handleRoomListOnchangeEvent = {
  'roomUpdated': (setRoomList, { room, host = {}, opponent = {} }) => {
    setRoomList((current = []) => {
      const changedRoom = {
        ...roomDTOToProp({
          id: room,
          host,
          opponent
        })
      };
      if (!!current.find(item => item.id = room))
        return current.map((currentRoom) => {
          const { id } = currentRoom;
          if (id == room) {
            return changedRoom;
          }
          return currentRoom;
        })

      return current.concat([changedRoom]);
    });
  }
}


function Main({ }) {
  const [roomList, setRoomList] = useState([]);
  const history = useHistory();
  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    fetchRooms();
  }, [])

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

  const fetchRooms = async () => {
    axiosClient
      .get(`${process.env.REACT_APP_API_URL}/rooms`)
      .then((response) => {
        const { rooms } = response;
        const roomsProp = rooms.map((room) => {
          const convertedRoom = roomDTOToProp(room);
          return convertedRoom;
        });
        setRoomList((list) => roomsProp);
      });
  }

  const handleCreateRoom = () => {
    roomSocket.emit('create', {
      token: token
    }, (response) => {
      console.log('create room response', { response });
      if (!response)
        return;
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
