import { makeStyles } from "@material-ui/core";
import React from "react";
import LoginForm from "features/Auth/components/LoginForm";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "calc(100vh - 48px)",
  },
  form: {
    width: 370,
  },
});

function Login() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default Login;
