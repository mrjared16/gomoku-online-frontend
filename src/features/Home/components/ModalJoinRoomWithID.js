import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  TextField,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

const useStyles = makeStyles({
  root: {
    '& .MuiDialog-paper': {
      width: 400,
    },
  },
});

const initialValues = {
  inputRoomID: '',
};

const validationSchemaInputRoomID = Yup.object().shape({
  inputRoomID: Yup.string().trim().required('Required'),
});

function ModalJoinRoomWithID({
  open = false,
  toggle = () => {},
  onSubmit = () => {},
}) {
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={toggle} className={classes.root}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchemaInputRoomID}
        onSubmit={onSubmit}
      >
        {({
          values,
          handleSubmit,
          handleChange,
          handleBlur,
          errors,
          touched,
        }) => (
          <>
            <DialogTitle>JOIN ROOM WITH ID</DialogTitle>
            <DialogContent>
              <Form>
                <TextField
                  name="inputRoomID"
                  label="Room ID"
                  variant="outlined"
                  value={values.inputRoomID}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.inputRoomID) && touched.inputRoomID}
                  helperText={touched.inputRoomID && errors.inputRoomID}
                  size="small"
                  fullWidth
                  autoComplete="off"
                />
              </Form>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                size="small"
              >
                Join
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={toggle}
                size="small"
              >
                Cancel
              </Button>
            </DialogActions>
          </>
        )}
      </Formik>
    </Dialog>
  );
}

export default ModalJoinRoomWithID;
