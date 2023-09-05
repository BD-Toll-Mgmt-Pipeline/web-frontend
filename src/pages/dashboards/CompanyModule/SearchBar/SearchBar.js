import React, { useState } from 'react';
import { styled } from '@mui/system';
import { InputBase, IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import axios from 'axios';

const Root = styled('div')({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  borderRadius: 4,
  backgroundColor: '#f2f2f2',
  padding: '4px 8px',
});

const IconButtonStyled = styled(IconButton)({
  padding: 8,
});

const SearchBar = ({ onSearch }) => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const handleSearch = (event) => {
    const query = event.target.value;
    onSearch(query);
  };

  const handleFromDateChange = (event) => {
    const date = event.target.value;
    setFromDate(date);
  };

  const handleToDateChange = (event) => {
    const date = event.target.value;
    setToDate(date);
  };

  const fetchData = () => {
    if (fromDate && toDate) {
      const apiUrl = `http://localhost:5000/income-expense/total-income?fromDate=${fromDate}&toDate=${toDate}`;

      axios
        .get(apiUrl)
        .then((response) => {
          console.log(response.data);
          // Handle the response data here as needed
        })
        .catch((error) => {
          console.error(error);
          // Handle any errors here
        });
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <Root>
          <IconButtonStyled>
            <SearchIcon />
          </IconButtonStyled>
          <InputBase placeholder='নাম/ফোন সার্চ' onChange={handleSearch} />
        </Root>
      </div>
      <div>
        <TextField
          type='date'
          value={fromDate}
          onChange={handleFromDateChange}
          style={{ marginLeft: '20px', width: '200px' }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div>
        <TextField
          type='date'
          value={toDate}
          onChange={handleToDateChange}
          style={{ marginLeft: '20px', width: '200px' }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div>
        <button onClick={fetchData}>Fetch Data</button>
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
