import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import RegisterForm from "features/Auth/components/RegisterForm";
import { useDispatch } from "react-redux";
import userApi from "api/userApi";
import { setToken } from "app/userSlice";
import { useHistory } from "react-router-dom";
import { setNotification } from "app/notificationSlice";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
		height: "100vh",
		padding: "20px 0px",
  },
  form: {
    width: 370,
  },
});

function Register() {
	const classes = useStyles();
	
	const [isSubmitting, setIsSubmitting] = useState(false);
	const history = useHistory();

	const dispatch = useDispatch();
	
	const handleSubmit = (values) => {
		setIsSubmitting(true);
		const { firstName, lastName, username, email, password } = values;
		userApi.register(firstName, lastName, username, email, password).then((res) => {
			const { accessToken } = res;
			dispatch(setToken(accessToken));
			setIsSubmitting(false);
			history.push("/");
		}).catch(err => {
			setIsSubmitting(false);
			dispatch(setNotification({
				type: "error",
				message: err.message,
			}));
		})
	};

  return (
    <div className={classes.root}>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <RegisterForm isSubmitting={isSubmitting} onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default Register;
