import AppCard from '@crema/core/AppCard';
import {Typography} from '@mui/material';
import React, {useState} from 'react';
// import RentalTable from './RentalTable';
// import {Link as RouterLink} from 'react-router-dom';
import SearchBar from './SearchBar/SearchBar';
import axios from 'axios';
import RentalReport from './RentalReport/RentalReport';
// import Pagination from '@mui/material/Pagination';

const Analytics = () => {
  const [totalIncomeDate, setTotalIncome] = useState('');
  const [totalExpenseDate, setTotalExpense] = useState('');

  // const [IncomeDate, setIncome] = useState('');
  // const [ExpenseDate, setExpense] = useState('');

  const onSearch = async (value) => {
    if (value?.fromDate && value?.toDate) {
      const authToken = localStorage.getItem('token');

      if (authToken) {
        const headers = {
          Authorization: `Bearer ${authToken}`,
        };

        const IncomeApi = `${process.env.REACT_APP_BASE_URL}/income-expense/total-income?fromDate=${value?.fromDate}&toDate=${value?.toDate}`;
        const ExpenseApi = `${process.env.REACT_APP_BASE_URL}/expense/total-expense?fromDate=${value?.fromDate}&toDate=${value?.toDate}`;

        axios
          .get(IncomeApi, {headers})
          .then((response1) => {
            console.log(response1?.data, 'Response from the first API');
            setTotalIncome(response1?.data);

            // Make the second API request with headers
            axios
              .get(ExpenseApi, {headers})
              .then((response2) => {
                console.log(response2?.data, 'Response from the second API');
                setTotalExpense(response2?.data);

                // Handle the response from the second API as needed
              })
              .catch((error2) => {
                console.error(error2);
              });
          })
          .catch((error1) => {
            console.error(error1);
          });
      }
    }
  };

  return (
    <AppCard>
      <Typography variant='h4'>Company Module</Typography>
      <div style={{marginTop: '30px'}}>
        <SearchBar onSearch={onSearch} />
        {/* <Typography>{IncomeDate}</Typography>
        <Typography>{ExpenseDate}</Typography> */}
      </div>
      {/* <div style={{display: 'flex'}}>
        <div>
          <RouterLink to={`/dashboard/add-new-rental`} underline='none'>
            <Button
              variant='outlined'
              sx={{float: 'right', margin: '30px'}}
              color='primary'
            >
              নতুন ভাড়া সংযুক্তি
            </Button>
          </RouterLink>
        </div>
        <div>
          <RouterLink to={`/dashboard/add-new-rental-type`} underline='none'>
            <Button
              variant='outlined'
              sx={{float: 'right', margin: '30px'}}
              color='primary'
            >
              নতুন ভাড়ার ধরণ সংযুক্তি
            </Button>
          </RouterLink>
        </div>
        <div>
          <RouterLink to={`/dashboard/rental-report`} underline='none'>
            <Button
              variant='outlined'
              sx={{float: 'right', margin: '30px'}}
              color='primary'
            >
              ভাড়া সংক্রান্ত রিপোর্ট
            </Button>
          </RouterLink>
        </div>
      </div> */}
      <div style={{marginTop: '20px'}}>
        <RentalReport
          totalIncomeDate={totalIncomeDate}
          totalExpenseDate={totalExpenseDate}
        />
      </div>
      {/* <RentalTable orderList={rentalName} />
      <Pagination
        sx={{ margin: '20px' }}
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        variant='outlined'
        shape='rounded'
      /> */}
    </AppCard>
  );
};

export default Analytics;
