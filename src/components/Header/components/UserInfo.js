import { Avatar, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    "& .fullName": {
      marginRight: 10,
    },
	},
	avatar: {
		marginRight: 10,
	}
});

function UserInfo({ fullName = "", photo = "" }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar alt={fullName} src={photo} className={classes.avatar} />
      <div className="fullName">{fullName}</div>
    </div>
  );
}

export default UserInfo;
