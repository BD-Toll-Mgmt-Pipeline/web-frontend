import React, {useState, useEffect} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
// import * as Yup from 'yup';
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Snackbar,
} from '@mui/material';
import {Alert} from '@mui/material';
import {DatePicker} from '@mui/lab';

const axios = require('axios');

// const validationSchema = Yup.object().shape({
//   date: Yup.date().required('Date is required'),
//   name: Yup.string().required('Name is required'),
//   rentalproperty: Yup.string().required('Rental Property is required'),
//   memberId: Yup.string().required('Member Id is required'),
//   permanentAddress: Yup.string().required('Permanent Address is required'),
//   currentAddress: Yup.string().required('Present Address is required'),
//   voterId: Yup.string().required('Voter ID is required'),
//   phone: Yup.string().required('Mobile Number is required'),
//   reqMoney: Yup.string().required('Advance Payment is required'),
//   totalpay: Yup.string().required('Total Payment is required'),
// });

const NewLoanAdd = () => {
  const [, setTypes] = useState([]);

  useEffect(() => {
    getRentalTypes();
  }, []);

  const getRentalTypes = async () => {
    const response = await axios.get(
      process.env.REACT_APP_BASE_URL + '/rental/rental-types',
    );
    setTypes(response.data.data);
  };

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('');

  const handleSubmit = async (values, {resetForm, setSubmitting}) => {
    const addedStatusValues = {
      ...values,
      status: 'true',
    };
    try {
      await axios.post(
        process.env.REACT_APP_BASE_URL + '/loan',
        addedStatusValues,
      );
      setSnackbarMessage('সফলভাবে তৈরী হয়েছে ');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      resetForm();
    } catch (error) {
      console.error('Failed to create member');
      console.error('Error:', error.message);
      setSnackbarMessage('ব্যর্থ হয়েছে ');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Grid container justifyContent='center'>
      <Grid item xs={12} sm={8} md={6}>
        <Paper elevation={3} sx={{p: 4}}>
          <Typography variant='h5' mb={4}>
            Add Loan Request Form
          </Typography>

          <Formik
            initialValues={{
              date: new Date().toISOString().split('T')[0],
              name: '',
              memberID: '',
              rentaltype: '',
              paymentDeadline: '',
            }}
            // validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({values, errors, setFieldValue}) => (
              <Form>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Field
                      as={DatePicker}
                      label='আবেদনের তারিখ'
                      name='date'
                      inputFormat='dd/MM/yyyy'
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!errors.date}
                          helperText={<ErrorMessage name='date' />}
                        />
                      )}
                      value={values.date}
                      onChange={(value) => setFieldValue('date', value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      label='মেম্বার আইডি:'
                      name='memberID'
                      fullWidth
                      error={!!errors.memberID}
                      helperText={<ErrorMessage name='memberID' />}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      label='আবেদনকারীর নামঃ'
                      name='name'
                      fullWidth
                      error={!!errors.name}
                      helperText={<ErrorMessage name='name' />}
                      InputLabelProps={{
                        shrink: true, // Keep the label above the input field even when empty
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      label='কর্জে হাসনার পরিমান (টাকা)'
                      name='reqMoney'
                      fullWidth
                      error={!!errors.reqMoney}
                      helperText={<ErrorMessage name='reqMoney' />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={DatePicker}
                      label='পরিশোধের সময়কাল'
                      name='paymentDeadline'
                      inputFormat='dd/MM/yyyy'
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!errors.date}
                          helperText={<ErrorMessage name='paymentDeadline' />}
                        />
                      )}
                      value={values.date}
                      onChange={(value) =>
                        setFieldValue('paymentDeadline', value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type='submit' variant='contained' color='primary'>
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Paper>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
      >
        <Alert severity={snackbarSeverity} onClose={handleSnackbarClose}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default NewLoanAdd;
