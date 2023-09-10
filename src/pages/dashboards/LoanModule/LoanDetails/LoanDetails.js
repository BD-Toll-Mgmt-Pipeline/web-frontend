import {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {Typography, Skeleton, Button} from '@mui/material';
import ActiveStatus from '@crema/common/ActiveStatus';
import AppCard from '@crema/core/AppCard';
import {GrStatusWarning} from 'react-icons/gr';
import {GoHeart} from 'react-icons/go';
import moment from 'moment';

// import MemberPaymentList from '../MemberPaymentList';

export default function LoanDetails() {
  const {id} = useParams();
  const [member, setMember] = useState({});
  const [loading, setLoading] = useState(true);

  const paymentDeadline = moment(member?.paymentDeadline, 'YYYY-MM-DD');
  const today = moment();
  const daysDifference = paymentDeadline.diff(today, 'days');

  let statusText = '';
  if (daysDifference < 0) {
    statusText = (
      <span style={{color: 'red'}}>
        {`Overdue by ${Math.abs(daysDifference)} days`}
      </span>
    );
  } else if (daysDifference === 0) {
    statusText = 'Due Today';
  } else {
    statusText = `Due in ${daysDifference} days`;
  }

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
        member?.status === 'pending'
          ? {
              status: 'permitted',
            }
          : {
              status: 'done',
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
          {member?.status == 'permitted' ? (
            <Button
              variant='outlined'
              color='primary'
              onClick={handleUpdateMember}
              sx={{margin: '5px'}}
            >
              <GrStatusWarning
                style={{color: 'lightblue', marginRight: '5px'}}
              />{' '}
              {'লেনদেন শেষ করুন'}
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
              <Typography variant='h4'>
                আবেদনের তারিখ:{' '}
                {moment(member.date, 'YYYY-MM-DD').format('DD-MM-YYYY')}
              </Typography>
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
                  status={
                    member?.status === 'pending'
                      ? 'pending'
                      : member?.status === 'permitted'
                      ? 'permitted'
                      : 'done'
                  }
                />
              </Typography>
            </div>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>
                {member?.status === 'true'
                  ? `আবেদনকৃত টাকার পরিমাণ: ${member.reqMoney} টাকা`
                  : `কর্জে হাসনাকৃত টাকার পরিমাণ: ${member.reqMoney} টাকা`}
              </Typography>
            </div>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>
                পরিশোধ তারিখ:{' '}
                {moment(member?.paymentDeadline, 'YYYY-MM-DD').format(
                  'DD-MM-YYYY',
                )}
              </Typography>
            </div>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>{`সময় বাকি (দিন): ${statusText}`}</Typography>
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
