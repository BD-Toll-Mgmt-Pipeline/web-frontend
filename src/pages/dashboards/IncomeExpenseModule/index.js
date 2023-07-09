import AppCard from '@crema/core/AppCard';
import {Button, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import SearchBar from './SearchBar/SearchBar';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import IncomeExpenseTable from './IncomeExpenseTable';

const Analytics = () => {
  const [totalPages, setTotalPages] = useState(1);
  const [rentalName, setRentals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getIncomeExpense(currentPage);
  }, [currentPage]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const getIncomeExpense = async (page) => {
    try {
      const query = ''; // Provide the search query if needed
      const perPage = 10; // Provide the number of items per page

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/income-expense`,
        {
          params: {
            query,
            page,
            perPage,
          },
        },
      );
      console.log(response.data,"ndkndkndskosdnlkdsnlksdn sdkjnfoknsfoknsfkfnskl");
      const {allIncomeExpense, totalPages} = response.data;
      setRentals(allIncomeExpense);
      setTotalPages(totalPages);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const onSearch = async (value) => {
    try {
      const query = value;
      const page = 1;
      const perPage = 10;

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/rental`,
        {
          params: {
            query,
            page,
            perPage,
          },
        },
      );

      const {rentalName, totalPages} = response.data;
      setRentals(rentalName);
      setTotalPages(totalPages);
      setCurrentPage(1); // Reset the current page to 1 when performing a new search
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <AppCard>
      <Typography variant='h4'>Income-Expense Module</Typography>
      <div style={{marginTop: '30px'}}>
        <SearchBar onSearch={onSearch} />
      </div>
      <div style={{display: 'flex'}}>
        <div>
          <RouterLink to={`/dashboard/add-payment-voucher`} underline='none'>
            <Button
              variant='outlined'
              sx={{float: 'right', margin: '30px'}}
              color='primary'
            >
              টাকা গ্রহনের রশিদ
            </Button>
          </RouterLink>
        </div>
        <div>
          <RouterLink to={`/dashboard/add-receive-voucher`} underline='none'>
            <Button
              variant='outlined'
              sx={{float: 'right', margin: '30px'}}
              color='primary'
            >
              টাকা প্রদানের ভাউচার
            </Button>
          </RouterLink>
        </div>
      </div>
      <IncomeExpenseTable orderList={rentalName} />
      <Pagination
        sx={{margin: '20px'}}
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        variant='outlined'
        shape='rounded'
      />
    </AppCard>
  );
};

export default Analytics;
