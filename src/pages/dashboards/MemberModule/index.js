import AppCard from '@crema/core/AppCard';
import {Button, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import MemberTable from './MemberTable';
import {Link as RouterLink} from 'react-router-dom';
import SearchBar from './SearchBar/SearchBar';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import {MdCreate} from 'react-icons/md';

const Crypto = () => {
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const getMembers = async (page) => {
    try {
      const query = ''; // Provide the search query if needed
      const perPage = 10; // Provide the number of items per page

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/members`,
        {
          params: {
            query,
            page,
            perPage,
          },
        },
      );

      const {members, totalPages} = response.data;
      setMembers(members);
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

      const authToken = localStorage.getItem('token'); // Retrieve the authentication token from localStorage

      // Check if authToken exists before making the request
      if (authToken) {
        const headers = {
          Authorization: `Bearer ${authToken}`,
        };

        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/members`,
          {
            params: {
              query,
              page,
              perPage,
            },
            headers, // Include the headers in the request
          },
        );

        const {members, totalPages} = response.data;
        setMembers(members);
        setTotalPages(totalPages);
        setCurrentPage(1); // Reset the current page to 1 when performing a new search
      } else {
        // Handle the case where the authToken is not available
        console.error('Authentication token not found.');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    getMembers(currentPage);
  }, [currentPage]);

  return (
    <AppCard>
      <Typography variant='h4'>Member Module</Typography>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{marginTop: '30px'}}>
          <SearchBar onSearch={onSearch} />
        </div>
        <div>
          <RouterLink
            to={`/dashboards/member-module/add-new-member`}
            underline='none'
          >
            <Button
              variant='outlined'
              sx={{float: 'right', margin: '30px'}}
              color='primary'
            >
              <MdCreate style={{margin: '5px'}} /> নতুন মেম্বার সংযোজন
            </Button>
          </RouterLink>
        </div>
      </div>
      <MemberTable orderList={members} />
      <Pagination
        sx={{margin: '20px'}}
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
