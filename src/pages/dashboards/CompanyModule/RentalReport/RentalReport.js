import React, {useState, useEffect} from 'react';
import AppCard from '@crema/core/AppCard';
import {Typography} from '@mui/material';
import {GrMoney} from 'react-icons/gr';
import axios from 'axios';

export default function RentalReport() {
  const [incomeData, setIncomeData] = useState(0);
  const [loading, setLoading] = useState(true);
  const [toDate] = useState(new Date().toISOString().slice(0, 10));

  useEffect(() => {
    fetchIncomeData();
  }, [toDate]);

  const fetchIncomeData = () => {
    const apiUrl = `http://localhost:5000/income-expense/total-income?fromDate=${new Date()
      .toISOString()
      .slice(0, 10)}&toDate=${new Date().toISOString().slice(0, 10)}`;

    setLoading(true);

    axios
      .get(apiUrl)
      .then((response) => {
        setIncomeData(response.data.totalIncome || 0);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  // const handleToDateChange = (event) => {
  //   const date = event.target.value;
  //   setToDate(date);
  // };

  return (
    <>
      <div style={{display: 'flex', justifyContent: 'space-around'}}>
        <AppCard>
          <Typography variant='h3'>
            <GrMoney style={{marginRight: '10px'}} />
            আজকের ইনকাম (রশিদ থেকে)
          </Typography>
          <Typography variant='h3'>
            {loading ? 'Loading...' : incomeData}
          </Typography>
        </AppCard>
        <AppCard>
          <Typography variant='h3'>
            <GrMoney style={{marginRight: '10px'}} />
            আজকের খরচ (ভাউচার থেকে)
          </Typography>
          <Typography variant='h3'>
            {loading ? 'Loading...' : incomeData}
          </Typography>
        </AppCard>
        {/* Other cards */}
      </div>
      {/* <div style={{ marginTop: '20px' }}>
        <Typography variant='h5'>Select To Date:</Typography>
        <input
          type='date'
          value={toDate}
          onChange={handleToDateChange}
          style={{ marginLeft: '20px' }}
        />
      </div> */}
    </>
  );
}
