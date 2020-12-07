import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import RegisterForm from "features/Auth/components/RegisterForm";
import { useDispatch } from "react-redux";
import userApi from "api/userApi";
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

function Register() {
	const classes = useStyles();
	
	const [isSubmitting, setIsSubmitting] = useState(false);

	const dispatch = useDispatch();
	
	const handleSubmit = (values) => {
		setIsSubmitting(true);
		const { firstName, lastName, username, email, password } = values;
		userApi.register(firstName, lastName, username, email, password).then((res) => {
			dispatch(setToken("testToken"));
			setIsSubmitting(false);
		}).catch(err => {
			console.log(err);
			setIsSubmitting(false);
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
