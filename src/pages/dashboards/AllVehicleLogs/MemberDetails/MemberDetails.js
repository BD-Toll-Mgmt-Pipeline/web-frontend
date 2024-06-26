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
  const [memberLoanDetails, setMemberLoanDetails] = useState({});
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

  // const handlePrint = () => {
  //   // Create a new window for printing
  //   const printWindow = window.open('', '_blank');

  //   // Define the content you want to print
  //   const contentToPrint = document.getElementById('printable-content');

  //   // Write the content to the new window
  //   printWindow.document.open();
  //   printWindow.document.write(`
  //     <html>
  //       <head>
  //         <title>Print Member Details</title>
  //       </head>
  //       <body>
  //         <div>
  //           ${contentToPrint.innerHTML}
  //         </div>
  //       </body>
  //     </html>
  //   `);

  //   // Close the document and trigger printing
  //   printWindow.document.close();
  //   printWindow.print();
  //   printWindow.close();
  // };

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

  const getMemberLoanDetails = async (memberid) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/loan/${memberid}`,
      );
      setMemberLoanDetails(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  console.log(memberLoanDetails, 'memberLoanDetails');

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

  const getValuesOfMemberFee = (array) => {
    let valuesArray = [];
    array.forEach((item) => {
      if (item.description === 'আমানত') {
        valuesArray.push(item); // Push the entire item object if it matches the description
      }
    });
    return valuesArray.length > 0 ? valuesArray : null; // Return null if no matching items found
  };

  useEffect(() => {
    if (member?.voterId) {
      getPaymentStatus(member.voterId);
      getMemberLoanDetails(member.memberId);
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
            Vehicle Details
          </Typography>
          {/* <Button
            variant='outlined'
            color='primary'
            onClick={handlePrint}
            sx={{margin: '5px'}}
          >
            Print Member Details
          </Button> */}
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
              {'Active'}
            </Button>
          )}
        </div>

        <hr />
        <div id='printable-content'>
          {loading ? (
            <Skeleton variant='rectangular' width={700} height={800} />
          ) : (
            <>
              <div style={{marginTop: '10px'}}>
                <Typography variant='h4'>
                  আবেদনকারীর নাম: {member.name}
                </Typography>
              </div>
              <div style={{marginTop: '10px'}}>
                <Typography variant='h4'>
                  সদস্য নম্বার: {member.memberId}
                </Typography>
              </div>
              <div style={{marginTop: '10px'}}>
                <Typography variant='h4'>
                  জাতীয় পরিচয়পত্র নম্বর (NID): {member.voterId}
                </Typography>
              </div>
              <div style={{marginTop: '10px'}}>
                <Typography variant='h4'>
                  জন্ম: {member.date_of_birth}
                </Typography>
              </div>
              <div style={{marginTop: '10px'}}>
                <Typography variant='h4'>
                  মোবাইল নাম্বার: {member.phone}
                </Typography>
              </div>
              <div style={{marginTop: '10px'}}>
                <Typography variant='h4'>
                  সঞ্চিত টাকার (আমানত) পরিমান : {totalAmount ? totalAmount : 0}{' '}
                  টাকা
                </Typography>
              </div>
              {memberLoanDetails?.status == 'permitted' ? (
                <div style={{marginTop: '10px'}}>
                  <Typography variant='h4'>
                    কর্জে হাসনা কৃত টাকার পরিমান : {memberLoanDetails?.reqMoney}{' '}
                    টাকা
                  </Typography>
                </div>
              ) : (
                ''
              )}

              <div style={{marginTop: '10px'}}>
                <Typography variant='h4'>
                  সদস্য স্টেটাস :{' '}
                  <ActiveStatus
                    status={
                      member?.activeStatus === true ? 'active' : 'inactive'
                    }
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
                  সনাক্তকারি সদস্য নম্বার: {member.identificationMemberAddress}
                </Typography>
              </div>
            </>
          )}
        </div>
      </AppCard>

      <AppCard style={{marginTop: '20px'}}>
        <MemberPaymentList customerDetails={members} />
      </AppCard>
    </div>
  );
}
