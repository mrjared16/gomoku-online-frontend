import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Grid,
	makeStyles,
	TextField,
	Typography,
	CircularProgress,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
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
	firstName: "",
	lastName: "",
	username: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const validationSchema = Yup.object().shape({
	firstName: Yup.string().trim().required("Required"),
	lastName: Yup.string().trim().required("Required"),
	username: Yup.string().trim().required("Required"),
	email: Yup.string().email("Email is not valid").required("Required"),
	password: Yup.string()
		.required("Required")
		.min(6, "Password must be at least 6 characters"),
	confirmPassword: Yup.string()
		.required("Required")
		.oneOf([Yup.ref("password"), null], "Passwords must match"),
});

function RegisterForm({ onSubmit = () => { }, isSubmitting = false }) {
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
									<Grid container>
										<Grid
											item
											xs={6}
											className={classes.firstNameInputContainer}
										>
											<TextField
												name="firstName"
												label="First Name"
												variant="outlined"
												value={values.firstName}
												onChange={handleChange}
												onBlur={handleBlur}
												error={Boolean(errors.firstName) && touched.firstName}
												helperText={touched.firstName && errors.firstName}
												size="small"
											/>
										</Grid>
										<Grid
											item
											xs={6}
											className={classes.lastNameInputContainer}
										>
											<TextField
												name="lastName"
												label="Last Name"
												variant="outlined"
												value={values.lastName}
												onChange={handleChange}
												onBlur={handleBlur}
												error={Boolean(errors.lastName) && touched.lastName}
												helperText={touched.lastName && errors.lastName}
												size="small"
											/>
										</Grid>
									</Grid>
									<TextField
										name="username"
										label="Username"
										variant="outlined"
										value={values.username}
										onChange={handleChange}
										onBlur={handleBlur}
										error={Boolean(errors.username) && touched.username}
										helperText={touched.username && errors.username}
										size="small"
									/>
									<TextField
										name="email"
										label="Email"
										variant="outlined"
										value={values.email}
										onChange={handleChange}
										onBlur={handleBlur}
										error={Boolean(errors.email) && touched.email}
										helperText={touched.email && errors.email}
										size="small"
									/>
									<TextField
										name="password"
										label="Password"
										variant="outlined"
										type="password"
										value={values.password}
										onChange={handleChange}
										onBlur={handleBlur}
										error={Boolean(errors.password) && touched.password}
										helperText={touched.password && errors.password}
										size="small"
									/>
									<TextField
										name="confirmPassword"
										label="Confirm Password"
										variant="outlined"
										type="password"
										value={values.confirmPassword}
										onChange={handleChange}
										onBlur={handleBlur}
										error={
											Boolean(errors.confirmPassword) && touched.confirmPassword
										}
										helperText={
											touched.confirmPassword && errors.confirmPassword
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
												"Register"
											)}
									</Button>
									<Typography variant="subtitle1" className="text-grey">
										Already have an account?{" "}
										<Link className="custom-link" to="/login">
											Login
                    </Link>
									</Typography>
								</div>
							</CardActions>
						</Card>
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default RegisterForm;
