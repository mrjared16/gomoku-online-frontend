import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	makeStyles,
	TextField,
	CircularProgress,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import logo from "assets/images/logo.png";

const useStyles = makeStyles({
	root: {
		"& .MuiCardHeader-content": {
			display: "flex",
			justifyContent: "center",
		},
		"& .MuiPaper-elevation1": {
			boxShadow: "none",
		},
	},
	logo: {
		width: 80,
		height: 80,
	},
	formContent: {
		display: "flex",
		flexDirection: "column",
		"& .MuiTextField-root": {
			marginTop: 10,
			marginBottom: 10,
		},
	},
	formFooter: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		width: "100%",
		"& button": {
			width: "100%",
		},
		"& h6": {
			marginTop: 20,
		},
	},
	firstNameInputContainer: {
		"& .MuiFormControl-root": {
			marginRight: 5,
		},
	},
	lastNameInputContainer: {
		"& .MuiFormControl-root": {
			marginLeft: 5,
		},
	},
});

const initialValues = {
	newPassword: "",
	confirmNewPassword: "",
};

const validationSchema = Yup.object().shape({
	newPassword: Yup.string()
		.required("Required")
		.min(6, "Password must be at least 6 characters"),
	confirmNewPassword: Yup.string()
		.required("Required")
		.oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
});

function ResetPasswordForm({ onSubmit = () => { }, isSubmitting = false }) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Formik
				initialValues={initialValues}
				onSubmit={onSubmit}
				validationSchema={validationSchema}
			>
				{({ values, handleChange, handleBlur, errors, touched }) => (
					<Form>
						<Card>
							<CardHeader
								title={<img src={logo} alt="logo" className={classes.logo} />}
							/>

							<CardContent>
								<div className={classes.formContent}>
									<TextField
										name="newPassword"
										label="New Password"
										variant="outlined"
										type="password"
										value={values.newPassword}
										onChange={handleChange}
										onBlur={handleBlur}
										error={Boolean(errors.newPassword) && touched.newPassword}
										helperText={touched.newPassword && errors.newPassword}
										size="small"
									/>
									<TextField
										name="confirmNewPassword"
										label="Confirm New Password"
										variant="outlined"
										type="password"
										value={values.confirmNewPassword}
										onChange={handleChange}
										onBlur={handleBlur}
										error={
											Boolean(errors.confirmNewPassword) && touched.confirmNewPassword
										}
										helperText={
											touched.confirmNewPassword && errors.confirmNewPassword
										}
										size="small"
									/>
								</div>
							</CardContent>

							<CardActions>
								<div className={classes.formFooter}>
									<Button
										variant="contained"
										color="primary"
										type="submit"
										// className="text-white"
										size="small"
									>
										{isSubmitting ? (
											<CircularProgress style={{ color: "white" }} size={24} />
										) : (
												"Reset Password"
											)}
									</Button>
								</div>
							</CardActions>
						</Card>
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default ResetPasswordForm;
