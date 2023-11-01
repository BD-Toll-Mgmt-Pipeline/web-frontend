import AppCard from '@crema/core/AppCard';
import {Typography} from '@mui/material';
import React, {useState} from 'react';
import SearchBar from './SearchBar/SearchBar';
import axios from 'axios';
import RentalReport from './RentalReport/RentalReport';

const Analytics = () => {
  const [totalIncomeDate, setTotalIncome] = useState('');
  const [totalExpenseDate, setTotalExpense] = useState('');

  const onSearch = async (value) => {
    if (value?.fromDate && value?.toDate) {
      const IncomeApi = `${process.env.REACT_APP_BASE_URL}/income-expense/total-income?fromDate=${value?.fromDate}&toDate=${value?.toDate}`;
      const ExpenseApi = `${process.env.REACT_APP_BASE_URL}/expense/total-expense?fromDate=${value?.fromDate}&toDate=${value?.toDate}`;

      try {
        const response1 = await axios.get(IncomeApi);
        console.log(response1?.data, 'Response from the first API');
        setTotalIncome(response1?.data);

        const response2 = await axios.get(ExpenseApi);
        console.log(response2?.data, 'Response from the second API');
        setTotalExpense(response2?.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <AppCard>
      <Typography variant='h4'>Company Module</Typography>
      <div style={{marginTop: '30px'}}>
        <SearchBar onSearch={onSearch} />
      </div>
      <div style={{marginTop: '20px'}}>
        <RentalReport
          totalIncomeDate={totalIncomeDate}
          totalExpenseDate={totalExpenseDate}
        />
      </div>
    </AppCard>
  );
};

export default Analytics;
