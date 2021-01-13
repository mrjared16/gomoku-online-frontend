import { makeStyles } from "@material-ui/core";
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

function UserInfo({ name = "", photo = "" }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
			<AvatarCustom alt={name} src={photo} />
      <div className="fullName">{name}</div>
    </div>
  );
}

export default UserInfo;
