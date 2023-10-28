import {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {Typography, Skeleton, Button} from '@mui/material';
import ActiveStatus from '@crema/common/ActiveStatus';
import AppCard from '@crema/core/AppCard';
import {GrStatusWarning} from 'react-icons/gr';
import {GoHeart} from 'react-icons/go';
import moment from 'moment';
import LoanPaymentList from '../LoanPaymentList';

// import MemberPaymentList from '../MemberPaymentList';

export default function LoanDetails() {
  const {id} = useParams();
  const [member, setMember] = useState({});
  const [loading, setLoading] = useState(true);
  const [loan, setLoan] = useState([]);
  const [memberDetails, setMemberDetails] = useState([]);

  const paymentDeadline = moment(loan?.paymentDeadline, 'YYYY-MM-DD');
  const today = moment();
  const daysDifference = paymentDeadline.diff(today, 'days');

  console.log(member, 'member');
  console.log(memberDetails, 'memberDetails');

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

  const getMemberLoanDetails = async (voterId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/income-expense/roshid-transactions?voterId=${voterId}&description=কর্জে হাসনা কিস্তি`,
      );
      setMemberDetails(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const getMember = async () => {
    let memberid = id;
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/loan/${memberid}`,
      );
      setLoan(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const getMemberDetails = async (memberid) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/members/${memberid}`,
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
        loan?.status === 'pending'
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

  useEffect(() => {
    getMember();
    getMemberDetails(id);
  }, [id]);

  useEffect(() => {
    if (Object.keys(member).length !== 0 && member.voterId) {
      getMemberLoanDetails(member.voterId);
    }
  }, [member]);

  return (
    <div>
      <AppCard>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Typography variant='h3' mb={5}>
            Loan Details : {loan?.name}
          </Typography>
          {loan?.status == 'permitted' ? (
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
                {moment(loan.date, 'YYYY-MM-DD').format('DD-MM-YYYY')}
              </Typography>
            </div>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>সদস্যের নাম: {loan.name}</Typography>
            </div>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>
                সদস্য নম্বার: {loan.memberID}
              </Typography>
            </div>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>
                স্টেটাস :{' '}
                <ActiveStatus
                  status={
                    loan?.status === 'pending'
                      ? 'pending'
                      : loan?.status === 'permitted'
                      ? 'permitted'
                      : 'done'
                  }
                />
              </Typography>
            </div>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>
                {loan?.status === 'true'
                  ? `আবেদনকৃত টাকার পরিমাণ: ${loan.reqMoney} টাকা`
                  : `কর্জে হাসনাকৃত টাকার পরিমাণ: ${loan.reqMoney} টাকা`}
              </Typography>
            </div>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>
                বাকি কর্জে হাসনা :{' '}
                {loan.reqMoney - memberDetails?.totalAmount + ' টাকা'}
              </Typography>
            </div>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>
                পরিশোধ তারিখ:{' '}
                {moment(loan?.paymentDeadline, 'YYYY-MM-DD').format(
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

      <AppCard style={{marginTop: '20px'}}>
        <LoanPaymentList customerDetails={memberDetails} />
      </AppCard>
    </div>
  );
}
