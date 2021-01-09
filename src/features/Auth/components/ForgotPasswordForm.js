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
  email: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Email is not valid").required("Required"),
});

function ForgotPasswordForm({
  onSubmit = () => {},
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
                      "Send token"
                    )}
                  </Button>
                  <Typography variant="subtitle1" className="text-grey">
                    <Link className="custom-link" to="/login">
                      Back to login
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

export default ForgotPasswordForm;
