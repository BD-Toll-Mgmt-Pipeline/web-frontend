import {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {Typography, Skeleton} from '@mui/material';
// import ActiveStatus from '@crema/common/ActiveStatus';
import AppCard from '@crema/core/AppCard';
// import {GrStatusWarning} from 'react-icons/gr';
// import {GoHeart} from 'react-icons/go';
// import MemberPaymentList from '../MemberPaymentList';

export default function MemberDetails() {
  const {id} = useParams();
  const [member, setMember] = useState({});
  const [memberLoanDetails, setMemberLoanDetails] = useState({});
  const [, setTotalAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [, setImageLoading] = useState(true);
  const [, setProfileImage] = useState(null);
  const [, setNomineeImage] = useState(null);
  const [, setNomineeImageLoading] = useState(true);
  const [, setMembers] = useState([]);

  const getMember = async () => {
    // let memberid = "662b3b552c4e034b60975139";
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/get-payment/662b477fc2b865d1458eaa4c`,
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

  // const handleUpdateMember = async () => {
  //   let memberid = id;
  //   try {
  //     const response = await axios.put(
  //       `${process.env.REACT_APP_BASE_URL}/api/get-payment/${memberid}`,
  //       member?.activeStatus === true
  //         ? {
  //             activeStatus: 'false',
  //           }
  //         : {
  //             activeStatus: 'true',
  //           },
  //     );
  //     window.location.reload();
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error('Failed to update member:', error);
  //   }
  // };

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
            Payment Details
          </Typography>
          {/* <Button
            variant='outlined'
            color='primary'
            onClick={handlePrint}
            sx={{margin: '5px'}}
          >
            Print Member Details
          </Button> */}
        </div>

        <hr />
        <div id='printable-content'>
          {loading ? (
            <Skeleton variant='rectangular' width={700} height={800} />
          ) : (
            <>
              <div style={{marginTop: '10px'}}>
                <Typography variant='h4'>
                  Payment Method: {member.payment_type}
                </Typography>
              </div>
              <div style={{marginTop: '10px'}}>
                <Typography variant='h4'>
                Card Number/Acc Number : {member.card_number}
                </Typography>
              </div>
              <div style={{marginTop: '10px'}}>
                <Typography variant='h4'>
                  Avialable Balance: {member.balance + " Tk"} 
                </Typography>
              </div>
              <div style={{marginTop: '10px'}}>
                <Typography variant='h4'>
                  Vehicle Number: {member.vehicle_number}
                </Typography>
              </div>
            </>
          )}
        </div>
      </AppCard>
{/* 
      <AppCard style={{marginTop: '20px'}}>
        <MemberPaymentList customerDetails={members} />
      </AppCard> */}
    </div>
  );
}
