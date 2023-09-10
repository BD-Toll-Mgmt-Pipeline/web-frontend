import React, {useState, useEffect} from 'react';
import AppCard from '@crema/core/AppCard';
import {Typography} from '@mui/material';
import {GrMoney} from 'react-icons/gr';
import axios from 'axios';
import DailyCharts from './DailyIncomeExpenseCharts';
import CompanyInExlist from './CompanyInExList';
import CompanyExpenseList from './CompanyExpenseList';
import DailyBar from './DailyInExBar';
import PropTypes from 'prop-types';

export default function RentalReport({totalIncomeDate, totalExpenseDate}) {
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
            {totalIncomeDate?.totalIncome ? (
              <div>
                <Typography variant='h3'>
                  <GrMoney style={{marginRight: '10px'}} />
                  সার্চ রেজাল্ট
                </Typography>
                <Typography variant='h3'>
                  {loading
                    ? 'Loading...'
                    : totalIncomeDate?.totalIncome
                    ? totalIncomeDate?.totalIncome -
                      totalExpenseDate?.totalExpense +
                      ' টাকা'
                    : 'No Income'}
                </Typography>
              </div>
            ) : (
              <div>
                <Typography variant='h3'>
                  <GrMoney style={{marginRight: '10px'}} />
                  আজকের ইনকাম
                </Typography>
                <Typography variant='h3'>
                  {loading
                    ? 'Loading...'
                    : incomeData?.totalIncome
                    ? incomeData?.totalIncome -
                      expenseData?.totalExpense +
                      ' টাকা'
                    : 'No Income'}
                </Typography>
              </div>
            )}
          </AppCard>
          <AppCard style={{margin: '20px'}}>
            {totalExpenseDate?.totalExpense ? (
              <div>
                <Typography variant='h3'>
                  <GrMoney style={{marginRight: '10px'}} />
                  সার্চ রেজাল্ট
                </Typography>
                <Typography variant='h3'>
                  {loading
                    ? 'Loading...'
                    : totalExpenseDate?.totalExpense
                    ? totalExpenseDate?.totalExpense + ' টাকা'
                    : 'No Expense'}
                </Typography>
              </div>
            ) : (
              <div>
                <Typography variant='h3'>
                  <GrMoney style={{marginRight: '10px'}} />
                  আজকের খরচ
                </Typography>
                <Typography variant='h3'>
                  {loading
                    ? 'Loading...'
                    : expenseData?.totalExpense
                    ? expenseData?.totalExpense + ' টাকা'
                    : 'No Income'}
                </Typography>
              </div>
            )}
          </AppCard>
        </div>
        <div>
          <DailyCharts
            income={totalIncomeDate?.totalIncome ? totalIncomeDate : incomeData}
            expense={
              totalExpenseDate?.totalExpense ? totalExpenseDate : expenseData
            }
          />
        </div>
        <div>
          <DailyBar
            income={totalIncomeDate?.totalIncome ? totalIncomeDate : incomeData}
            expense={
              totalExpenseDate?.totalExpense ? totalExpenseDate : expenseData
            }
          />
        </div>
      </div>
      <CompanyInExlist
        income={totalIncomeDate?.totalIncome ? totalIncomeDate : incomeData}
      />

      <CompanyExpenseList
        sx={{marginTop: '20px'}}
        expense={
          totalExpenseDate?.totalExpense ? totalExpenseDate : expenseData
        }
      />
    </>
  );
}

RentalReport.propTypes = {
  totalIncomeDate: PropTypes.shape({
    totalIncome: PropTypes.number,
  }),
  totalExpenseDate: PropTypes.shape({
    totalExpense: PropTypes.number,
  }),
};
