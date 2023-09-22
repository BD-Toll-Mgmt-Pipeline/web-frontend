import React, {useState, useEffect} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
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
import axios from 'axios';
import * as Yup from 'yup';

const NewLoanAdd = () => {
  const [memberSearch, setMemberSearch] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('');
  const [memberid, setMemberId] = useState('');

  console.log(memberSearch, 'memberSearch');

  const searchMemberbyID = async (memberid) => {
    try {
      const query = memberid;
      const page = 1;
      const perPage = 10;

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/members/findMember`,
        {
          params: {
            query,
            page,
            perPage,
          },
        },
      );
      setMemberSearch(response.data.members);
      console.log(response.data.members);
    } catch (error) {
      console.error('Error:', error.message);
      setSnackbarMessage('মেম্বার পাওয়া যায়নি');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    setMemberSearch({});
  }, [snackbarOpen]);

  const validationSchema = Yup.object().shape({
    date: Yup.date().required('আবেদনের তারিখ is required'),
    memberID: Yup.string().required('সদস্য নম্বর is required'),
    name: Yup.string().required('আবেদনকারীর নাম is required'),
    reqMoney: Yup.string().required('কর্জে হাসনার আবেদনের পরিমান is required'),
    paymentDeadline: Yup.date().required('পরিশোধের সময়কাল is required'),
  });

  const handleSubmit = async (values, {resetForm, setSubmitting}) => {
    if (!values.memberID || !values.name || !values.reqMoney) {
      setSnackbarMessage('ফর্ম পূরণ করুন');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    const addedStatusValues = {
      ...values,
      status: 'pending',
    };
    try {
      await axios.post(
        process.env.REACT_APP_BASE_URL + '/loan',
        addedStatusValues,
      );
      setSnackbarMessage('সফলভাবে তৈরী হয়েছে');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      resetForm();
    } catch (error) {
      console.error('Failed to create member');
      console.error('Error:', error.message);
      setSnackbarMessage('ব্যর্থ হয়েছে');
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
            Korze Hasna Request Form
          </Typography>

          <Formik
            enableReinitialize
            validationSchema={validationSchema}
            initialValues={{
              date: new Date().toISOString().split('T')[0],
              name: memberSearch.length > 0 ? memberSearch[0].name : '',
              memberID: memberid,
              rentaltype: '',
              paymentDeadline: '',
              reqMoney: '',
            }}
            onSubmit={handleSubmit}
          >
            {({values, errors, setFieldValue, isSubmitting}) => (
              <Form>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <DatePicker
                      label='আবেদনের তারিখ'
                      name='date'
                      inputFormat='dd/MM/yyyy'
                      value={values.date}
                      onChange={(value) => setFieldValue('date', value)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!errors.date}
                          helperText={<ErrorMessage name='date' />}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        label='সদস্য নম্বর'
                        name='memberID'
                        fullWidth
                        error={!!errors.memberID}
                        helperText={<ErrorMessage name='memberID' />}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => {
                          setFieldValue('memberID', e.target.value); // Add this line to update the form's value
                          searchMemberbyID(e.target.value);
                          setMemberId(e.target.value);
                        }}
                      />
                    </Grid>
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
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      label='কর্জে হাসনার আবেদনের পরিমান (টাকা)'
                      name='reqMoney'
                      fullWidth
                      error={!!errors.reqMoney}
                      helperText={<ErrorMessage name='reqMoney' />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <DatePicker
                      label='পরিশোধের সময়কাল'
                      name='paymentDeadline'
                      inputFormat='dd/MM/yyyy'
                      value={values.paymentDeadline}
                      onChange={(value) =>
                        setFieldValue('paymentDeadline', value)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!errors.paymentDeadline}
                          helperText={<ErrorMessage name='paymentDeadline' />}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type='submit'
                      variant='contained'
                      color='primary'
                      disabled={isSubmitting}
                    >
                      জমা দিন
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
