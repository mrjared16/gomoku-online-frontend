import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import LoginForm from "features/Auth/components/LoginForm";
import userApi from "api/userApi";
import { useDispatch } from "react-redux";
import { setToken } from "app/userSlice";

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
	
	const [isSubmitting, setIsSubmitting] = useState(false);

	const dispatch = useDispatch();
	
	const handleSubmit = (values) => {
		setIsSubmitting(true);
		const { username, password } = values;
		userApi.login(username, password).then((res) => {
			dispatch(setToken("testToken"));
			setIsSubmitting(false);
		}).catch(err => {
			console.log(err);
			dispatch(setToken("testToken"));
			setIsSubmitting(false);
		})
	};

  return (
    <div className={classes.root}>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <LoginForm isSubmitting={isSubmitting} onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default Login;
