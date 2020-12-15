import { makeStyles } from "@material-ui/core";
import React from "react";
import CreateRoom from "features/Home/components/CreateRoom";
import FilterRoom from "./FilterRoom";
import Search from "./Search";

const useStyles = makeStyles({
  root: {
    display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		padding: "20px 25px",
  },
});

function HeaderOption({ onCreateRoom = () => {} }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CreateRoom onSubmit={onCreateRoom} />
			<div style={{display: "flex"}}>
				<FilterRoom />
				<Search />
			</div>
    </div>
  );
}

export default HeaderOption;
