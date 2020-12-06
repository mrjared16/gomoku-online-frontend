import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import background from "assets/images/background.png";
import LoginForm from "../components/LoginForm";

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

  return (
    <div className={classes.root}>
			<img src={background} alt="background" className={classes.background} />
			<Grid container>
				<Grid item xs={6}>
					<div className={classes.formContainer}>
						<div className={classes.form}>
							<LoginForm />
						</div>
					</div>
				</Grid>
			</Grid>
    </div>
  );
}

export default Login;
