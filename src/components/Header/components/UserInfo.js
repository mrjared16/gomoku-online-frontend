import { Avatar, makeStyles } from "@material-ui/core";
import AvatarCustom from "components/AvatarCustom";
import React from "react";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    "& .fullName": {
      marginLeft: 10,
    },
	},
});

function UserInfo({ fullName = "", photo = "" }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
			<AvatarCustom alt={fullName} src={photo} />
      <div className="fullName">{fullName}</div>
    </div>
  );
}

export default UserInfo;
