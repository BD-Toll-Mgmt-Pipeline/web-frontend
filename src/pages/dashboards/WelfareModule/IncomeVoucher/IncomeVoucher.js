import React, {useState, useEffect} from 'react';
import {
  TextField,
  Grid,
  Paper,
  Typography,
  Snackbar,
  Button,
  Alert,
} from '@mui/material';
import {Link as RouterLink} from 'react-router-dom';
import axios from 'axios';
import FromDate from '../FromDate/FromDate';
import ToDate from '../FromDate/ToDate';
const moment = require('moment');
import PDFGenerator from './PDFGenerator';
import {BlobProvider} from '@react-pdf/renderer';
import {MdCreate} from 'react-icons/md';
// import { useReactToPrint } from 'react-to-print';

const IncomeVoucher = () => {
  const [rows, setRows] = useState([{number: 1, description: '', amount: ''}]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [roshidNo, setRoshidNo] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [voterId, setVoterId] = useState('');
  const [memberId, setMemberId] = useState('');
  const [currentAddress, setCurrentAddress] = useState('');
  const [date, setDate] = useState('');
  const [memberSearch, setMemberSearch] = useState('');
  const [incomeTypes, setIncomeTypes] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedToMonth, setToMonth] = useState('');
  const [selectedToYear, setToYear] = useState('');
  const [showWarning, setShowWarning] = useState(false);

  const [showPDF, setShowPDF] = useState(false);
  const [voucherData] = useState({name: 'John Doe'});

  const handleGeneratePDF = async () => {
    try {
      // Render the PDFGenerator component to generate the PDF content
      const pdfContent = <PDFGenerator voucherData={voucherData} />;

      // Convert the PDF content to a string
      const pdfString = pdfContent.toString();

      // Create a Blob from the PDF content
      const pdfBlob = new Blob([pdfString], {type: 'application/pdf'});

      // Create a blob URL from the PDF blob
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Open the PDF in a new window
      window.open(pdfUrl, '_blank');
    } catch (error) {
      console.error('Error generating or opening PDF:', error);
    }
  };

  const getIncomeTypes = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/income-expense/income-types`,
    );
    console.log(response.data.data, 'responseresponseresponse');
    setIncomeTypes(response.data.data);
  };

  const isInvalidDateRange = () => {
    if (
      !selectedMonth ||
      !selectedYear ||
      !selectedToMonth ||
      !selectedToYear
    ) {
      return false;
    }

    const startDate = new Date(`${selectedYear}-${selectedMonth}-01`);
    const endDate = new Date(`${selectedToYear}-${selectedToMonth}-01`);

    return startDate >= endDate;
  };

  const searchMemberbyID = async (memberid) => {
    try {
      const query = memberid;
      const page = 1;
      const perPage = 10;

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/members/findMember-exact-match`,
        {
          params: {
            query,
            page,
            perPage,
          },
        },
      );
      setMemberSearch(response.data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const calculateTotalAmount = () => {
    const sum = rows.reduce((total, row) => {
      return total + parseFloat(row.amount || 0);
    }, 0);
    setTotalAmount(sum);
  };

  const isLastRowDescriptionSelected = () => {
    const lastRowIndex = rows.length - 1;
    const lastRow = rows[lastRowIndex];
    return !!lastRow.description;
  };

  const handleAddRow = () => {
    if (!isLastRowDescriptionSelected()) {
      setSnackbarMessage('সর্বশেষ সারির জন্য একটি বিবরণ নির্বাচন করুন');
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
      return;
    }

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
    if (
      !selectedMonth ||
      !selectedYear ||
      !selectedToMonth ||
      !selectedToYear ||
      !date ||
      !memberId ||
      rows.some((row) => !row.description || !row.amount)
    ) {
      setSnackbarMessage('সমস্ত তথ্য পূরণ করুন');
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
      return;
    }

    if (isInvalidDateRange()) {
      setShowWarning(true);
      return;
    }

    try {
      const dataToSend = {
        date,
        name,
        memberId,
        currentAddress,
        myArrayField: rows.map((row) => ({
          number: row.number,
          description: row.description,
          amount: row.amount,
        })),
        phone,
        voterId,
        total_amount: totalAmount,
        roshidNo: roshidNo,
        payment_start_month: selectedMonth,
        payment_start_year: selectedYear,
        payment_end_month: selectedToMonth,
        payment_end_year: selectedToYear,
      };

      // Send a POST request to your API endpoint using axios
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/income-expense`,
        dataToSend,
      );

      // Handle the response
      console.log('Response:', response.data);
      setSnackbarMessage('সফলভাবে তৈরী হয়েছে');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      // Reset the form after successful submission
      setRows([{number: 1, description: '', amount: ''}]);
      setTotalAmount(0);
      setRoshidNo(0);
      setName('');
      setPhone('');
      setVoterId('');
      setMemberId('');
      setCurrentAddress('');
      setDate('');
      setSelectedMonth('');
      setSelectedYear('');
      setToMonth('');
      setToYear('');
      setShowWarning(false);
    } catch (error) {
      console.error('Failed to submit');
      console.error('Error:', error.message);
      setSnackbarMessage('ব্যর্থ হয়েছে');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const generateNo = () => {
    const timestamp = moment().format('YYMMDDHHmmss');
    const voucherNumber = `R${timestamp}`;
    setRoshidNo(voucherNumber);
  };

  useEffect(() => {
    getIncomeTypes();
    if (memberSearch?.members) {
      setName(memberSearch?.members[0]?.name);
      setPhone(memberSearch?.members[0]?.phone);
      setCurrentAddress(memberSearch?.members[0]?.permanentAddress);
      setVoterId(memberSearch?.members[0]?.voterId);
    }
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // Get date in 'YYYY-MM-DD' format
    setDate(formattedDate);
  }, [memberSearch]);

  useEffect(() => {
    generateNo();
  }, []);

  return (
    <Grid container justifyContent='center'>
      <Grid item xs={12} sm={8} md={6}>
        <button onClick={handleGeneratePDF}>Generate PDF</button>

        {/* Conditionally render the PDF generator */}
        {showPDF && (
          // Inside the return statement of the IncomeVoucher component
          <BlobProvider document={<PDFGenerator voucherData={voucherData} />}>
            {({blob}) => {
              if (blob) {
                const pdfUrl = URL.createObjectURL(blob);
                window.open(pdfUrl, '_blank');
                setShowPDF(false); // Close the PDF viewer after opening
              }
              return null;
            }}
          </BlobProvider>
        )}
        <Paper elevation={3} sx={{p: 4}}>
          <RouterLink
            to={`/dashboards/income-expense-module/add-new-income-type`}
            style={{textDecoration: 'none'}}
            underline='none'
          >
            <Button
              variant='outlined'
              color='primary'
              target='_blank'
              sx={{margin: '10px'}}
            >
              <MdCreate style={{margin: '5px'}} />
              নতুন বিবরণ যোগ করুন
            </Button>
          </RouterLink>
          <hr />
          <Typography
            sx={{textAlign: 'center', margin: '10px'}}
            variant='h2'
            mb={4}
          >
            আনসারুল মুসলিমীন বহুমূখী সমবায় সমিতি লি: <br />
            Toll MUSLIMIN BAHUMUKHI SAMABAY SAMITY LTD.
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
            রসিদ
          </Typography>
          <Typography>রসিদ নং - {roshidNo}</Typography>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div style={{margin: '10px'}}>
              <TextField
                label='নাম'
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{margin: '10px'}}
              />
              <TextField
                label='সদস্য আইডি'
                value={memberId}
                onChange={(e) => {
                  setMemberId(e.target.value);
                  searchMemberbyID(e.target.value);
                }}
                sx={{margin: '10px'}}
              />
            </div>
            <div style={{margin: '10px'}}>
              <TextField
                label='সংক্ষিপ্ত ঠিকানা'
                value={currentAddress}
                onChange={(e) => setCurrentAddress(e.target.value)}
                sx={{margin: '10px'}}
              />
              <TextField
                // label='Date'
                type='date'
                value={date}
                onChange={(e) => setDate(e.target.value)}
                sx={{margin: '10px'}}
              />
            </div>
          </div>
          <div style={{marginLeft: '10px', display: 'flex'}}>
            <TextField
              label='ফোন'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              sx={{margin: '10px'}}
            />
            <TextField
              label='জাতীয় পরিচয়পত্র নম্বর (NID)আইডি'
              value={voterId}
              onChange={(e) => setVoterId(e.target.value)}
              sx={{margin: '10px'}}
            />
          </div>
          <hr style={{margin: '10px'}} />
          <Typography>মাস হইতে</Typography>
          <br />
          <FromDate
            setSelectedMonth={setSelectedMonth}
            setSelectedYear={setSelectedYear}
          />
          <br />
          <Typography>মাস পর্যন্ত</Typography>
          <br />
          <ToDate setToYear={setToYear} setToMonth={setToMonth} />
          <hr style={{margin: '10px'}} />
          <Grid
            container
            spacing={2}
            mb={4}
            mt={4}
            sx={{textAlign: 'center', padding: '10px'}}
          >
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
                  {incomeTypes.map((option, optionIndex) => (
                    <option key={optionIndex} label={option.label}>
                      {option.label}
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
          <div style={{textAlign: 'right', margin: '20px'}}>
            <Typography>মোট টাকার: {totalAmount}</Typography>
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
            open={showWarning}
            autoHideDuration={6000}
            onClose={() => setShowWarning(false)}
          >
            <Alert onClose={() => setShowWarning(false)} severity='error'>
              মাস হইতে এবং মাস পর্যন্ত সঠিক তারিখ নির্বাচন করুন।
            </Alert>
          </Snackbar>

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

export default IncomeVoucher;
