import React, {useState} from 'react';
import {TextField, Button, Typography} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import Snack from 'pages/common/SuccessSnackbar';

const SearchBar = ({onSearch}) => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isopen, setIsSuccessSnackbarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [severity, setseverity] = useState('');

  const handleSearch = async () => {
    if (!fromDate || !toDate || toDate < fromDate) {
      setseverity('error');
      setIsSuccessSnackbarOpen(true);
      setSuccessMessage('ভুল তারিখ নির্বাচন করা হয়েছে ');
      return;
    }

    try {
      await onSearch({fromDate, toDate});
      setseverity('success');
      setIsSuccessSnackbarOpen(true);
      setSuccessMessage('সফলভাবে তথ্য পাওয়া গিয়েছে');
    } catch (error) {
      setseverity('error');
      setIsSuccessSnackbarOpen(true);
      setSuccessMessage('ব্যর্থ হয়েছে');
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

        <Snack
          open={isopen}
          message={successMessage}
          onClose={() => setSuccessMessage(null)}
          severity={severity}
        />
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
