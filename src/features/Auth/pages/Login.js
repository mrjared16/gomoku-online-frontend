import { Grid, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import LoginForm from "features/Auth/components/LoginForm";
import userApi from "api/userApi";
import { useDispatch } from "react-redux";
import { setToken } from "app/userSlice";
import { useHistory } from "react-router-dom";
import background from "assets/images/background.png";
import { showToast } from "utils/showToast";

const useStyles = makeStyles({
  root: {
		display: "flex",
		alignItems: "center",
		height: "100vh",
	},
	background: {
		position: "absolute",
		width: "100%",
		height: "100%",
		maxHeight: "100%",
		maxWidth: "100%",
		zIndex: "-1",
	},
	formContainer: {
		display: "flex",
		justifyContent: "center",
	},
	form: {
    width: 370,
		boxShadow: "0 2px 8px 0 rgba(62,62,82,0.1)",
  },
});

function Login() {
	const classes = useStyles();

	const [isSubmitting, setIsSubmitting] = useState(false);

	const dispatch = useDispatch();
	const history = useHistory();

  const handleSubmit = (values) => {
    setIsSubmitting(true);
    const { username, password } = values;
    userApi
      .login(username, password)
      .then((res) => {
        const { accessToken } = res;
        dispatch(setToken(accessToken));
				setIsSubmitting(false);
				history.push("/");
				showToast("success", "Login successful")
      })
      .catch((err) => {
				setIsSubmitting(false);
				showToast("error", err.message);
      });
  };

  const handleLoginWithGoogle = (res) => {
    setIsSubmitting(true);

    const token = res.tokenId;

    userApi
      .loginWithGoogle(token)
      .then((res) => {
        const { accessToken } = res;
        dispatch(setToken(accessToken));
				setIsSubmitting(false);
				history.push("/");
				showToast("success", "Login successful")
      })
      .catch((err) => {
				setIsSubmitting(false);
				showToast("error", err.message);
      });
  };

  return (
    <div className={classes.root}>
			<img src={background} alt="background" className={classes.background} />
			<Grid container>
				<Grid item xs={6}></Grid>
				<Grid item xs={6}>
					<div className={classes.formContainer}>
						<div className={classes.form}>
						<LoginForm
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
            onLoginWithGoogle={handleLoginWithGoogle}
          />
						</div>
					</div>
				</Grid>
			</Grid>
    </div>
  );
}

export default Login;
