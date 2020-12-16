import { makeStyles } from "@material-ui/core";
import AvatarCustom from "components/AvatarCustom";
import React from "react";
import AccessAlarmsIcon from "@material-ui/icons/AccessAlarms";
import BrushIcon from "@material-ui/icons/Brush";
import Brightness7Icon from "@material-ui/icons/Brightness7";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 150,
    border: "3px solid #ce9782",
    position: "relative",
  },
  symbol: {
    position: "absolute",
    left: 10,
    top: -17,
    backgroundColor: "white",
    fontSize: 30,
  },
  time: {
    display: "flex",
    alignItems: "center",
    alignSelf: "flex-start",
    marginLeft: 20,
    "& span": {
      marginLeft: 5,
      marginRight: 15,
    },
  },
  winner: {
    position: "absolute",
    right: 10,
    top: -17,
    backgroundColor: "white",
  },
});

function UserInfoInRoom({
  userInfo = {
    name: "",
    photo: ""
  },
  symbol = "X",
  playerTurn = false,
  winner = true,
}) {
  const classes = useStyles();
  const { name, photo } = userInfo;
  return (
    <div className={classes.root}>
      <AvatarCustom online={true} photo={photo} />
      <p>{name}</p>
      <div className={classes.time}>
        <AccessAlarmsIcon style={{ color: "red" }} />
        <span>1:00</span>
        {playerTurn && <BrushIcon style={{ color: "blue" }} />}
      </div>
      <span
        className={classes.symbol}
        style={{ color: symbol === "X" ? "red" : "green" }}
      >
        {symbol}
      </span>
      {winner && (
        <span className={classes.winner}>
          <Brightness7Icon style={{ color: "yellow", fontSize: 30 }} />
        </span>
      )}
    </div>
  );
}

export default UserInfoInRoom;
