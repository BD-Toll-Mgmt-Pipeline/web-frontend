import {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {Typography, Skeleton, Button} from '@mui/material';
import ActiveStatus from '@crema/common/ActiveStatus';
import AppCard from '@crema/core/AppCard';
import {GrStatusWarning} from 'react-icons/gr';
import {GoHeart} from 'react-icons/go';
// import MemberPaymentList from '../MemberPaymentList';

export default function LoanDetails() {
  const {id} = useParams();
  const [member, setMember] = useState({});
  const [loading, setLoading] = useState(true);

  const getMember = async () => {
    let memberid = id;
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/loan/${memberid}`,
      );
      setMember(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleUpdateMember = async () => {
    let memberid = id;
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/loan/${memberid}`,
        member?.status === 'true'
          ? {
              status: 'false',
            }
          : {
              status: 'true',
            },
      );
      window.location.reload();
      console.log(response.data);
    } catch (error) {
      console.error('Failed to update member:', error);
    }
  };

  useEffect(() => {}, []);

  useEffect(() => {
    getMember();
  }, []);

  return (
    <div>
      <AppCard>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Typography variant='h3' mb={5}>
            Loan Details : {member?.name}
          </Typography>
          {member?.status == 'true' ? (
            <Button
              variant='outlined'
              color='primary'
              onClick={handleUpdateMember}
              sx={{margin: '5px'}}
            >
              <GrStatusWarning
                style={{color: 'lightblue', marginRight: '5px'}}
              />{' '}
              {'পারমিশন তুলে ফেলুন'}
            </Button>
          ) : (
            <Button
              variant='outlined'
              color='primary'
              onClick={handleUpdateMember}
              sx={{margin: '5px'}}
            >
              <GoHeart style={{color: 'lightblue', marginRight: '5px'}} />{' '}
              {'কর্জে হাসনা আবেদন পাস করুন'}
            </Button>
          )}
        </div>

        <hr />
        {loading ? (
          <Skeleton variant='rectangular' width={700} height={800} />
        ) : (
          <>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>আবেদনের তারিখ: {member.date}</Typography>
            </div>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>সদস্যের নাম: {member.name}</Typography>
            </div>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>
                সদস্য নাম্বার: {member.memberID}
              </Typography>
            </div>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>
                স্টেটাস :{' '}
                <ActiveStatus
                  status={member?.status === 'false' ? 'pending' : 'permitted'}
                />
              </Typography>
            </div>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>
                {member?.status === 'false'
                  ? `আবেদনকৃত টাকার পরিমাণ: ${member.reqMoney} টাকা`
                  : `কর্জে হাসনাকৃত টাকার পরিমাণ: ${member.reqMoney} টাকা`}
              </Typography>
            </div>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>
                পরিশোধ তারিখ: {member.paymentDeadline}
              </Typography>
            </div>
          </>
        )}
      </AppCard>

      {/* <AppCard style={{marginTop: '20px'}}>
        <MemberPaymentList customerDetails={members} />
      </AppCard> */}
    </div>
  );
}
