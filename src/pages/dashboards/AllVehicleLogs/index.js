import AppCard from '@crema/core/AppCard';
import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MemberTable from './MemberTable';
// import { Link as RouterLink } from 'react-router-dom';
import SearchBar from './SearchBar/SearchBar';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
// import { MdCreate } from 'react-icons/md';

const Crypto = () => {
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const getMembers = async () => {
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

    getMembers(); // Fetch data on component mount

    const eventSource = new EventSource(
      `${process.env.REACT_APP_BASE_URL}/api/process_ocr`
    );

    eventSource.onmessage = (event) => {
      const eventData = JSON.parse(event.data);

      setMembers((prevMembers) => [eventData, ...prevMembers]);
    };

    // Close the EventSource connection when thefg component unmounts
    return () => {
      eventSource.close();
    };
  }, []); 

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
        {/* <div>
          <RouterLink
            to={`/dashboards/member-module/add-new-member`}
            underline='none'
          >
            <Button
              variant='outlined'
              sx={{ float: 'right', margin: '30px' }}
              color='primary'
            >
              <MdCreate style={{ margin: '5px' }} /> নতুন সদস্য সংযোজন
            </Button>
          </RouterLink>
        </div> */}
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
