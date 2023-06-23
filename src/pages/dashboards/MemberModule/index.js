import AppCard from '@crema/core/AppCard';
import {Button, Typography} from '@mui/material';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {onGetCryptoData} from 'redux/actions';
import MemberTable from './MemberTable';
import {Link as RouterLink} from 'react-router-dom';
import SearchBar from './SearchBar/SearchBar';

const Crypto = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onGetCryptoData());
  }, [dispatch]);

  const orderList = [
    {
      customerId: 1,
      name: 'John Doe',
      phone: '1234567890',
      email: 'john@example.com',
      status: 'Active',
    },
    {
      customerId: 2,
      name: 'Jane Smith',
      phone: '0987654321',
      email: 'jane@example.com',
      status: 'Inactive',
    },
    // Add more order objects here if needed
  ];

  return (
    <>
      <AppCard>
        <Typography variant='h4'>Member Module</Typography>
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <div style={{marginTop:'30px'}}>
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
                নতুন মেম্বার সংযোজন
              </Button>
            </RouterLink>
          </div>
        </div>
        <MemberTable orderList={orderList} />
      </AppCard>
    </>
  );
};

export default Crypto;
