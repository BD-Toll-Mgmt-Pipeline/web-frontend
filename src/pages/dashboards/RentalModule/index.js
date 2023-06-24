import AppCard from '@crema/core/AppCard';
import {Button, Typography} from '@mui/material';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {onGetAnalyticsData} from 'redux/actions';
import RentalTable from './RentalTable';
import {Link as RouterLink} from 'react-router-dom';
import SearchBar from './SearchBar/SearchBar';

const Analytics = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onGetAnalyticsData());
  }, [dispatch]);

  // const analyticsData = useSelector(({dashboard}) => dashboard.analyticsData);

  return (
    <>
      <AppCard>
        <Typography varient='h4'>Rental Module</Typography>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div style={{marginTop: '30px'}}>
            <SearchBar />
          </div>
          <div style={{display:'flex'}}>
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
              <RouterLink to={`/dashboard/add-new-member`} underline='none'>
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
        <RentalTable />
      </AppCard>
    </>
  );
};

export default Analytics;
