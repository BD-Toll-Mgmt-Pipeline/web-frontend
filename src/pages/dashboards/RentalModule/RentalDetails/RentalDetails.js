import AppCard from '@crema/core/AppCard';
import {Typography, Skeleton} from '@mui/material';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ActiveStatus from '@crema/common/ActiveStatus';
import {useParams} from 'react-router-dom';
import moment from 'moment';

export default function RentalDetails() {
  const {id} = useParams();
  const [member, setMember] = useState({});
  const [loading, setLoading] = useState(true);
  console.log(member);

  const getMember = async () => {
    let rentalid = id;
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/rental/${rentalid}`,
      );
      setMember(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMember();
  }, []);

  return (
    <div>
      <AppCard>
        <Typography variant='h3' mb={5}>
          Rental Details
        </Typography>
        <hr />
        {loading ? (
          <Skeleton variant='rectangular' width={200} height={30} />
        ) : (
          <>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>
                আবেদনকারীর নাম: {member.name}
              </Typography>
            </div>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>
                আবেদনের তারিখ :
                {moment(member?.date, 'YYYY-MM-DD').format('DD-MM-YYYY')}
              </Typography>
            </div>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>
                স্টেটাস :{' '}
                <ActiveStatus
                  status={member?.activeStatus === true ? 'active' : 'inactive'}
                />
              </Typography>
            </div>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>
                ভাড়ার ধরণ :{' '}
                <span style={{textWeight: '600px'}}>{member.rentaltype}</span>
              </Typography>
            </div>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>
                অ্যাডভান্স পে: {member.advancepay}
              </Typography>
            </div>

            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>
                স্থায়ী ঠিকানা: {member.permanentAddress}
              </Typography>
            </div>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>
                বর্তমান ঠিকানা: {} {member.currentAddress}
              </Typography>
            </div>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>
                ভোটার নাম্বার: {member.voterId}
              </Typography>
            </div>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>
                মোবাইল নাম্বার: {member.phone}
              </Typography>
            </div>
          </>
        )}
      </AppCard>
    </div>
  );
}
