import AppCard from '@crema/core/AppCard';
import { Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import RentalTable from './RentalTable';
import { Link as RouterLink } from 'react-router-dom';
import SearchBar from './SearchBar/SearchBar';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';

const Analytics = () => {
  const [totalPages, setTotalPages] = useState(1);
  const [rentalName, setRentals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getRentals(currentPage);
  }, [currentPage]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const getRentals = async (page) => {
    try {
      const query = ''; // Provide the search query if needed
      const perPage = 10; // Provide the number of items per page

      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/rental`, {
        params: {
          query,
          page,
          perPage,
        },
      });

      const { rentalName, totalPages } = response.data;
      setRentals(rentalName);
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

      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/rental`, {
        params: {
          query,
          page,
          perPage,
        },
      });

      const { rentalName, totalPages } = response.data;
      setRentals(rentalName);
      setTotalPages(totalPages);
      setCurrentPage(1); // Reset the current page to 1 when performing a new search
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <AppCard>
      <Typography variant='h4'>Loan Managment Module</Typography>
      <div style={{ marginTop: '30px' }}>
        <SearchBar onSearch={onSearch} />
      </div>
      <div style={{ display: 'flex' }}>
        <div>
          <RouterLink to={`/dashboard/add-new-rental`} underline='none'>
            <Button variant='outlined' sx={{ float: 'right', margin: '30px' }} color='primary'>
              নতুন ভাড়া সংযুক্তি
            </Button>
          </RouterLink>
        </div>
        <div>
          <RouterLink to={`/dashboard/add-new-rental-type`} underline='none'>
            <Button variant='outlined' sx={{ float: 'right', margin: '30px' }} color='primary'>
              নতুন ভাড়ার ধরণ সংযুক্তি
            </Button>
          </RouterLink>
        </div>
        <div>
          <RouterLink to={`/dashboard/rental-report`} underline='none'>
            <Button variant='outlined' sx={{ float: 'right', margin: '30px' }} color='primary'>
              ভাড়া সংক্রান্ত রিপোর্ট
            </Button>
          </RouterLink>
        </div>
      </div>
      <RentalTable orderList={rentalName} />
      <Pagination
        sx={{ margin: '20px' }}
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
