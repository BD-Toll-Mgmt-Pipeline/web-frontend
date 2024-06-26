import React, {useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {TextField, Button, Grid, Paper, Typography} from '@mui/material';
const axios = require('axios');
import Snack from 'pages/common/SuccessSnackbar';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  memberId: Yup.string().required('Member Number is required'),
  date_of_birth: Yup.string().required('Date Number is required'),
  fatherName: Yup.string().required("Father's Name is required"),
  motherName: Yup.string().required("Mother's Name is required"),
  permanentAddress: Yup.string().required('Permanent Address is required'),
  // currentAddress: Yup.string().required('Present Address is required'),
  // age: Yup.number().required('Age is required'),
  // education: Yup.string().required('Education qualification is required'),
  // voterId: Yup.string().required('Voter ID is required'),
  phone: Yup.string().required('Mobile Number is required'),
  // guardianName: Yup.string().required('Guardian Name is required'),
  // relationship: Yup.string().required('Relationship with Guardian is required'),
  // nomineeName: Yup.string().required('Nominee Name is required'),
  // nomineeAddress: Yup.string().required('Nominee Address is required'),
  // identificationMemberName: Yup.string().required(
  //   'Identifying Member Name is required',
  // ),
  // identificationMemberAddress: Yup.string().required(
  //   'Identifying Member Address is required',
  // ),
});

const NewMemberAdd = () => {
  const handleSubmit = async (values, {resetForm, setSubmitting}) => {
    const UpdatedValue = {
      ...values,
      activeStatus: true,
    };
    try {
      await axios.post(
        process.env.REACT_APP_BASE_URL + '/members',
        UpdatedValue,
      );
      setseverity('success');
      setIsSuccessSnackbarOpen(true);
      setSuccessMessage('সফল সদস্য তৈরী হয়েছে');
      resetForm();
    } catch (error) {
      setseverity('error');
      setIsSuccessSnackbarOpen(true);
      setSuccessMessage('ব্যর্থ হয়েছে');
    } finally {
      setSubmitting(false);
    }
  };

  const [isopen, setIsSuccessSnackbarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [severity, setseverity] = useState('');

  return (
    <Grid container justifyContent='center'>
      <Grid item xs={12} sm={8} md={6}>
        <Paper elevation={3} sx={{p: 4}}>
          <Typography variant='h5' mb={4}>
            Add Member Form
          </Typography>
          <Formik
            initialValues={{
              name: '',
              date_of_birth: '',
              memberId: '',
              fatherName: '',
              motherName: '',
              permanentAddress: '',
              currentAddress: '',
              age: '',
              education: '',
              voterId: '',
              phone: '',
              guardianName: '',
              relationship: '',
              nomineeName: '',
              nomineeAddress: '',
              identificationMemberName: '',
              identificationMemberAddress: '',
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
                      label='জন্মসাল'
                      name='date_of_birth'
                      type='date'
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      error={!!errors.date_of_birth}
                      helperText={<ErrorMessage name='date_of_birth' />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      label='সদস্য নাম্বারঃ'
                      name='memberId'
                      fullWidth
                      error={!!errors.memberId}
                      helperText={<ErrorMessage name='memberId' />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      label='পিতার নামঃ'
                      name='fatherName'
                      fullWidth
                      error={!!errors.fatherName}
                      helperText={<ErrorMessage name='fatherName' />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      label='মাতার নামঃ'
                      name='motherName'
                      fullWidth
                      error={!!errors.motherName}
                      helperText={<ErrorMessage name='motherName' />}
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
                      label='বয়স'
                      name='age'
                      fullWidth
                      error={!!errors.age}
                      helperText={<ErrorMessage name='age' />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      label='শিক্ষাগত যোগ্যতাঃ'
                      name='education'
                      fullWidth
                      error={!!errors.education}
                      helperText={<ErrorMessage name='education' />}
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
                      label='অভিভাবক নামঃ'
                      name='guardianName'
                      fullWidth
                      error={!!errors.guardianName}
                      helperText={<ErrorMessage name='guardianName' />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      label='সম্পর্কঃ'
                      name='relationship'
                      fullWidth
                      error={!!errors.relationship}
                      helperText={<ErrorMessage name='relationship' />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      label='নমিনির নামঃ'
                      name='nomineeName'
                      fullWidth
                      error={!!errors.nomineeName}
                      helperText={<ErrorMessage name='nomineeName' />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      label='ঠিকানাঃ'
                      name='nomineeAddress'
                      fullWidth
                      error={!!errors.nomineeAddress}
                      helperText={<ErrorMessage name='nomineeAddress' />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      label='সনাক্তকারি সদস্যর নামঃ'
                      name='identificationMemberName'
                      fullWidth
                      error={!!errors.identificationMemberName}
                      helperText={
                        <ErrorMessage name='identificationMemberName' />
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      label='সনাক্তকারি সদস্য নাম্বারঃ'
                      name='identificationMemberAddress'
                      fullWidth
                      error={!!errors.identificationMemberAddress}
                      helperText={
                        <ErrorMessage name='identificationMemberAddress' />
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
      <Snack
        open={isopen}
        message={successMessage}
        onClose={() => setSuccessMessage(null)}
        severity={severity}
      />
    </Grid>
  );
};

export default NewMemberAdd;
