import React, {useState, useEffect} from 'react';
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
import {DatePicker} from '@mui/lab';

const axios = require('axios');

const validationSchema = Yup.object().shape({
  date: Yup.date().required('Date is required'),
  // rental_start_date: Yup.date().required('Date is required'),
  name: Yup.string().required('Name is required'),
  rentalproperty: Yup.string().required('Rental Property is required'),
  permanentAddress: Yup.string().required('Permanent Address is required'),
  currentAddress: Yup.string().required('Present Address is required'),
  voterId: Yup.string().required('Voter ID is required'),
  phone: Yup.string().required('Mobile Number is required'),
  advancepay: Yup.string().required('Advance Payment is required'),
  totalpay: Yup.string().required('Total Payment is required'),
  rentaltype: Yup.string().required('Rent Type is required'),
  contacttenure: Yup.string().required('Contact Tenure is required'),
});

const NewRentalAdd = () => {
  const [types, setTypes] = useState([]);
  const [propertyName, setPropertyName] = useState([]);

  useEffect(() => {
    getRentalTypes();
    getRentalPropertyTypes();
  }, []);

  const getRentalTypes = async () => {
    const response = await axios.get(
      process.env.REACT_APP_BASE_URL + '/rental/rental-types',
    );
    setTypes(response.data.data);
  };

  const getRentalPropertyTypes = async () => {
    const response = await axios.get(
      process.env.REACT_APP_BASE_URL + '/rental/rental-property',
    );
    setPropertyName(response.data.data);
  };

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('');

  const contact_tenure = [
    {value: '1', label: 'এককালীন'},
    {value: '2', label: 'মাসিক'},
  ];

  const handleSubmit = async (values, {resetForm, setSubmitting}) => {
    const addedStatusValues = {
      ...values,
      status: 'true',
    };
    console.log(addedStatusValues, 'addedStatusValues');
    try {
      await axios.post(
        process.env.REACT_APP_BASE_URL + '/rental',
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
            Add Rental Form
          </Typography>

          <Formik
            initialValues={{
              date: new Date().toISOString().split('T')[0],
              rental_start_date: '',
              rentalproperty: '',
              name: '',
              permanentAddress: '',
              currentAddress: '',
              voterId: '',
              phone: '',
              advancepay: '',
              totalpay: '',
              rentaltype: '',
              contacttenure: '',
            }}
            validationSchema={validationSchema}
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
                  {/* <Grid item xs={12}>
                    <Field
                      as={TextField}
                      label='ভাড়া সম্পত্তির পরিচিতি'
                      name='rentalproperty'
                      fullWidth
                      error={!!errors.rentalproperty}
                      helperText={<ErrorMessage name='rentalproperty' />}
                    />
                  </Grid> */}
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      select
                      label='ভাড়া সম্পত্তির পরিচিতি'
                      name='rentalproperty'
                      fullWidth
                      error={!!errors.rentalproperty}
                      helperText={<ErrorMessage name='rentalproperty' />}
                    >
                      {propertyName.map((option) => (
                        <MenuItem key={option.propertyName} value={option.propertyName}>
                          {option.propertyName}
                        </MenuItem>
                      ))}
                    </Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      select
                      label='ভাড়ার ধরণঃ'
                      name='rentaltype'
                      fullWidth
                      error={!!errors.rentaltype}
                      helperText={<ErrorMessage name='rentaltype' />}
                    >
                      {types.map((option) => (
                        <MenuItem key={option.value} value={option.label}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      select
                      label='চুক্তির ধরণ'
                      name='contacttenure'
                      fullWidth
                      error={!!errors.contacttenure}
                      helperText={<ErrorMessage name='contacttenure' />}
                    >
                      {contact_tenure.map((option) => (
                        <MenuItem key={option.value} value={option.label}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={DatePicker}
                      label='ভাড়া কার্যকর হওয়ার তারিখ'
                      name='rental_start_date'
                      inputFormat='dd/MM/yyyy'
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!errors.rental_start_date}
                          helperText={<ErrorMessage name='rental_start_date' />}
                        />
                      )}
                      value={values.rental_start_date}
                      onChange={(value) =>
                        setFieldValue('rental_start_date', value)
                      }
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
                      name='currentAddress'
                      fullWidth
                      error={!!errors.currentAddress}
                      helperText={<ErrorMessage name='currentAddress' />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      label='জাতীয় পরিচয়পত্র নম্বর (NID)নাম্বারঃ'
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
                      name='phone'
                      fullWidth
                      error={!!errors.phone}
                      helperText={<ErrorMessage name='phone' />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      label='মোট চুক্তির পরিমান টাকায়(এককালীন/মাসিক)'
                      name='totalpay'
                      fullWidth
                      error={!!errors.totalpay}
                      helperText={<ErrorMessage name='totalpay' />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      label='অগ্রিম পেমেন্ট'
                      name='advancepay'
                      fullWidth
                      error={!!errors.advancepay}
                      helperText={<ErrorMessage name='advancepay' />}
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
