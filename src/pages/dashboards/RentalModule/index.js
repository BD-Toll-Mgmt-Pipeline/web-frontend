import AppCard from '@crema/core/AppCard';
import {Button, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import RentalTable from './RentalTable';
import {Link as RouterLink} from 'react-router-dom';
import SearchBar from './SearchBar/SearchBar';
import axios from 'axios';

const Analytics = () => {
  const [totalPages, setTotalPages] = useState(1);
  const [rentalName, setRentals] = useState([]);
  useEffect(() => {
    getRentals();
  }, []);
  const getRentals = async () => {
    try {
      const query = ''; // Provide the search query if needed
      const page = 1; // Provide the current page number
      const perPage = 10; // Provide the number of items per page

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
      const {rentalName} = response.data;
      console.log(response.data);
      setRentals(rentalName);
      setTotalPages(totalPages);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const onSearch = async (value) => {
    console.log(value);
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
      const {rentalName} = response.data;
      setRentals(rentalName);
      setTotalPages(totalPages);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  // const analyticsData = useSelector(({dashboard}) => dashboard.analyticsData);

  return (
    <>
      <AppCard>
        <Typography varient='h4'>Rental Module</Typography>
        <div>
          <div style={{marginTop: '30px'}}>
            <SearchBar onSearch={onSearch} />
          </div>
          <div style={{display: 'flex'}}>
            <div>
              <RouterLink to={`/dashboard/add-new-rental`} underline='none'>
                <Button
                  variant='outlined'
                  sx={{float: 'right', margin: '30px'}}
                  color='primary'
                  // autoFocus
                >
                  নতুন ভাড়া সংযুক্তি
                </Button>
              </RouterLink>
            </div>
            <div>
              <RouterLink
                to={`/dashboard/add-new-rental-type`}
                underline='none'
              >
                <Button
                  variant='outlined'
                  sx={{float: 'right', margin: '30px'}}
                  color='primary'
                  // autoFocus
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
                  // autoFocus
                >
                  ভাড়া সংক্রান্ত রিপোর্ট
                </Button>
              </RouterLink>
            </div>
          </div>
        </div>
        <RentalTable orderList={rentalName} />
      </AppCard>
    </>
  );
};

export default Analytics;
