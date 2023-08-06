import React from 'react';
import {Typography} from '@mui/material';
import PropTypes from 'prop-types';

const PrintableVoucher = (props) => {
  // Extract the necessary props to populate the printable voucher
  const {
    roshidNo,
    name,
    memberId,
    currentAddress,
    date,
    phone,
    voterId,
    rows,
    selectedMonth,
    selectedYear,
    selectedToMonth,
    selectedToYear,
    totalAmount,
  } = props;

  return (
    <div>
      {/* Add the necessary HTML structure for the printable voucher */}
      <Typography variant='h2' align='center'>
        আনসারুল মুসলিমীন বহুমূখী সমবায় সমিতি লি: <br />
        ANSARUL MUSLIMIN BAHUMUKHI SAMABAY SAMITY LTD.
      </Typography>
      <Typography align='center'>
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
      >
        রসিদ
      </Typography>
      <Typography>রসিদ নং - {roshidNo}</Typography>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{margin: '10px'}}>
          <Typography variant='h6'>নাম: {name}</Typography>
          <Typography variant='h6'>মেম্বার আইডি: {memberId}</Typography>
        </div>
        <div style={{margin: '10px'}}>
          <Typography variant='h6'>
            সংক্ষিপ্ত ঠিকানা: {currentAddress}
          </Typography>
          <Typography variant='h6'>তারিখ: {date}</Typography>
        </div>
      </div>
      <div style={{marginLeft: '10px', display: 'flex'}}>
        <Typography variant='h6'>ফোন: {phone}</Typography>
        <Typography variant='h6'>ভোটার আইডি: {voterId}</Typography>
      </div>
      <hr style={{margin: '10px'}} />
      <Typography>
        মাস হইতে: {selectedMonth}, {selectedYear}
      </Typography>
      <br />
      <Typography>
        মাস পর্যন্ত: {selectedToMonth}, {selectedToYear}
      </Typography>
      <hr style={{margin: '10px'}} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '20px',
        }}
      >
        <div>
          <Typography variant='h6'>ক্র: নং:</Typography>
          {rows.map((row, index) => (
            <Typography key={index} variant='h6'>
              {row.number}
            </Typography>
          ))}
        </div>
        <div>
          <Typography variant='h6'>বিবরণ</Typography>
          {rows.map((row, index) => (
            <Typography key={index} variant='h6'>
              {row.description}
            </Typography>
          ))}
        </div>
        <div>
          <Typography variant='h6'>টাকার পরিমাণ</Typography>
          {rows.map((row, index) => (
            <Typography key={index} variant='h6'>
              {row.amount}
            </Typography>
          ))}
        </div>
      </div>
      <div style={{textAlign: 'right', margin: '20px'}}>
        <Typography variant='h6'>মোট টাকার পরিমাণ: {totalAmount}</Typography>
      </div>
    </div>
  );
};

PrintableVoucher.propTypes = {
  roshidNo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  memberId: PropTypes.string.isRequired,
  currentAddress: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  voterId: PropTypes.string.isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    }),
  ).isRequired,
  selectedMonth: PropTypes.string.isRequired,
  selectedYear: PropTypes.string.isRequired,
  selectedToMonth: PropTypes.string.isRequired,
  selectedToYear: PropTypes.string.isRequired,
  totalAmount: PropTypes.number.isRequired,
};

export default PrintableVoucher;
