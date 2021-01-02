import { Button, makeStyles } from "@material-ui/core";
import AvatarCustom from "components/AvatarCustom";
import React from "react";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    margin: 20,
  },
  body: {
    display: "flex",
    justifyContent: "center",
  },
  footer: {
    display: "flex",
    justifyContent: "center",
  },
  avatar: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: 40,
    "& span": {
      textTransform: "none",
      marginTop: 10,
    },
  },
  board: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    width: 100,
    border: "4px solid #D4A531",
    margin: "0px 10px",
  },
});

function RoomInfo({ id = "", index = "", host, XPlayer, OPlayer, onClick }) {
  const classes = useStyles();

  return (
    <Button className={classes.root} onClick={() => onClick(id)} size="small">
      <div className={classes.body}>
        <div className={classes.avatar}>
          <AvatarCustom online={true} photo={XPlayer.photo} />
          <span>{XPlayer.name}</span>
        </div>
        <div className={classes.board}>
          <span>{index}</span>
        </div>
        <div className={classes.avatar}>
          {OPlayer && (
            <>
              <AvatarCustom online={true} photo={OPlayer.photo} />
              <span>{OPlayer.name}</span>
            </>
          )}
        </div>
      </div>
    </Button>
  );
}

export default RoomInfo;
