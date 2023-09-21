import React, {useState, useEffect} from 'react';
import {
  TextField,
  Grid,
  Paper,
  Typography,
  Snackbar,
  Button,
} from '@mui/material';
import {Alert} from '@mui/material';
import axios from 'axios';
const moment = require('moment');
import Autocomplete from '@mui/material/Autocomplete';

const PaymentVoucher = () => {
  const [rows, setRows] = useState([{number: 1, description: '', amount: ''}]);
  const [total_amount, setTotalAmount] = useState(0);
  const [voucherNo, setVoucherno] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('');
  const [voucher_title, setNameVoucher_title] = useState('');
  const [date, setDate] = useState('');
  const [voucher_details, setLargeParagraph] = useState('');

  const calculateTotalAmount = () => {
    const sum = rows.reduce((total, row) => {
      return total + parseFloat(row.amount || 0);
    }, 0);
    setTotalAmount(sum);
  };
  // const isLastRowDescriptionSelected = () => {
  //   const lastRowIndex = rows.length - 1;
  //   const lastRow = rows[lastRowIndex];
  //   return !!lastRow.description;
  // };

  const handleAddRow = () => {
    // if (!isLastRowDescriptionSelected()) {
    //   setSnackbarMessage('সর্বশেষ সারির জন্য একটি বিবরণ নির্বাচন করুন');
    //   setSnackbarSeverity('warning');
    //   setSnackbarOpen(true);
    //   return;
    // }

    const nextNumber = rows.length + 1;
    setRows([...rows, {number: nextNumber, description: '', amount: ''}]);
  };

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
    calculateTotalAmount();
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const generateNo = () => {
    const timestamp = moment().format('YYMMDDHHmmss');
    const voucherNumber = `V${timestamp}`;
    setVoucherno(voucherNumber);
  };

  const handleSubmit = async () => {
    if (
      !date ||
      !voucher_title ||
      !voucherNo ||
      !voucher_details ||
      total_amount === 0 ||
      rows.some((row) => !row.description || !row.amount)
    ) {
      setSnackbarMessage('সমস্ত তথ্য পূরণ করুন');
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
      return;
    }

    try {
      const dataToSend = {
        date,
        voucher_title,
        voucherNo,
        voucher_details,
        total_amount,
        myArrayField: rows.map((row) => ({
          number: row.number,
          description: row.description,
          amount: row.amount,
        })),
      };

      // Send a POST request to your API endpoint using axios
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/expense`,
        dataToSend,
      );

      // Handle the response
      console.log('Response:', response.data);
      setSnackbarMessage('সফলভাবে তৈরী হয়েছে');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Failed to submit');
      console.error('Error:', error.message);
      setSnackbarMessage('ব্যর্থ হয়েছে');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    generateNo();
  }, []);

  const possibleDescriptions = ['কল্যাণ তহবিল সাহায্য'];

  return (
    <Grid container justifyContent='center'>
      <Grid item xs={12} sm={8} md={6}>
        <Paper elevation={3} sx={{p: 4}}>
          <hr style={{marginTop: '20px'}} />
          <Typography
            sx={{textAlign: 'center', margin: '10px'}}
            variant='h2'
            mb={4}
          >
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
            }}
            mb={5}
          >
            ভাউচার
          </Typography>
          <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <Typography>ভাউচার নং - {voucherNo}</Typography>
            <TextField
              // label='Date'
              type='date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div>
            <div style={{margin: '10px', textAlign: 'center'}}>
              <TextField
                label='ভাউচার টাইটেল'
                value={voucher_title}
                onChange={(e) => setNameVoucher_title(e.target.value)}
              />
            </div>
          </div>

          <TextField
            label='ভাউচার বিবরণ'
            multiline
            rows={6}
            value={voucher_details}
            onChange={(e) => setLargeParagraph(e.target.value)}
            fullWidth
          />

          <Grid container spacing={2} mb={4} mt={4} sx={{textAlign: 'center'}}>
            <Grid item xs={2}>
              <Typography
                variant='h3'
                component='h2'
                sx={{backgroundColor: 'black', color: 'white'}}
              >
                ক্র: নং:
              </Typography>
              {rows.map((row, index) => (
                <TextField key={index} value={row.number} disabled />
              ))}
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant='h3'
                component='h3'
                sx={{backgroundColor: 'black', color: 'white'}}
              >
                বিবরণ
              </Typography>
              {rows.map((row, index) => (
                <Autocomplete
                  key={index}
                  value={row.description}
                  onChange={(_, newValue) =>
                    handleRowChange(index, 'description', newValue)
                  }
                  options={possibleDescriptions}
                  freeSolo // Allow users to input values not in the options list
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='বিবরণ'
                      fullWidth
                      multiline
                      variant='outlined'
                      sx={{
                        marginBottom: '5px',
                        '& input::placeholder': {
                          fontSize: '12px',
                        },
                      }}
                    />
                  )}
                />
              ))}
            </Grid>

            <Grid item xs={4}>
              <Typography
                variant='h3'
                component='h2'
                sx={{backgroundColor: 'black', color: 'white'}}
              >
                টাকার পরিমাণ
              </Typography>
              {rows.map((row, index) => (
                <TextField
                  key={index}
                  value={row.amount}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    const validInput = inputValue.replace(/[^0-9.]/g, '');
                    handleRowChange(index, 'amount', validInput);
                  }}
                  type='text'
                  inputProps={{min: 0}}
                />
              ))}
            </Grid>
          </Grid>
          <div style={{textAlign: 'right', margin: '20px'}}>
            <Typography>মোট টাকার পরিমাণ: {total_amount}</Typography>
          </div>
          <hr />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '20px',
            }}
          >
            <Button variant='outlined' onClick={handleAddRow}>
              সারি অ্যাড করুন
            </Button>
            <br />
            <Button
              variant='outlined'
              onClick={handleSubmit}
              sx={{marginTop: '20px'}}
            >
              সংরক্ষণ করুন
            </Button>
          </div>

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
          >
            <Alert
              onClose={handleSnackbarClose}
              severity={snackbarSeverity}
              sx={{width: '100%'}}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PaymentVoucher;
