import React from "react";
import RoomInfo from "features/Home/components/RoomInfo";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    maxHeight: "calc(100% - 96px)",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: "0.3em",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#d4a531",
    },
  },
});

function ListRoomInfo({ list = [], onRoomClick = (roomID) => { } }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {list.map(({ id = "", host = { name: "", photo: "" }, XPlayer, OPlayer }, index) => (
        <div key={index}>
          <RoomInfo id={id} host={XPlayer} opponent={OPlayer} index={index} onClick={onRoomClick} />
        </div>
      ))}
    </div>
  );
}

export default ListRoomInfo;
