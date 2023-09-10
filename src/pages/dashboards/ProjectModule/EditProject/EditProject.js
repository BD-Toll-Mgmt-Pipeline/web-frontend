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
} from '@mui/material';
import {Alert} from '@mui/material';
// import {DatePicker} from '@mui/lab';
const axios = require('axios');
import {useParams} from 'react-router-dom';

const validationSchema = Yup.object().shape({
  // openDate: Yup.date().required('Date is required'),
  projectName: Yup.string().required('Project Name is required'),
  projectAddress: Yup.string().required('Address is required'),
  plotNumbers: Yup.string().required('Plot Number is required'),
  // plotSharePrice: Yup.string().required('Share Price is required'),
});

const EditProject = () => {
  useEffect(() => {
    getProjectDetailsById(id);
  }, []);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('');
  const [projectDetails, setProjectDetails] = useState(false);

  const {id} = useParams();

  const handleSubmit = async (values, {resetForm, setSubmitting}) => {
    try {
      await axios.put(
        process.env.REACT_APP_BASE_URL + `/project/${id}`,
        values,
      );
      setSnackbarMessage('সফল হয়েছে ');
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

  const getProjectDetailsById = async (projectId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/project/${projectId}`,
      );
      setProjectDetails(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching project details:', error);
      throw error;
    }
  };

  return (
    <Grid container justifyContent='center'>
      <Grid item xs={12} sm={8} md={6}>
        <Paper elevation={3} sx={{p: 4}}>
          <Typography variant='h5' mb={4}>
            Edit Project Form
          </Typography>
          <Formik
            enableReinitialize
            initialValues={{
              // openDate: new Date().toISOString().split('T')[0],
              projectName: projectDetails?.projectName || '',
              projectAddress: projectDetails?.projectAddress || '',
              plotNumbers: projectDetails?.plotNumbers || '',
              plotSharePrice: projectDetails?.plotSharePrice || '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({errors}) => (
              <Form>
                <Grid container spacing={3}>
                  {/* <Grid item xs={12}>
                    <Field
                      as={DatePicker}
                      label='প্রজেক্ট অনুমোদনের তারিখ '
                      name='openDate'
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
                  </Grid> */}
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      label='প্রজেক্টের নাম'
                      name='projectName'
                      fullWidth
                      error={!!errors.name}
                      helperText={<ErrorMessage name='name' />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      label='প্রজেক্টের ঠিকানা'
                      name='projectAddress'
                      fullWidth
                      error={!!errors.projectAddress}
                      helperText={<ErrorMessage name='projectAddress' />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      label='অনুমোদিত প্লট সংখ্যা'
                      name='plotNumbers'
                      fullWidth
                      error={!!errors.plotNumbers}
                      helperText={<ErrorMessage name='plotNumbers' />}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      label='প্রত্যেক প্লট শেয়ার মূল্য (আনুমানিক)'
                      name='plotSharePrice'
                      fullWidth
                      error={!!errors.plotSharePrice}
                      helperText={<ErrorMessage name='plotSharePrice' />}
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

export default EditProject;
