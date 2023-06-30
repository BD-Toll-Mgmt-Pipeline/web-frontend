import AppCard from '@crema/core/AppCard';
import {Typography} from '@mui/material';
import React from 'react';
import {GrMoney} from 'react-icons/gr';

export default function RentalReport() {
  return (
    <>
      <div style={{display: 'flex', justifyContent: 'space-around'}}>
        <AppCard>
          <Typography variant='h3'>
            <GrMoney style={{marginRight: '10px'}} />
            মোট ভাড়ার সংখ্যা
          </Typography>
          <Typography variant='h3'>23</Typography>
        </AppCard>
        <AppCard>
          <Typography variant='h3'>
            <GrMoney style={{marginRight: '10px'}} />
            মোট ভাড়ার অগ্রিম টাকা
          </Typography>
          <Typography variant='h3'>100,00,000</Typography>
        </AppCard>
        <AppCard>
          <Typography variant='h3'>
            <GrMoney style={{marginRight: '10px'}} />
            মোট ভাড়ার সংখ্যা
          </Typography>
          <Typography variant='h3'>23</Typography>
        </AppCard>
      </div>
      <div style={{display: 'flex', justifyContent: 'space-around', marginTop: '40px'}}>
        <AppCard>
          <Typography variant='h3'>
            <GrMoney style={{marginRight: '10px'}} />
            মোট ভাড়ার সংখ্যা
          </Typography>
          <Typography variant='h3'>23</Typography>
        </AppCard>
        <AppCard>
          <Typography variant='h3'>
            <GrMoney style={{marginRight: '10px'}} />
            মোট ভাড়ার অগ্রিম টাকা
          </Typography>
          <Typography variant='h3'>100,00,000</Typography>
        </AppCard>
        <AppCard>
          <Typography variant='h3'>
            <GrMoney style={{marginRight: '10px'}} />
            মোট ভাড়ার সংখ্যা
          </Typography>
          <Typography variant='h3'>23</Typography>
        </AppCard>
      </div>
    </>
  );
}
