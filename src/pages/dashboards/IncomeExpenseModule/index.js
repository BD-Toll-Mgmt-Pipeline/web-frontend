import AppCard from '@crema/core/AppCard';
import {Button, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import SearchBar from './SearchBar/SearchBar';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import IncomeTable from './IncomeTable';
import ExpenseTable from './ExpenseTable';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';

const Analytics = () => {
  const [totalPages, setTotalPages] = useState(1);
  const [rentalName, setRentals] = useState([]);
  const [expense, setExpense] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTab, setSelectedTab] = useState('income');

  useEffect(() => {
    getIncomeExpense(currentPage);
    getExpense(currentPage);
  }, [currentPage]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
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

      const {allIncomeExpense, totalPages} = response.data;
      setRentals(allIncomeExpense);
      setTotalPages(totalPages);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const getExpense = async (page) => {
    try {
      const query = ''; // Provide the search query if needed
      const perPage = 10; // Provide the number of items per page

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/expense`,
        {
          params: {
            query,
            page,
            perPage,
          },
        },
      );

      const {allExpense, totalPages} = response.data;
      setExpense(allExpense);
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
        `${process.env.REACT_APP_BASE_URL}/income-expense`,
        {
          params: {
            query,
            page,
            perPage,
          },
        },
      );

      const {allIncomeExpense, totalPages} = response.data;
      setRentals(allIncomeExpense);
      setTotalPages(totalPages);
      setCurrentPage(1);
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
      <div style={{display: 'flex', justifyContent: 'flex-start'}}>
        <div>
          <RouterLink
            to={`/dashboards/income-expense-module/add-payment-voucher`}
            underline='none'
            style={{textDecoration: 'none'}}
            I
          >
            <Button variant='outlined' sx={{margin: '10px'}} color='primary'>
              নতুন রশিদ তৈরী
            </Button>
          </RouterLink>
        </div>
        <div>
          <RouterLink
            to={`/dashboards/income-expense-module/add-receive-voucher`}
            underline='none'
            style={{textDecoration: 'none'}}
          >
            <Button variant='outlined' sx={{margin: '10px'}} color='primary'>
              নতুন ভাউচার তৈরী
            </Button>
          </RouterLink>
        </div>
      </div>
      <TabContext value={selectedTab}>
        <TabList onChange={handleTabChange}>
          <Tab label='রশিদ' value='income' />
          <Tab label='ভাউচার' value='expense' />
        </TabList>
        {selectedTab === 'income' ? (
          <IncomeTable orderList={rentalName} />
        ) : (
          <ExpenseTable orderList={expense} />
        )}
      </TabContext>
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
