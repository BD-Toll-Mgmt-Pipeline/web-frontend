import {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {Typography, Skeleton, Button} from '@mui/material';
import ActiveStatus from '@crema/common/ActiveStatus';
import AppCard from '@crema/core/AppCard';
import {GrStatusWarning} from 'react-icons/gr';
import {GoHeart} from 'react-icons/go';
import MemberPaymentList from '../MemberPaymentList';

export default function MemberDetails() {
  const {id} = useParams();
  const [member, setMember] = useState({});
  const [totalAmount, setTotalAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [nomineeImage, setNomineeImage] = useState(null);
  const [nomineeImageLoading, setNomineeImageLoading] = useState(true);
  const [members, setMembers] = useState([]);

  const getMember = async () => {
    let memberid = id;
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
        `${process.env.REACT_APP_BASE_URL}/members/${memberid}`,
        member?.activeStatus === true
          ? {
              activeStatus: 'false',
            }
          : {
              activeStatus: 'true',
            },
      );
      window.location.reload();
      console.log(response.data);
    } catch (error) {
      console.error('Failed to update member:', error);
    }
  };

  const getUserProfileImage = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/members/image/user/${id}`,
        {responseType: 'arraybuffer'},
      );
      const blob = new Blob([response.data], {
        type: response.headers['content-type'],
      });
      const url = URL.createObjectURL(blob);
      setProfileImage(url);
      setImageLoading(false);
    } catch (error) {
      console.log(error);
      setImageLoading(false);
    }
  };

  const getNomineeProfileImage = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/members/image/nominee/${id}`,
        {responseType: 'arraybuffer'},
      );
      const blob = new Blob([response.data], {
        type: response.headers['content-type'],
      });
      const url = URL.createObjectURL(blob);
      setNomineeImage(url);
      setNomineeImageLoading(false);
    } catch (error) {
      console.log(error);
      setNomineeImageLoading(false);
    }
  };

  const getPaymentStatus = async (voterId) => {
    try {
      const query = voterId;
      const page = 1;
      const perPage = 10000000;

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/income-expense`,
        {
          params: {
            query,
            page,
            perPage,
          },
        },
      );

      const {allIncomeExpense} = response.data;
      const filteredArray = allIncomeExpense.map((x) => x.myArrayField);

      const arr =
        filteredArray[0] === undefined
          ? 'dfmndksndf'
          : filteredArray.map(getValuesOfMemberFee);

      console.log(arr, 'arr');

      // Flatten the array of arrays to get a single array
      const flattenedArray = arr.flat();

      console.log(flattenedArray, 'flattenedArray');

      // Calculate the total amount from the flattened array
      const totalAmount = flattenedArray.reduce(
        (total, item) => total + parseFloat(item?.amount || 0),
        0,
      );

      console.log('Total Amount:', totalAmount);
      setTotalAmount(totalAmount);
      setMembers(allIncomeExpense);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  // Define a separate function to get the values where description is "মেম্বার ফি"
  const getValuesOfMemberFee = (array) => {
    let valuesArray = [];
    array.forEach((item) => {
      if (item.description === 'মেম্বার ফি') {
        valuesArray.push(item); // Push the entire item object if it matches the description
      }
    });
    return valuesArray.length > 0 ? valuesArray : null; // Return null if no matching items found
  };

  useEffect(() => {
    if (member?.voterId) {
      getPaymentStatus(member.voterId);
    }
  }, [member]);

  useEffect(() => {
    getMember();
    getUserProfileImage();
    getNomineeProfileImage();
  }, []);

  return (
    <div>
      <AppCard>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Typography variant='h3' mb={5}>
            Member Details
          </Typography>
          {member?.activeStatus == true ? (
            <Button
              variant='outlined'
              color='primary'
              onClick={handleUpdateMember}
              sx={{margin: '5px'}}
            >
              <GrStatusWarning
                style={{color: 'lightblue', marginRight: '5px'}}
              />{' '}
              {'সদস্য বাতিল'}
            </Button>
          ) : (
            <Button
              variant='outlined'
              color='primary'
              onClick={handleUpdateMember}
              sx={{margin: '5px'}}
            >
              <GoHeart style={{color: 'lightblue', marginRight: '5px'}} />{' '}
              {'সদস্য একটিভ'}
            </Button>
          )}
        </div>

        <hr />
        {loading ? (
          <Skeleton variant='rectangular' width={700} height={800} />
        ) : (
          <>
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
              <div>
                <Typography variant='h5' mb={2} style={{textAlign: 'center'}}>
                  মেম্বার ছবি
                </Typography>
                {imageLoading ? (
                  <Skeleton variant='rectangular' width={200} height={200} />
                ) : (
                  profileImage && (
                    <img
                      src={profileImage}
                      alt='Member'
                      style={{width: 200, height: 200}}
                    />
                  )
                )}
              </div>
              <div>
                <Typography variant='h5' mb={2} style={{textAlign: 'center'}}>
                  নোমিনীর ছবি
                </Typography>
                {nomineeImageLoading ? (
                  <Skeleton variant='rectangular' width={200} height={200} />
                ) : (
                  nomineeImage && (
                    <img
                      src={nomineeImage}
                      alt='Nominee'
                      style={{width: 200, height: 200}}
                    />
                  )
                )}
              </div>
            </div>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>
                আবেদনকারীর নাম: {member.name}
              </Typography>
            </div>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>
                জমাকৃত টাকার পরিমান : {totalAmount} টাকা
              </Typography>
            </div>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>
                সদস্য নাম্বার: {member.memberId}
              </Typography>
            </div>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>জন্ম: {member.date_of_birth}</Typography>
            </div>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>
                সদস্য স্টেটাস :{' '}
                <ActiveStatus
                  status={member?.activeStatus === true ? 'active' : 'inactive'}
                />
              </Typography>
            </div>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>
                পিতার নাম: {member.fatherName}
              </Typography>
            </div>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>
                মাতার নাম: {member.motherName}
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
              <Typography variant='h4'>বয়স: {member.age}</Typography>
            </div>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>
                শিক্ষাগত যোগ্যতা: {member.education}
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
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>
                অভিভাবক নাম: {member.guardianName}
              </Typography>
            </div>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>
                অভিভাবক সম্পর্ক: {member.relationship}
              </Typography>
            </div>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>
                নমিনির নাম: {member.nomineeName}
              </Typography>
            </div>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>
                নমিনির ঠিকানা: {member.nomineeAddress}
              </Typography>
            </div>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>
                সনাক্তকারি সদস্যর নাম: {member.identificationMemberName}
              </Typography>
            </div>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>
                সনাক্তকারি সদস্যর ঠিকানাঃ {member.identificationMemberAddress}
              </Typography>
            </div>
          </>
        )}
      </AppCard>

      <AppCard style={{marginTop: '20px'}}>
        <MemberPaymentList customerDetails={members} />
      </AppCard>
    </div>
  );
}
