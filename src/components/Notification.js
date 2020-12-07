import React from "react";
import { Snackbar, makeStyles } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeNotification } from "app/notificationSlice";

const useStyles = makeStyles({
  alert: {
    minWidth: "300px",
  },
});

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

function Notification({ type = "error", message= "" }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    dispatch(removeNotification());
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={type} className={classes.alert}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default Notification;