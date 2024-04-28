import React, {useState, useEffect} from 'react';
import {TextField, Grid, Paper, Typography} from '@mui/material';
import axios from 'axios';
import FromDate from '../FromDate/FromDate';
const moment = require('moment');
import {useParams} from 'react-router-dom';

const EditRoshed = () => {
  const [rows, setRows] = useState([{number: 1, description: '', amount: ''}]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [roshidNo, setRoshidNo] = useState(0);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [voterId, setVoterId] = useState('');
  const [memberId, setMemberId] = useState('');
  const [currentAddress, setCurrentAddress] = useState('');
  const [date, setDate] = useState('');
  const [memberSearch, setMemberSearch] = useState('');
  const [incomeTypes, setIncomeTypes] = useState([]);

  const {id} = useParams();

  const getIncomeTypes = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/income-expense/income-types`,
    );
    setIncomeTypes(response.data.data);
  };

  const searchMemberbyID = async (id) => {
    try {
      const query = id;
      const page = 1;
      const perPage = 10;

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/members/findMember-exact-match`,
        {
          params: {
            query,
            page,
            perPage,
          },
        },
      );
      setMemberSearch(response.data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const calculateTotalAmount = () => {
    const sum = rows.reduce((total, row) => {
      return total + parseFloat(row.amount || 0);
    }, 0);
    setTotalAmount(sum);
  };

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
    calculateTotalAmount();
  };

  const generateNo = () => {
    const timestamp = moment().format('YYMMDDHHmmss');
    const voucherNumber = `R${timestamp}`;
    setRoshidNo(voucherNumber);
  };

  useEffect(() => {
    getIncomeTypes();
    if (memberSearch?.members) {
      setName(memberSearch?.members[0]?.name);
      setPhone(memberSearch?.members[0]?.phone);
      setCurrentAddress(memberSearch?.members[0]?.permanentAddress);
      setVoterId(memberSearch?.members[0]?.voterId);
      setMemberId(id);


    }
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // Get date in 'YYYY-MM-DD' format
    setDate(formattedDate);
  }, [memberSearch]);

  useEffect(() => {
    generateNo();
    searchMemberbyID(id);
  }, []);

  return (
    <Grid container justifyContent='center'>
      <Grid item xs={12} sm={8} md={6}>
        <Paper elevation={3} sx={{p: 4}}>
          <hr />
          <Typography
            sx={{textAlign: 'center', margin: '10px'}}
            variant='h2'
            mb={4}
          >
            আনসারুল মুসলিমীন বহুমূখী সমবায় সমিতি লি: <br />
            Toll MUSLIMIN BAHUMUKHI SAMABAY SAMITY LTD.
          </Typography>
          <Typography sx={{textAlign: 'center'}} mb={4}>
            ১-জি, ১/১, চিড়িয়াখানা রোড, মিরপুর-১, ঢাকা-১২১৬ <br />
            গভ: রেজি: নং-১২৮/৯৮
            <br />
            ফোন-৮০২১৬৩৬
          </Typography>
          <Typography
            sx={{
              textAlign: 'center',
              backgroundColor: 'black',
              color: 'white',
              borderRadius: '10px',
            }}
            mb={5}
          >
            রসিদ
          </Typography>
          <Typography>রসিদ নং - {roshidNo}</Typography>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div style={{margin: '10px'}}>
              <TextField
                label='নাম'
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{margin: '10px'}}
              />
              <TextField
                label='সদস্য আইডি'
                value={memberId}
                onChange={(e) => {
                  setMemberId(e.target.value);
                }}
                sx={{margin: '10px'}}
              />
            </div>
            <div style={{margin: '10px'}}>
              <TextField
                label='সংক্ষিপ্ত ঠিকানা'
                value={currentAddress}
                onChange={(e) => setCurrentAddress(e.target.value)}
                sx={{margin: '10px'}}
              />
              <TextField
                // label='Date'
                type='date'
                value={date}
                onChange={(e) => setDate(e.target.value)}
                sx={{margin: '10px'}}
              />
            </div>
          </div>
          <div style={{marginLeft: '10px', display: 'flex'}}>
            <TextField
              label='ফোন'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              sx={{margin: '10px'}}
            />
            <TextField
              label='জাতীয় পরিচয়পত্র নম্বর (NID)আইডি'
              value={voterId}
              onChange={(e) => setVoterId(e.target.value)}
              sx={{margin: '10px'}}
            />
          </div>
          <hr style={{margin: '10px'}} />
          <Typography>মাস হইতে</Typography>
          <br />
          <FromDate />
          <br />
          <Typography>মাস পর্যন্ত</Typography>
          <br />
          <hr style={{margin: '10px'}} />
          <Grid
            container
            spacing={2}
            mb={4}
            mt={4}
            sx={{textAlign: 'center', padding: '10px'}}
          >
            <Grid item xs={2}>
              <Typography
                variant='h3'
                component='h2'
                sx={{backgroundColor: 'black', color: 'white'}}
              >
                ক্র: নং:
              </Typography>
              {rows.map((row, index) => (
                <TextField key={index} value={row.number} disabled />
              ))}
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant='h3'
                component='h2'
                sx={{backgroundColor: 'black', color: 'white'}}
              >
                বিবরণ
              </Typography>
              {rows.map((row, index) => (
                <select
                  key={index}
                  value={row.description}
                  onChange={(e) =>
                    handleRowChange(index, 'description', e.target.value)
                  }
                  style={{width: '100%', height: '50px', marginBottom: '5px'}}
                >
                  <option value=''>বিবরণ নির্বাচন করুন</option>
                  {incomeTypes.map((option, optionIndex) => (
                    <option key={optionIndex} label={option.label}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ))}
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant='h3'
                component='h2'
                sx={{backgroundColor: 'black', color: 'white'}}
              >
                টাকার পরিমাণ
              </Typography>
              {rows.map((row, index) => (
                <TextField
                  key={index}
                  value={row.amount}
                  onChange={(e) =>
                    handleRowChange(index, 'amount', e.target.value)
                  }
                  type='number'
                  inputProps={{min: 0}}
                />
              ))}
            </Grid>
          </Grid>
          <div style={{textAlign: 'right', margin: '20px'}}>
            <Typography>মোট টাকা: {totalAmount}</Typography>
          </div>
          <hr />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '20px',
            }}
          ></div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default EditRoshed;
