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
// import Autocomplete from '@mui/material/Autocomplete';
import html2pdf from 'html2pdf.js';
import {useParams} from 'react-router-dom';

const PaymentVoucher = () => {
  const [rows] = useState([{number: 1, description: '', amount: ''}]);
  const [total_amount] = useState(0);
  const [voucherNo, setVoucherno] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('');
  const [voucher_title, setNameVoucher_title] = useState('');
  // const [date, setDate] = useState('');
  const [voucher_details, setLargeParagraph] = useState('');
  const [voucher, setMemberVoucherSearch] = useState([]);

  console.log(voucher[0]?.voucher_title, 'voucher');
  const {id} = useParams();

  // const calculateTotalAmount = () => {
  //   const sum = rows.reduce((total, row) => {
  //     return total + parseFloat(row.amount || 0);
  //   }, 0);
  //   setTotalAmount(sum);
  // };

  const searchMemberbyVowID = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/expense?query=${id}&page=1&perPage=10`,
      );
      setMemberVoucherSearch(response.data?.allExpense);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const generateNo = () => {
    const timestamp = moment().format('YYMMDDHHmmss');
    const voucherNumber = `V${timestamp}`;
    setVoucherno(voucherNumber);
  };

  // const handleRowChange = (index, field, value) => {
  //   const updatedRows = [...rows];
  //   const isOptionSelected = possibleDescriptions.includes(value);

  //   if (isOptionSelected) {
  //     updatedRows[index][field] = value;
  //   } else {
  //     updatedRows[index][field] = value;
  //   }

  //   setRows(updatedRows);
  //   calculateTotalAmount();
  // };
  // Other code...

  const handlePrint = async () => {
    try {
      const dataToSend = {
        date: voucher[0]?.date,
        voucher_title,
        voucherNo,
        voucher_details,
        total_amount,
        myArrayField: voucher.map((row) => ({
          number: row?.number,
          description: row?.description,
          amount: row.amount,
        })),
      };

      // Generate table rows from the 'voucher' array
      // Generate table rows from the 'voucher' array
      // Generate table rows from the 'voucher' array
      const tableRows = voucher
        ?.map(
          (item) => `
  <tr>
    <td>${item.number}</td>
    <td>${item.description}</td> 
    <td>${item.amount}</td>
  </tr>
`,
        )
        .join('');

      const staticContent = `
        <div>
          <body>
            <div style="position: relative;">

              <h4 style="text-align: center; margin: 10px;">
                আনসারুল মুসলিমীন বহুমূখী সমবায় সমিতি লি:
              </h4>

              <h4 style="text-align: center; margin: 10px;">
                ANSARUL MUSLIMIN BAHUMUKHI SAMABAY SAMITY LTD.
              </h4>
              
              <h6 style="margin-bottom: 4px; text-align: center; margin: 10px;">
                ১-জি, ১/১, চিড়িয়াখানা রোড, মিরপুর-১, ঢাকা-১২১৬ <br />
                গভ: রেজি: নং-১২৮/৯৮
                <br />
                ফোন-৮০২১৬৩৬
              </h6>
              
              <hr/>
              <div style="text-align: center; margin: 10px";><p>ভাউচার</p></div>
              
              <div style="display: flex; justify-content: space-between;">
                <div>
                  <p>ভাউচার নং : ${id}</p>
                  <p>তারিখ : ${voucher?.[0]?.date}</p>
                </div>
              </div>

              <div style='text-align: center; margin-top:15px;'>
                <p>ভাউচার টাইটেল : ${voucher?.[0]?.voucher_title}</p>
                <p>বিস্তারিত : ${voucher?.[0]?.voucher_details}</p>
              </div>
              
              <table border="1" style="margin: 10px auto; text-align: center; width: 100%;">
                <thead>
                  <tr>
                    <th style="border: 1px solid #000; padding: 5px;">ক্র: নং:</th>
                    <th style="border: 1px solid #000; padding: 5px;">বিবরণ</th>
                    <th style="border: 1px solid #000; padding: 5px;">টাকার পরিমাণ</th>
                  </tr>
                </thead>
                <tbody id="dynamicTableBody">
                  ${tableRows}
                </tbody>
              </table>
              <p style='float:right'>মোট টাকার পরিমাণ : ${dataToSend.total_amount}</p>
            </div>
            <div style='padding-top: 120px;'>
              <div style="display: flex; justify-content: space-between; margin:10px;">
                <p>আদায়কারী </p>
                <p> হিসাবরক্ষক  </p> 
                <p> কোষাধক্ষ</p>
                <p> সম্পাদক</p>
              </div>
              <hr/>
              <p style='text-align: center; font-weight: 2;'>This roshid is generated by ANSARUL ERP SERVER</p>
              <p style='text-align: center; font-weight: 2;'>Powered by: TechWave Limited</p>
            </div>
          </body>
        </div>
      `;

      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = staticContent;

      document.body.appendChild(tempDiv);

      await html2pdf(tempDiv, {
        margin: 10,
        filename: voucherNo,
        image: {type: 'jpeg', quality: 0.98},
        html2canvas: {scale: 2},
        jsPDF: {
          unit: 'mm',
          format: 'a5',
          orientation: 'portrait',
          width: 105,
          height: 74,
        },
      });

      document.body.removeChild(tempDiv);

      setSnackbarMessage('সফলভাবে প্রিন্ট হয়েছে');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Failed to print');
      console.error('Error:', error.message);
      setSnackbarMessage('ব্যর্থ হয়েছে');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    generateNo();
    searchMemberbyVowID();
  }, []);

  // const possibleDescriptions = ['কল্যাণ তহবিল সাহায্য'];

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
            <Typography>ভাউচার নং - {id}</Typography>
            <TextField
              // label='Date'
              type='date'
              value={voucher[0]?.date}
              // onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div style={{margin: '10px', textAlign: 'center'}}>
            <TextField
              // label='ভাউচার টাইটেল'
              defaultValue={voucher[0]?.voucher_title}
              value={voucher[0]?.voucher_title}
              onChange={(e) => setNameVoucher_title(e.target.value)}
            />
          </div>

          <TextField
            // label='ভাউচার বিবরণ'
            multiline
            rows={6}
            // value={voucher_details}
            onChange={(e) => setLargeParagraph(e.target.value)}
            fullWidth
            defaultValue={voucher[0]?.voucher_details}
            value={voucher[0]?.voucher_details}
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
                <TextField key={index} value={row.description} disabled />
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
                <TextField key={index} value={row.amount} disabled />
              ))}
            </Grid>
          </Grid>
          <div style={{textAlign: 'right', margin: '20px'}}>
            <Typography>
              মোট টাকার পরিমাণ: {voucher[0]?.total_amount}
            </Typography>
          </div>
          <hr />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '20px',
            }}
          >
            <Button
              variant='outlined'
              onClick={handlePrint}
              sx={{marginTop: '20px'}}
            >
              প্রিন্ট করুন
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
