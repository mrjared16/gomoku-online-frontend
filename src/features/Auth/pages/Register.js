import { makeStyles } from "@material-ui/core";
import React from "react";
import RegisterForm from "features/Auth/components/RegisterForm";

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

function Register() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}

export default Register;
