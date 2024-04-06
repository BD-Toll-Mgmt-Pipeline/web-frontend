import React, {useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Snackbar,
  MenuItem,
} from '@mui/material';
import {Alert} from '@mui/material';

const axios = require('axios');

const validationSchema = Yup.object().shape({
  payment_type: Yup.string().required('Payment Type is required'),
  card_number: Yup.string().required('Card Number is required'),
  pin: Yup.string().required('PIN is required'),
});

const paymentTypes = ['bkash', 'nagad', 'visa', 'mastercard', 'amex'];

const NewPayments = () => {
  const handleSubmit = async (values, {resetForm, setSubmitting}) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_BASE_URL + '/api/add-payment',
        values,
      );
      console.log('Payment created successfully');
      console.log('Response:', response.data);
      setSnackbarMessage('সফলভাবে তৈরী হয়েছে ');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      resetForm();
    } catch (error) {
      console.error('Failed to create payment');
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

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('');

  return (
    <Grid container justifyContent='center'>
      <Grid item xs={12} sm={8} md={6}>
        <Paper elevation={3} sx={{p: 4}}>
          <Typography variant='h5' mb={4}>
            Add Payments Details
          </Typography>
          <Formik
            initialValues={{
              payment_type: '',
              card_number: '',
              pin: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({errors}) => (
              <Form>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      select
                      label='Payment Type'
                      name='payment_type'
                      fullWidth
                      error={!!errors.payment_type}
                      helperText={<ErrorMessage name='payment_type' />}
                    >
                      {paymentTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Field>
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      label='Card Number/Mobile Number'
                      name='card_number'
                      fullWidth
                      error={!!errors.card_number}
                      helperText={<ErrorMessage name='card_number' />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      label='PIN'
                      name='pin'
                      fullWidth
                      type='password'
                      error={!!errors.pin}
                      helperText={<ErrorMessage name='pin' />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      label='Vehicle Number (Please Enter Exact)'
                      name='vehicle_number'
                      fullWidth
                      error={!!errors.pin}
                      helperText={<ErrorMessage name='vehicle_number' />}
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

export default NewPayments;
