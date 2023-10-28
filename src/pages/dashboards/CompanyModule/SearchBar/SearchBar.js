import React, {useState} from 'react';
import {TextField, Button, Typography, Snackbar, Alert} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';

const SearchBar = ({onSearch}) => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isSuccessSnackbarOpen, setIsSuccessSnackbarOpen] = useState(false);

  const handleSearch = async () => {
    if (!fromDate || !toDate || toDate < fromDate) {
      console.error('Invalid date range');
      return;
    }

    try {
      await onSearch({fromDate, toDate});

      setIsSuccessSnackbarOpen(true);
    } catch (error) {
      console.error('API error:', error);
    }
  };

  const handleFromDateChange = (event) => {
    const date = event.target.value;
    setFromDate(date);
    updateButtonDisabledState(date, toDate);
  };

  const handleToDateChange = (event) => {
    const date = event.target.value;
    setToDate(date);
    updateButtonDisabledState(fromDate, date);
  };

  const updateButtonDisabledState = (from, to) => {
    setIsButtonDisabled(!from || !to);
  };

  const handleSuccessSnackbarClose = () => {
    setIsSuccessSnackbarOpen(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div style={{display: 'flex', alignItems: 'center'}}>
        <div>
          <Typography>হইতে :</Typography>
          <TextField
            type='date'
            value={fromDate}
            onChange={handleFromDateChange}
            style={{marginLeft: '20px', width: '200px'}}
            InputLabelProps={{shrink: true}}
          />
        </div>
        <div>
          <Typography>পর্যন্ত :</Typography>
          <TextField
            type='date'
            value={toDate}
            onChange={handleToDateChange}
            style={{marginLeft: '20px', width: '200px'}}
            InputLabelProps={{shrink: true}}
          />
        </div>
      </div>
      <div>
        <Button
          type='submit'
          variant='outlined'
          color='primary'
          onClick={handleSearch}
          sx={{marginLeft: '10px'}}
          disabled={isButtonDisabled}
        >
          <SearchIcon /> অনুসন্ধান করুন
        </Button>

        <Snackbar
          open={isSuccessSnackbarOpen}
          autoHideDuration={6000}
          onClose={handleSuccessSnackbarClose}
        >
          <Alert onClose={handleSuccessSnackbarClose} severity='success'>
            সফলভাবে তথ্য পাওয়া গিয়েছে
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
