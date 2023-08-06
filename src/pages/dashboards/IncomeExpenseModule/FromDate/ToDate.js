import React, { useState } from 'react';
import { TextField, MenuItem, Grid } from '@mui/material';
import PropTypes from 'prop-types';

const ToDate = ({ setToYear, setToMonth }) => {
  const monthsInBangla = [
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

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, index) => currentYear - 5 + index); // Display 10 years (5 before and 5 after the current year)

  const [selectedMonth, setToSelectedMonth] = useState('');
  const [selectedYear, setToSelectedYear] = useState('');

  const handleMonthChange = (event) => {
    const selectedMonthIndex = monthsInBangla.indexOf(event.target.value);
    const englishMonthValue = selectedMonthIndex + 1; // Convert to English month value (1 to 12)
    setToSelectedMonth(event.target.value);
    setToMonth(englishMonthValue);
  };

  const handleYearChange = (event) => {
    setToSelectedYear(event.target.value);
    setToYear(event.target.value);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextField
          select
          label='মাস নির্বাচন করুন'
          value={selectedMonth}
          onChange={handleMonthChange}
          variant='outlined'
          fullWidth
        >
          <MenuItem value=''>
            <em>মাস নির্বাচন করুন</em>
          </MenuItem>
          {monthsInBangla.map((month, index) => (
            <MenuItem key={index} value={month}>
              {month}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={6}>
        <TextField
          select
          label='বছর নির্বাচন করুন'
          value={selectedYear}
          onChange={handleYearChange}
          variant='outlined'
          fullWidth
        >
          <MenuItem value=''>
            <em>বছর নির্বাচন করুন</em>
          </MenuItem>
          {years.map((year, index) => (
            <MenuItem key={index} value={year}>
              {year}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  );
};

ToDate.propTypes = {
  setToYear: PropTypes.func.isRequired,
  setToMonth: PropTypes.func.isRequired,
};

export default ToDate;
