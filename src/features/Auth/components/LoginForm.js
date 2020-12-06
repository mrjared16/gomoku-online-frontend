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
import { Link } from "react-router-dom";
import * as Yup from "yup";
import logo from "assets/images/logo.png";

const useStyles = makeStyles({
  root: {
    "& .MuiCardHeader-content": {
      display: "flex",
      justifyContent: "center",
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
      marginBottom: 20,
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
      width: "100%",
      marginBottom: 20,
    },
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
  onRegisterClick = () => {},
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
                  />
                </div>
              </CardContent>

              <CardActions>
                <div className={classes.formFooter}>
                  <Button variant="contained" color="primary" type="submit" className="text-white">
                    {isSubmitting ? (
                      <CircularProgress style={{color: "white"}} size={24} />
                    ) : (
                      "Login"
                    )}
                  </Button>
                  <GoogleLogin
                    clientId="208015310401-qcbrc5im2ajats2h1b2kgotjr73lod7t.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={onLoginWithGoogle}
                    onFailure={() => {}}
                    cookiePolicy={"single_host_origin"}
                  />
                  <Typography variant="subtitle1" className="text-grey">
                    Don't have an account?{" "}
                    <Link className="custom-link" to="/register">
                      Register
                    </Link>
                  </Typography>
									<Link className="custom-link" to="/">
                    Back home
                  </Link>
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
