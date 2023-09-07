import React, {useState, useEffect} from 'react';
import AppCard from '@crema/core/AppCard';
import {Typography} from '@mui/material';
import {GrMoney} from 'react-icons/gr';
import axios from 'axios';
import DailyCharts from './DailyIncomeExpenseCharts';
import CompanyInExlist from './CompanyInExList';
import CompanyExpenseList from './CompanyExpenseList';

export default function RentalReport() {
  const [incomeData, setIncomeData] = useState(0);
  const [expenseData, setExpenseData] = useState(0);
  const [loading, setLoading] = useState(true);
  const [toDate] = useState(new Date().toISOString().slice(0, 10));

  useEffect(() => {
    fetchIncomeData();
    fetchExpenseData();
  }, [toDate]);

  const fetchIncomeData = () => {
    console.log(new Date().toISOString().slice(0, 10));
    const apiUrl = `${
      process.env.REACT_APP_BASE_URL
    }/income-expense/total-income?fromDate=${new Date()
      .toISOString()
      .slice(0, 10)}&toDate=${new Date().toISOString().slice(0, 10)}`;

    setLoading(true);

    axios
      .get(apiUrl)
      .then((response) => {
        setIncomeData(response.data || 0);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const fetchExpenseData = () => {
    console.log(new Date().toISOString().slice(0, 10));
    const apiUrl = `${
      process.env.REACT_APP_BASE_URL
    }/expense/total-expense?fromDate=${new Date()
      .toISOString()
      .slice(0, 10)}&toDate=${new Date().toISOString().slice(0, 10)}`;

    setLoading(true);

    axios
      .get(apiUrl)
      .then((response) => {
        setExpenseData(response.data || 0);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  return (
    <>
      <div style={{display: 'flex', justifyContent: 'space-around'}}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <AppCard style={{margin: '20px'}}>
            <Typography variant='h3'>
              <GrMoney style={{marginRight: '10px'}} />
              আজকের ইনকাম (রশিদ থেকে)
            </Typography>
            <Typography variant='h3'>
              {loading ? 'Loading...' : incomeData?.totalIncome + ' টাকা'}
            </Typography>
          </AppCard>
          <AppCard>
            <Typography variant='h3'>
              <GrMoney style={{marginRight: '10px'}} />
              আজকের খরচ (ভাউচার থেকে)
            </Typography>
            <Typography variant='h3'>
              {loading ? 'Loading...' : expenseData?.totalExpense + ' টাকা'}
            </Typography>
          </AppCard>
        </div>
        <div>
          <DailyCharts income={incomeData} expense={expenseData} />
        </div>
      </div>
      <CompanyInExlist income={incomeData} />

      <CompanyExpenseList expense={expenseData} />
    </>
  );
}
