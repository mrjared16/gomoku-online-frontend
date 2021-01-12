import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import logo from "assets/images/logo.png";
import FacebookIcon from '@material-ui/icons/Facebook';

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
      display: "flex",
			justifyContent: "center",
			alignItems: "center",
      width: "100%",
			marginBottom: 20,
		},
		"& span": {
			width: "100%",
			"& button": {
				height: 43,
				fontSize: 14,
				"& svg": {
					marginRight: 5,
				}
			}
		}
  },
});

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  username: Yup.string().trim().required("Required"),
  password: Yup.string().required("Required"),
});

function LoginForm({
  onSubmit = () => {},
  onLoginWithGoogle = () => {},
  isSubmitting = false,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, handleChange, handleBlur, errors, touched }) => (
          <Form>
            <Card>
              <CardHeader
                title={<img src={logo} alt="logo" className={classes.logo} />}
              ></CardHeader>

              <CardContent>
                <div className={classes.formContent}>
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
                      "Login"
                    )}
                  </Button>
                  <GoogleLogin
                    clientId="545392822117-njg9uu012uoo6c6nd9m7hjc7fpv3ejun.apps.googleusercontent.com"
                    buttonText="LOGIN WITH GOOGLE"
                    onSuccess={onLoginWithGoogle}
                    onFailure={() => {}}
                    cookiePolicy={"single_host_origin"}
                  />
                  <FacebookLogin
                    appId="482669579414663"
                    fields="name,email,picture"
										callback={(res) => console.log(res)}
										icon={<FacebookIcon />}
                  />
                  <Typography variant="subtitle1" className="text-grey">
                    Don't have an account?{" "}
                    <Link className="custom-link" to="/register">
                      Register
                    </Link>
                  </Typography>
									<Typography variant="subtitle1" className="text-grey">
                    <Link className="custom-link" to="/forgotPassword">
											Forgot password?{" "}
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

export default LoginForm;
