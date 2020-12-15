import React from "react";
import ListRoomInfo from "features/Home/components/ListRoomInfo";
import HeaderOption from "features/Home/components/HeaderOption";
import { range } from "lodash";
import { useHistory } from "react-router-dom";

const listRoom = range(0, 50, 1).map((index) => {
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

function Main(props) {
  const history = useHistory();

  const handleCreateRoom = () => {
    history.push("/rooms/newID");
  };

  const handleRoomClick = (id) => {
    history.push(`/rooms/${id}`);
  };

  return (
    <>
      <HeaderOption onCreateRoom={handleCreateRoom} />
      <ListRoomInfo list={listRoom} onRoomClick={handleRoomClick} />
    </>
  );
}

export default Main;
