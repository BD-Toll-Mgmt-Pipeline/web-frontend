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
} from '@mui/material';
import {Alert} from '@mui/material';
const axios = require('axios');

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  memberId: Yup.string().required('Member Number is required'),
  fatherName: Yup.string().required("Father's Name is required"),
  motherName: Yup.string().required("Mother's Name is required"),
  permanentAddress: Yup.string().required('Permanent Address is required'),
  presentAddress: Yup.string().required('Present Address is required'),
  age: Yup.number().required('Age is required'),
  education: Yup.string().required('Education qualification is required'),
  voterId: Yup.string().required('Voter ID is required'),
  mobileNumber: Yup.string().required('Mobile Number is required'),
  guardianName: Yup.string().required('Guardian Name is required'),
  relationship: Yup.string().required('Relationship with Guardian is required'),
  nomineeName: Yup.string().required('Nominee Name is required'),
  nomineeAddress: Yup.string().required('Nominee Address is required'),
  identifyingMemberName: Yup.string().required(
    'Identifying Member Name is required',
  ),
  identifyingMemberAddress: Yup.string().required(
    'Identifying Member Address is required',
  ),
});

const NewRentalAdd = () => {
  const handleSubmit = async (values, {resetForm, setSubmitting}) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_BASE_URL + '/members',
        values,
      );

      console.log('Member created successfully');
      console.log('Response:', response.data);
      setSnackbarMessage('সদস্য সফলভাবে তৈরী হয়েছে ');
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

  return (
    <Grid container justifyContent='center'>
      <Grid item xs={12} sm={8} md={6}>
        <Paper elevation={3} sx={{p: 4}}>
          <Typography variant='h5' mb={4}>
            Add Rental Form
          </Typography>
          <Formik
            initialValues={{
              name: '',
              memberId: '',
              fatherName: '',
              motherName: '',
              permanentAddress: '',
              presentAddress: '',
              age: '',
              education: '',
              voterId: '',
              mobileNumber: '',
              guardianName: '',
              relationship: '',
              nomineeName: '',
              nomineeAddress: '',
              identifyingMemberName: '',
              identifyingMemberAddress: '',
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
                      label='তারিখ'
                      name='date'
                      fullWidth
                      error={!!errors.identifyingMemberAddress}
                      helperText={
                        <ErrorMessage name='identifyingMemberAddress' />
                      }
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
                      label='অগ্রিম পেমেন্ট '
                      name='advancepayment'
                      fullWidth
                      error={!!errors.identifyingMemberAddress}
                      helperText={
                        <ErrorMessage name='identifyingMemberAddress' />
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

export default NewRentalAdd;
