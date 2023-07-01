import React, {useState} from 'react';
// import {Formik, Form, Field, ErrorMessage} from 'formik';
// import * as Yup from 'yup';
import {
  TextField,
  // Button,
  Grid,
  Paper,
  Typography,
  Snackbar,
} from '@mui/material';
import {Alert} from '@mui/material';

// const axios = require('axios');

// const validationSchema = Yup.object().shape({
//   rentaltypeadd: Yup.string().required('Rent Type is required'),
// });

const ReceiveVoucher = () => {
  // const handleSubmit = async (values, {resetForm, setSubmitting}) => {
  //   try {
  //     const response = await axios.post(
  //       process.env.REACT_APP_BASE_URL + '/rental',
  //       values,
  //     );

  //     console.log('Rental created successfully');
  //     console.log('Response:', response.data);
  //     setSnackbarMessage('সফলভাবে তৈরী হয়েছে ');
  //     setSnackbarSeverity('success');
  //     setSnackbarOpen(true);
  //     resetForm();
  //   } catch (error) {
  //     console.error('Failed to create rental');
  //     console.error('Error:', error.message);
  //     setSnackbarMessage('ব্যর্থ হয়েছে ');
  //     setSnackbarSeverity('error');
  //     setSnackbarOpen(true);
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage] = useState('');
  const [snackbarSeverity] = useState('');

  return (
    <Grid container justifyContent='center'>
      <Grid item xs={12} sm={8} md={6}>
        <Paper elevation={3} sx={{p: 4}}>
          <Typography sx={{textAlign: 'center'}} variant='h2' mb={4}>
            আনসারুল মুসলিমীন বহুমূখী সমবায় সমিতি লি: <br />
            ANSARUL MUSLIMIN BAHUMUKHI SAMABAY SAMITY LTD.
          </Typography>
          <Typography sx={{textAlign: 'center'}} mb={4}>
            ১-জি, ১/১, চিড়িয়াখানা রোড, মিরপুর-১, ঢাকা-১২১৬ <br />
            গভ: রেজি: নং-১২৮/৯৮
            <br />
            ফোন-৮০২১৬৩৬
          </Typography>
          <Typography
            sx={{
              textAlign: 'center',
              backgroundColor: 'black',
              color: 'white',
              borderRadius: '10px',
              // width:'100px'
            }}
            mb={5}
          >
            টাকা আদায়ের রসিদ
          </Typography>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Typography>রসিদ নং - 46838</Typography>
            <TextField id='name' label='তারিখ ' variant='standard' />
          </div>
          <div style={{display: 'flex'}}>
            {/* <Typography sx={{marginTop:'20px'}}>Name:</Typography> */}
            <TextField
              id='name'
              label='নাম '
              variant='standard'
              sx={{margin: '5px'}}
            />
          </div>
          <div style={{display: 'flex'}}>
            {/* <Typography sx={{marginTop:'20px'}}>Name:</Typography> */}
            <TextField
              id='name'
              label='সদস্য নং '
              variant='standard'
              sx={{margin: '5px'}}
            />
            <TextField
              id='name'
              label='কিস্তি/মাস'
              variant='standard'
              sx={{margin: '5px'}}
            />
          </div>
          <div style={{display: 'flex'}}>
            {/* <Typography sx={{marginTop:'20px'}}>Name:</Typography> */}
            <TextField
              id='name'
              label='ঠিকানা '
              variant='standard'
              sx={{margin: '5px'}}
            />
          </div>
          <Grid container spacing={2} mb={4} mt={4} sx={{textAlign: 'center'}}>
            <Grid item xs={2}>
              <Typography
                variant='h3'
                component='h2'
                sx={{backgroundColor: 'black', color: 'white'}}
              >
                ক্র: নং:
              </Typography>
              <TextField defaultValue='1' />
              <TextField defaultValue='2' />
              <TextField defaultValue='3' />
              <TextField defaultValue='4' />
              <TextField defaultValue='5' />
              <TextField defaultValue='6' />
              <TextField defaultValue='7' />
              <TextField defaultValue='8' />
              <TextField defaultValue='9' />
              <TextField defaultValue='10' />
              <TextField defaultValue='11' />
              <TextField defaultValue='12' />
              <TextField defaultValue='13' />
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant='h3'
                component='h2'
                sx={{backgroundColor: 'black', color: 'white'}}
              >
                বিবরণ
              </Typography>
              <TextField defaultValue='আমানত চলতি/বকেয়া ' />
              <TextField defaultValue='ব্যবস্থাপনা ফী' />
              <TextField defaultValue='কল্যাণ তহবিল ' />
              <TextField defaultValue='এককালীন  ' />
              <TextField defaultValue='প্রকল্প কিস্তি ' />
              <TextField defaultValue='সদস্য হস্তান্তর ফী / প্রত্যাহার ফী ' />
              <TextField defaultValue='ভর্তি ফী' />
              <TextField defaultValue='পাশ বহি ফী ' />
              <TextField defaultValue='শেয়ার ' />
              <TextField defaultValue='সাধারণ সভা ফী ' />
              <TextField defaultValue='ফরম ফী  ' />
              <TextField defaultValue='রাজস্ব টিকেট ' />
              <TextField defaultValue='বিবিধ ' />
              <TextField defaultValue='========Total Amount======= ' />

            </Grid>
            <Grid item xs={4}>
              <Typography
                variant='h3'
                component='h2'
                sx={{backgroundColor: 'black', color: 'white'}}
              >
                টাকা
              </Typography>
              <TextField defaultValue='' />
              <TextField defaultValue='' />
              <TextField defaultValue='' />
              <TextField defaultValue='' />
              <TextField defaultValue='' />
              <TextField defaultValue='' />
              <TextField defaultValue='' />
              <TextField defaultValue='' />
              <TextField defaultValue='' />
              <TextField defaultValue='' />
              <TextField defaultValue='' />
              <TextField defaultValue='' />
              <TextField defaultValue='' />
              <TextField defaultValue='' />
            </Grid>
          </Grid>
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

export default ReceiveVoucher;
