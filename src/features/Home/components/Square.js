import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    width: 30,
    border: "1px solid #d4a531",
		cursor: "pointer",
    userSelect: "none",
    "& span": {
      fontSize: 20,
    },
  },
});

function Square({ value = -1, onClick = () => {} }) {
  const classes = useStyles();

  const renderValue = () => {
    switch (value) {
      case -1:
        return "";
      case 0:
        return <span style={{ color: "red" }}>X</span>;
      case 1:
        return <span style={{ color: "green" }}>O</span>;
      default:
        return "";
    }
  };

  return (
    <div className={classes.root} onClick={onClick}>
      {renderValue()}
    </div>
  );
}

export default Square;
