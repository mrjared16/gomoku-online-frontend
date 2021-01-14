import { Box, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import LoginForm from "features/Auth/components/LoginForm";
import authApi from "api/authApi";
import { useDispatch } from "react-redux";
import { setToken } from "app/userSlice";
import { useHistory } from "react-router-dom";
import { showToast } from "utils/showToast";
import logo from 'assets/images/logo-navigation.png';

const useStyles = makeStyles({
	root: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		height: "calc(100vh - 50px)",
		overflow: "auto",
	},
	formContainer: {
		display: "flex",
		justifyContent: "center",
		boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
	},
	form: {
		width: 370,
		boxShadow: "0 2px 8px 0 rgba(62,62,82,0.1)",
	},
	banner: {
		top: 0,
		height: 50,
		width: '100%',
		backgroundColor: '#ff7b54',
	},
	logo: {
		cursor: 'pointer',
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
		authApi
			.login(username, password)
			.then((res) => {
				const { accessToken } = res;
				if (accessToken) {
					dispatch(setToken(accessToken));
				}
				setIsSubmitting(false);
				history.push("/");
				showToast("success", "Login successful")
			})
			.catch((err) => {
				setIsSubmitting(false);
				showToast("error", err.response?.data?.message || 'Internal Server');
			});
	};


	const handleLoginWithGoogle = (res) => {
		setIsSubmitting(true);

		const token = res.tokenId;

		authApi
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

	const handleLoginWithFacebook = (res) => {
		setIsSubmitting(true);
		const { accessToken:token } = res;

		authApi
			.loginWithFacebook(token)
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

	const handleClickLogo = () => {
		history.push("/");
	}

	return (
		<>
			<div className={classes.banner}>
				<Box display="flex" justifyContent="center" alignItems="center" height={50} onClick={handleClickLogo} className={classes.logo}>
					<img src={logo} alt="logo" style={{ height: 30, width: 30 }} />
					<span style={{ marginLeft: 10, color: 'white' }}>Caro Online</span>
				</Box>
			</div>
			<div className={classes.root}>
				<div className={classes.formContainer}>
					<div className={classes.form}>
						<LoginForm
							isSubmitting={isSubmitting}
							onSubmit={handleSubmit}
							onLoginWithGoogle={handleLoginWithGoogle}
							onLoginWithFacebook={handleLoginWithFacebook}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default Login;
