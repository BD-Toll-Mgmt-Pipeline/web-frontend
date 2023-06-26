import AppCard from '@crema/core/AppCard';
import {Button, Typography} from '@mui/material';
import React, {useEffect} from 'react';
import SearchBar from './SearchBar/SearchBar';
import VoucherTable from './VoucherTable';
import {Link as RouterLink} from 'react-router-dom';

const VoucherModule = () => {
  useEffect(() => {}, []);

  return (
    <>
      <AppCard>
        <Typography varient='h4'>Voucher Module</Typography>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div style={{marginTop: '30px'}}>
            <SearchBar />
          </div>
          <div style={{display: 'flex'}}>
            <div>
              <RouterLink
                to={`/dashboard/add-receive-voucher`}
                underline='none'
              >
                <Button
                  variant='outlined'
                  sx={{float: 'right', margin: '30px'}}
                  color='primary'
                  // autoFocus
                >
                  টাকা আদায়ের ভাউচার তৈরী
                </Button>
              </RouterLink>
            </div>
            <div>
              <RouterLink
                to={`/dashboard/add-payment-voucher`}
                underline='none'
              >
                <Button
                  variant='outlined'
                  sx={{float: 'right', margin: '30px'}}
                  color='primary'
                  // autoFocus
                >
                  টাকা প্রদানের ভাউচার
                </Button>
              </RouterLink>
            </div>
          </div>
        </div>
        <VoucherTable />
      </AppCard>
    </>
  );
};

export default VoucherModule;
