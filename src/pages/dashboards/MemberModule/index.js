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

  const getMembers = async () => {
    try {
      const query = ''; // Provide the search query if needed
      const page = 1; // Provide the current page number
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

      // const { members, currentPage, totalPages } = response.data;
      const {members} = response.data;
      setMembers(members);
      setTotalPages(totalPages);
      console.log('Members:', members);
    } catch (error) {
      console.error('Failed to get members');
      console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    getMembers();
  }, []);

  return (
    <>
      <AppCard>
        <Typography variant='h4'>Member Module</Typography>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div style={{marginTop: '30px'}}>
            <SearchBar />
          </div>
          <div>
            <RouterLink to={`/dashboard/add-new-member`} underline='none'>
              <Button
                variant='outlined'
                sx={{float: 'right', margin: '30px'}}
                color='primary'
                // autoFocus
              >
                <MdCreate style={{margin:'5px'}} /> নতুন মেম্বার সংযোজন
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
    </>
  );
};

export default Crypto;
