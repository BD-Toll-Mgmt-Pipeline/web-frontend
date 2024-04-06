import AppCard from '@crema/core/AppCard';
import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MemberTable from './MemberTable';
import SearchBar from './SearchBar/SearchBar';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';

const Crypto = () => {
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/process_ocr`
      );

      const { carLogs, totalPages } = response.data;
      setMembers(carLogs);
      setTotalPages(totalPages);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(fetchData, 1000); // Fetch data every 1 second

    return () => clearInterval(intervalId); // Clear the interval on unmount
  }, []);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const onSearch = async (value) => {
    try {
      const query = value;
      const page = 1;
      const perPage = 10;

      const authToken = localStorage.getItem('token');

      if (authToken) {
        const headers = {
          Authorization: `Bearer ${authToken}`,
        };

        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/process_ocr`,
          {
            params: {
              query,
              page,
              perPage,
            },
            headers,
          }
        );

        const { carLogs, totalPages } = response.data;
        setMembers(carLogs);
        setTotalPages(totalPages);
        setCurrentPage(1);
      } else {
        console.error('Authentication token not found.');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <AppCard>
      <Typography variant='h4'>Vehicle Logs</Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ marginTop: '30px' }}>
          <SearchBar onSearch={onSearch} />
        </div>
      </div>
      <MemberTable orderList={members} />
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

export default Crypto;
