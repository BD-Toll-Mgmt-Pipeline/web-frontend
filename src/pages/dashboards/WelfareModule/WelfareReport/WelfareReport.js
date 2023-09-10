import AppCard from '@crema/core/AppCard';
import {Typography} from '@mui/material';
import React, {useState, useEffect} from 'react';
import {GrMoney} from 'react-icons/gr';
import axios from 'axios';

export default function WelfareReport() {
  const [expense, setExpense] = useState('');
  const [income, setIncome] = useState('');

  useEffect(() => {
    getExpense();
    getIncome();
  }, []);

  console.log(expense);

  const getExpense = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/expense/voucher-transactions?description=কল্যাণ তহবিল সাহায্য`,
      );

      const {totalAmount} = response.data;
      setExpense(totalAmount);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const getIncome = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/income-expense/roshid-transactions?description=কল্যান তহবিল`,
      );

      const {totalAmount} = response.data;
      setIncome(totalAmount);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <>
      <div style={{display: 'flex', justifyContent: 'space-around'}}>
        <AppCard>
          <Typography variant='h3'>
            <GrMoney style={{marginRight: '10px'}} />
            কল্যান তহবিলের সঞ্চিত টাকা
          </Typography>
          <Typography variant='h3'>{income - expense + " টাকা"}</Typography>
        </AppCard>
        <AppCard>
          <Typography variant='h3'>
            <GrMoney style={{marginRight: '10px'}} />
            কল্যান তহবিলের খরচ টাকা
          </Typography>
          <Typography variant='h3'>{expense + " টাকা"}</Typography>
        </AppCard>
        {/* <AppCard>
          <Typography variant='h3'>
            <GrMoney style={{marginRight: '10px'}} />
            মোট ভাড়ার সংখ্যা
          </Typography>
          <Typography variant='h3'>23</Typography>
        </AppCard> */}
      </div>
    </>
  );
}
