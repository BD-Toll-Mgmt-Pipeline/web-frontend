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
import {MdCreate} from 'react-icons/md';

const Welfare = () => {
  const [totalPages, setTotalPages] = useState(1);
  const [transaction, setTransaction] = useState([]);
  const [expense, setExpense] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTab, setSelectedTab] = useState('income');

  useEffect(() => {
    getIncome(currentPage);
    getExpense(currentPage);
  }, [currentPage]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const getIncome = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/income-expense/roshid-transactions?description=কল্যান তহবিল`,
      );

      const {transactions} = response.data;
      setTransaction(transactions);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const getExpense = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/expense/voucher-transactions?description=কল্যাণ তহবিল সাহায্য`,
      );

      const {transactions} = response.data;
      setExpense(transactions);
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
        `${process.env.REACT_APP_BASE_URL}/welfare`,
        {
          params: {
            query,
            page,
            perPage,
          },
        },
      );

      const {allIncomeExpense, totalPages} = response.data;
      setTransaction(allIncomeExpense);
      setTotalPages(totalPages);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <AppCard>
      <Typography variant='h4'>Welfare Module</Typography>
      <div style={{marginTop: '30px'}}>
        <SearchBar onSearch={onSearch} />
      </div>
      <div style={{display: 'flex'}}>
        <div>
          <RouterLink
            to={`/dashboards/income-expense-module/add-payment-voucher`}
            underline='none'
          >
            <Button
              variant='outlined'
              sx={{float: 'right', margin: '30px'}}
              color='primary'
            >
              <MdCreate style={{margin: '5px'}} />
              নতুন রশিদ তৈরী
            </Button>
          </RouterLink>
        </div>
        <div>
          <RouterLink
            to={`/dashboards/income-expense-module/add-receive-voucher`}
            underline='none'
          >
            <Button
              variant='outlined'
              sx={{float: 'right', margin: '30px'}}
              color='primary'
            >
              <MdCreate style={{margin: '5px'}} />
              নতুন ভাউচার তৈরী
            </Button>
          </RouterLink>
        </div>
        <div>
          <RouterLink
            to={`/dashboards/welfare/welfare-report`}
            underline='none'
          >
            <Button
              variant='outlined'
              sx={{float: 'right', margin: '30px'}}
              color='primary'
            >
              কল্যান তহবিলের রিপোর্ট
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
          <IncomeTable orderList={transaction} />
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

export default Welfare;
