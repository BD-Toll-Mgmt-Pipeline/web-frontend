import React, {useState} from 'react';
// import {styled} from '@mui/system';
import {TextField, Button, Typography} from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
// import axios from 'axios';

// const Root = styled('div')({
//   display: 'flex',
//   alignItems: 'center',
//   width: '100%',
//   borderRadius: 4,
//   backgroundColor: '#f2f2f2',
//   padding: '4px 8px',
// });

// const IconButtonStyled = styled(IconButton)({
//   padding: 8,
// });

const SearchBar = ({onSearch}) => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  // const [totalIncome, setTotalIncome] = useState([]);

  const handleSearch = () => {
    const query = {fromDate, toDate};
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

  // const fetchData = () => {
  //   if (fromDate && toDate) {
  //     const apiUrl = `${process.env.REACT_APP_BASE_URL}/income-expense/total-income?fromDate=${fromDate}&toDate=${toDate}`;

  //     axios
  //       .get(apiUrl)
  //       .then((response) => {
  //         console.log(
  //           response?.data,
  //           'nfdasfnnfndfkndfkndfkndfknfdkdnfkfdnkfdnkfdnk',
  //         );
  //         setTotalIncome(response?.data);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }
  // };

  // console.error(totalIncome, 'totalIncome');

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      {/* <div>
        <Root>
          <IconButtonStyled>
            <SearchIcon />
          </IconButtonStyled>
          <InputBase placeholder='নাম/ফোন সার্চ' onChange={handleSearch} />
        </Root>
      </div> */}
      <div style={{display: 'flex', alignItems: 'center'}}>
        <Typography>হইতে :</Typography>
        <TextField
          type='date'
          value={fromDate}
          onChange={handleFromDateChange}
          style={{marginLeft: '20px', width: '200px'}}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div style={{display: 'flex', alignItems: 'center', marginLeft:'10px'}}>
        <Typography>পর্যন্ত :</Typography>
        <TextField
          type='date'
          value={toDate}
          onChange={handleToDateChange}
          style={{marginLeft: '20px', width: '200px'}}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div>
        <Button
          type='submit'
          variant='outlined'
          color='primary'
          onClick={handleSearch}
          sx={{marginLeft: '10px'}}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.string.isRequired,
};

export default SearchBar;
