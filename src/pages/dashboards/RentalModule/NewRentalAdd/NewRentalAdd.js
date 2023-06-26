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
import {DatePicker} from '@mui/lab';
import {Alert} from '@mui/material';

const axios = require('axios');

const validationSchema = Yup.object().shape({
  date: Yup.date().required('Date is required'),
  name: Yup.string().required('Name is required'),
  permanentAddress: Yup.string().required('Permanent Address is required'),
  presentAddress: Yup.string().required('Present Address is required'),
  voterId: Yup.string().required('Voter ID is required'),
  mobileNumber: Yup.string().required('Mobile Number is required'),
  advancepayment: Yup.string().required('Advance Payment is required'),
  rentType: Yup.string().required('Rent Type is required'),
});

const NewRentalAdd = () => {
  const handleSubmit = async (values, {resetForm, setSubmitting}) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_BASE_URL + '/rental',
        values,
      );

      console.log('Member created successfully');
      console.log('Response:', response.data);
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

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('');

  const rentTypeOptions = [
    {value: '1', label: 'হাউস/ফ্লাট'},
    {value: '2', label: 'দোকান'},
    {value: '3', label: 'গাড়ি/মাইক্রো '},
  ];

  return (
    <Grid container justifyContent='center'>
      <Grid item xs={12} sm={8} md={6}>
        <Paper elevation={3} sx={{p: 4}}>
          <Typography variant='h5' mb={4}>
            Add Rental Form
          </Typography>
          <Formik
            initialValues={{
              date: new Date(),
              name: '',
              permanentAddress: '',
              presentAddress: '',
              voterId: '',
              mobileNumber: '',
              advancepayment: '',
              rentType: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({errors}) => (
              <Form>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Field
                      as={DatePicker}
                      label='তারিখ'
                      name='date'
                      fullWidth
                      renderInput={(props) => (
                        <TextField {...props} inputFormat='DD/MM/YYYY' />
                      )}
                      error={!!errors.date}
                      helperText={<ErrorMessage name='date' />}
                      PopperProps={{
                        onClose: () => {
                          const field =
                            document.querySelector('input[name="date"]');
                          field.blur();
                        },
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
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      select
                      label='ভাড়ার ধরণঃ'
                      name='rentType'
                      fullWidth
                      error={!!errors.rentType}
                      helperText={<ErrorMessage name='rentType' />}
                    >
                      {rentTypeOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      label='স্থায়ী ঠিকানাঃ  গ্রামঃ থানাঃ উপজেলাঃ জেলাঃ'
                      name='permanentAddress'
                      fullWidth
                      error={!!errors.permanentAddress}
                      helperText={<ErrorMessage name='permanentAddress' />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      label='বর্তমান ঠিকানাঃ  বাড়ি নংঃ রোড নংঃ ব্লক/থানাঃ জেলাঃ'
                      name='presentAddress'
                      fullWidth
                      error={!!errors.presentAddress}
                      helperText={<ErrorMessage name='presentAddress' />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      label='ভোটার নাম্বারঃ'
                      name='voterId'
                      fullWidth
                      error={!!errors.voterId}
                      helperText={<ErrorMessage name='voterId' />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      label='মোবাইল নাম্বারঃ'
                      name='mobileNumber'
                      fullWidth
                      error={!!errors.mobileNumber}
                      helperText={<ErrorMessage name='mobileNumber' />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      label='অগ্রিম পেমেন্ট'
                      name='advancepayment'
                      fullWidth
                      error={!!errors.advancepayment}
                      helperText={<ErrorMessage name='advancepayment' />}
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

export default NewRentalAdd;
