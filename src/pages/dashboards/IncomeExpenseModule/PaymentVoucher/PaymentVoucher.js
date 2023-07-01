import React, {useState} from 'react';
import {
  TextField,
  Grid,
  Paper,
  Typography,
  Snackbar,
  Button,
} from '@mui/material';
import {Alert} from '@mui/material';

const PaymentVoucher = () => {
  const [rows, setRows] = useState([
    {number: '1', description: '', amount: ''},
  ]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('');

  const calculateTotalAmount = () => {
    const sum = rows.reduce((total, row) => {
      return total + parseFloat(row.amount || 0);
    }, 0);
    setTotalAmount(sum);
  };

  const handleAddRow = () => {
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

  const handleSubmit = async () => {
    // Your submit logic here
    try {
      // Submit the rows data using axios or other methods
      console.log('Rows:', rows);
      setSnackbarMessage('সফলভাবে তৈরী হয়েছে ');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Failed to submit');
      console.error('Error:', error.message);
      setSnackbarMessage('ব্যর্থ হয়েছে ');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  // Dropdown options for "বিবরণ"
  const descriptionOptions = ['Option 1', 'Option 2', 'Option 3'];

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
            }}
            mb={5}
          >
            টাকা প্রদানের রসিদ
          </Typography>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Typography>রসিদ নং - 46838</Typography>
            <TextField id='date' label='তারিখ' type='date' />
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
              {rows.map((row, index) => (
                <TextField key={index} value={row.number} disabled />
              ))}
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant='h3'
                component='h2'
                sx={{backgroundColor: 'black', color: 'white'}}
              >
                বিবরণ
              </Typography>
              {rows.map((row, index) => (
                <select
                  key={index}
                  value={row.description}
                  onChange={(e) =>
                    handleRowChange(index, 'description', e.target.value)
                  }
                  style={{width: '100%', height: '50px', marginBottom: '5px'}}
                >
                  <option value=''>বিবরণ নির্বাচন করুন</option>
                  {descriptionOptions.map((option, optionIndex) => (
                    <option key={optionIndex} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
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
                  onChange={(e) =>
                    handleRowChange(index, 'amount', e.target.value)
                  }
                  type='number'
                  inputProps={{min: 0}}
                />
              ))}
            </Grid>
          </Grid>
          <Button variant='contained' onClick={handleAddRow}>
            যোগ করুন
          </Button>
          <div style={{textAlign: 'right', marginTop: '20px'}}>
            <Typography>মোট টাকার পরিমাণ: {totalAmount}</Typography>
          </div>
          <Button
            variant='contained'
            onClick={handleSubmit}
            sx={{marginTop: '20px'}}
          >
            সংরক্ষণ করুন
          </Button>
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
