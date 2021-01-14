import { Box, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import RegisterForm from "features/Auth/components/RegisterForm";
import { useDispatch, useSelector } from "react-redux";
import authApi from "api/authApi";
import { setToken } from "app/userSlice";
import { useHistory, useLocation } from "react-router-dom";
import { showToast } from "utils/showToast";
import logo from 'assets/images/logo-navigation.png';
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import ResetPasswordForm from "../components/ResetPasswordForm";

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

function ResetPassword() {
	const classes = useStyles();

	const [isSubmitting, setIsSubmitting] = useState(false);
	const history = useHistory();
	const location = useLocation();
	const token = location.pathname.split('/').pop();

	const dispatch = useDispatch();

	const handleClickLogo = () => {
		history.push("/");
	}

	const handleSubmit = (values) => {
		const { newPassword, confirmNewPassword } = values;
		setIsSubmitting(true);
		authApi.postResetPassword(token, newPassword, confirmNewPassword).then(response => {
			showToast('success', response.message);
			setIsSubmitting(false);
			history.push('/login');
		}).catch(err => {
			showToast('error', err.response?.data?.message || 'Internal Server');
		}) 
		.showToast('success', 'Reset password successful');
	};

	useEffect(() => {
		authApi.getResetPassword(token).then((response) => {
			showToast('success', response.message);
		}).catch(err => {
			showToast('error', err.response?.data?.message || 'Internal Server');
		})
	}, [])

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
						<ResetPasswordForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
					</div>
				</div>
			</div>
		</>
	);
}

export default ResetPassword;
