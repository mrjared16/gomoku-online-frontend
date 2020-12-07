import { Avatar, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    "& .fullName": {
      marginLeft: 10,
      marginRight: 10,
    },
  },
});

function UserInfo({ fullName = "Phuc", photo = "" }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar alt={fullName} src={photo} />
      <div className="fullName">{fullName}</div>
    </div>
  );
}

export default UserInfo;
