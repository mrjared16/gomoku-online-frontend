import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles({
	root: {
		marginBottom: 10,
		"& .MuiButton-startIcon": {
			backgroundColor: "#d4a531",
			borderRadius: "50%",
			color: "white",
		}
	}
})

function BackTo({ onSubmit = () => {} }) {
	const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button
        color="primary"
        size="large"
				startIcon={<ArrowBackIcon fontSize="large" />}
				onClick={onSubmit}
      >
        Back to room list
      </Button>
    </div>
  );
}

export default BackTo;
