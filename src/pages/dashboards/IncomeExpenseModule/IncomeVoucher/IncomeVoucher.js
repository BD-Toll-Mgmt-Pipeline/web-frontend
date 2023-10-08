import React, {useState, useEffect} from 'react';
import {
  TextField,
  Grid,
  Paper,
  Typography,
  Snackbar,
  Button,
  Alert,
  Modal,
} from '@mui/material';
import axios from 'axios';
import FromDate from '../FromDate/FromDate';
import ToDate from '../FromDate/ToDate';
const moment = require('moment');
import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';

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
  const [voucherData, setVoucherData] = useState(null);

  const getIncomeTypes = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/income-expense/income-types`,
    );
    console.log(response.data.data, 'responseresponseresponse');
    setIncomeTypes(response.data.data);
  };

  const [openModalIndex, setOpenModalIndex] = useState(null);
  const [isVoucherReady, setIsVoucherReady] = useState(true);

  const handleOpenModal = (index) => {
    setOpenModalIndex(index);
  };

  const handleCloseModal = () => {
    setOpenModalIndex(null);
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
        `${process.env.REACT_APP_BASE_URL}/members/findMember`,
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

  const generatePDFContent = async (pdfinfo, data) => {
    const bengaliMonths = [
      'জানুয়ারি',
      'ফেব্রুয়ারি',
      'মার্চ',
      'এপ্রিল',
      'মে',
      'জুন',
      'জুলাই',
      'আগস্ট',
      'সেপ্টেম্বর',
      'অক্টোবর',
      'নভেম্বর',
      'ডিসেম্বর',
    ];

    // Convert the data object to a string
    const dataString = JSON.stringify(data);
    const dataObject = JSON.parse(dataString);

    // Create the dynamic table content
    const tableRows = dataObject.myArrayField
      .map(
        (item) => `
      <tr>
        <td>${item.number}</td>
        <td>${item.description} - ${item.additionaldescription} : ( ${
          bengaliMonths[selectedMonth - 1]
        }/${selectedYear} - ${
          bengaliMonths[selectedToMonth - 1]
        }/${selectedToYear} )</td> 
        <td>${item.amount}</td>
      </tr>
    `,
      )
      .join('');

    // Create the complete HTML content
    const staticContent = `
      <div>
      <body>
      <div style="position: relative;">
        <!-- Overlay Image -->
        <img src="https://ansarul.vercel.app/static/media/logo.4b6898928be910a2f248.png" alt="Overlay Image" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0.5;">
    
        <h4 style="margin-bottom: 4px; text-align: center; margin: 10px;">
          আনসারুল মুসলিমীন বহুমূখী সমবায় সমিতি লি: <br />
          ANSARUL MUSLIMIN BAHUMUKHI SAMABAY SAMITY LTD.
        </h4>
        
        <h6 style="margin-bottom: 4px; text-align: center; margin: 10px;">
          ১-জি, ১/১, চিড়িয়াখানা রোড, মিরপুর-১, ঢাকা-১২১৬ <br />
          গভ: রেজি: নং-১২৮/৯৮
          <br />
          ফোন-৮০২১৬৩৬
        </h6>
        <hr/>
        <div style="text-align: center; margin: 10px";><p>রশিদ</p></div>
    
        <div style="display: grid; justify-items: space-between;">
          <div>
            <p>রশিদ নং : ${dataObject?.roshidNo}</p>
            <p>তারিখ : ${dataObject?.date}</p>
          </div>
          <div style="float:right">
            <p>সদস্যের নাম : ${dataObject?.name}</p>
            <p>মেম্বার নং  : ${dataObject?.memberId}</p>
          </div>
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
        <p style='float:right'>মোট টাকার পরিমাণ : ${dataObject?.total_amount}</p>
      </div>
    </body>
    
    
       
      </div>
    `;

    // Create a temporary div to hold the content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = staticContent;

    // Append the temporary div to the body
    document.body.appendChild(tempDiv);

    // Use html2pdf to generate the PDF
    html2pdf(tempDiv, {
      margin: 10,
      filename: roshidNo,
      image: {type: 'jpeg', quality: 0.98},
      html2canvas: {scale: 2},
      jsPDF: {
        unit: 'mm',
        format: 'a5', // Set to A7
        orientation: 'portrait',
        width: 105,  // A7 width
        height: 74,  // A7 height
      },
    });
    

    // Remove the temporary div from the body
    document.body.removeChild(tempDiv);
  };

  const handlePrintVoucher = async (data) => {
    if (isVoucherReady) {
      const pdf = new jsPDF();
      await generatePDFContent(pdf, data);

      // Open the print dialog
      // pdf.autoPrint();
      // window.open(pdf.output('bloburl'), '_blank');
    }
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
      setIsVoucherReady(true);
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
          additionaldescription: row.additionaldescription,
          payment_start_month: selectedMonth,
          payment_start_year: selectedYear,
          payment_end_month: selectedToMonth,
          payment_end_year: selectedToYear,
          amount: row.amount,
        })),
        phone,
        voterId,
        total_amount: totalAmount,
        roshidNo: roshidNo,
        // payment_start_month: selectedMonth,
        // payment_start_year: selectedYear,
        // payment_end_month: selectedToMonth,
        // payment_end_year: selectedToYear,
      };
      setVoucherData(dataToSend);
      // Send a POST request to your API endpoint using axios
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/income-expense`,
        dataToSend,
      );
      await handlePrintVoucher(dataToSend);

      // Handle the response
      console.log('Response:', response.data);
      setSnackbarMessage('সফলভাবে তৈরী হয়েছে');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      // Reset the form after successful submission
      setRows([
        {number: 1, description: '', additionaldescription: '', amount: ''},
      ]);
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
  }, [memberSearch, voucherData]);

  useEffect(() => {
    generateNo();
  }, []);

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
                label='মেম্বার আইডি'
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
              label='ভোটার আইডি'
              value={voterId}
              onChange={(e) => setVoterId(e.target.value)}
              sx={{margin: '10px'}}
            />
          </div>
          <Grid
            container
            spacing={1}
            mb={4}
            mt={4}
            sx={{textAlign: 'center', padding: '5px'}}
          >
            <Grid item xs={1.5}>
              <Typography
                variant='h3'
                component='h2'
                sx={{backgroundColor: 'black', color: 'white'}}
              >
                ক্র: নং:
              </Typography>
              {rows.map((row, index) => (
                <TextField
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '5px',
                  }}
                  key={index}
                  value={row.number}
                  disabled
                />
              ))}
            </Grid>
            <Grid item xs={8}>
              <Typography
                variant='h3'
                component='h2'
                sx={{backgroundColor: 'black', color: 'white'}}
              >
                বিবরণ
              </Typography>
              <div>
                {rows.map((row, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '5px',
                    }}
                  >
                    <select
                      value={row.description}
                      onChange={(e) =>
                        handleRowChange(index, 'description', e.target.value)
                      }
                      style={{
                        width: '25%',
                        height: '50px',
                        marginRight: '5px',
                      }}
                    >
                      <option value=''>বিবরণ নির্বাচন করুন</option>
                      {incomeTypes.map((option, optionIndex) => (
                        <option key={optionIndex} label={option.label}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div style={{flex: 2}}>
                      <TextField
                        key={index}
                        value={row.additionaldescription}
                        onChange={(e) =>
                          handleRowChange(
                            index,
                            'additionaldescription',
                            e.target.value,
                          )
                        }
                        type='text'
                        inputProps={{min: 0}}
                        style={{width: '100%'}} // Set the TextField to take up 100% of the width
                      />
                    </div>
                    <div style={{flex: 1}}>
                      <div style={{flex: 1}}>
                        <Button onClick={() => handleOpenModal(index)}>
                          তারিখ সিলেক্ট
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Grid>
            <Grid item xs={2.5}>
              <Typography
                variant='h4'
                component='h4'
                sx={{backgroundColor: 'black', color: 'white'}}
              >
                টাকার পরিমাণ
              </Typography>
              {rows.map((row, index) => (
                <TextField
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '5px',
                  }}
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
            <Typography>মোট টাকার পরিমাণ: {totalAmount}</Typography>
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
            {/* <Button
              variant='outlined'
              onClick={handlePrintVoucher}
              sx={{marginTop: '20px'}}
              // disabled={!isVoucherReady}
            >
              Print Voucher
            </Button> */}
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

        <Modal
          open={openModalIndex !== null}
          onClose={handleCloseModal}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '300px',
              backgroundColor: 'white', // Set the background color to white
              border: '2px solid #000',
              padding: '20px', // Add padding for better appearance
            }}
          >
            <h2 id='modal-modal-title'>
              রশিদের সময়সীমা - {rows[0]?.description}
            </h2>
            <br />
            <p id='modal-modal-description'>
              <Typography>হতে</Typography>
              <br />
              <FromDate
                setSelectedMonth={(value) => {
                  setSelectedMonth(value);
                  // No need to close the modal here, let it remain open until the submit button is pressed
                }}
                setSelectedYear={(value) => {
                  setSelectedYear(value);
                  // No need to close the modal here, let it remain open until the submit button is pressed
                }}
              />
              <br />
              <Typography>পর্যন্ত</Typography>
              <br />
              <ToDate
                setToYear={(value) => {
                  setToYear(value);
                  // No need to close the modal here, let it remain open until the submit button is pressed
                }}
                setToMonth={(value) => {
                  setToMonth(value);
                  // No need to close the modal here, let it remain open until the submit button is pressed
                }}
              />
            </p>
            <br />
            <Button
              variant='contained'
              color='primary'
              onClick={() => {
                handleCloseModal();
              }}
            >
              Submit
            </Button>
          </div>
        </Modal>
      </Grid>
    </Grid>
  );
};

export default IncomeVoucher;
