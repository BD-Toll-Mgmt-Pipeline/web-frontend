import React, {useState, useEffect} from 'react';
import {TextField, Grid, Paper, Typography} from '@mui/material';
import axios from 'axios';
import {useParams} from 'react-router-dom';

const EditRoshid = () => {
  const [rows, setRows] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [name, setName] = useState('');
  const [memberId, setMemberId] = useState('');
  const [currentAddress, setCurrentAddress] = useState('');
  const [date, setDate] = useState('');
  const [descriptionOptions, setDescriptionOptions] = useState([]);
  const {id} = useParams();

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

  const getRoshidStatus = async (voterId) => {
    try {
      const query = voterId;
      const page = 1;
      const perPage = 10;

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
      const lastEntry = allIncomeExpense[allIncomeExpense.length - 1];

      setName(lastEntry?.name || '');
      setMemberId(lastEntry?.memberId || '');
      setDate(lastEntry?.date || '');
      setDescriptionOptions(allIncomeExpense || []);

      const rowsArray = allIncomeExpense
        ?.map((x) => x.myArrayField)
        ?.map((nestedOption, index) => ({
          number: index + 1,
          description:
            nestedOption.map((option) => option.description).join(', ') || '',
          amount: nestedOption[0]?.amount || '',
        }));

      setRows(rowsArray);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    getRoshidStatus(id);
  }, []);

  // const handleSubmit = async () => {
  //   console.log('Helloooooooooo');
  // };

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
            ANSARUL MUSLIMIN BAHUMUKHI SAMABAY SAMITY LTD.
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
          <Typography>রসিদ নং - 46838</Typography>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div style={{margin: '10px'}}>
              <TextField
                label='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label='Member ID'
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
              />
            </div>
            <div style={{margin: '10px'}}>
              <TextField
                label='Address'
                value={currentAddress}
                onChange={(e) => setCurrentAddress(e.target.value)}
              />
              <TextField
                label='Date'
                type='date'
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
          <Grid container spacing={2} mb={4} mt={4} sx={{textAlign: 'center'}}>
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
                <TextField
                  key={index}
                  value={row.description}
                  onChange={(e) =>
                    handleRowChange(index, 'description', e.target.value)
                  }
                  select
                  style={{width: '100%', height: '50px', marginBottom: '5px'}}
                >
                  <option value=''>বিবরণ নির্বাচন করুন</option>
                  {descriptionOptions.flatMap((option, optionIndex) =>
                    option.myArrayField.map((nestedOption, nestedIndex) => (
                      <option
                        key={`${optionIndex}-${nestedIndex}`}
                        value={nestedOption.description}
                      >
                        {nestedOption.description}
                      </option>
                    )),
                  )}
                </TextField>
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
            <Typography>মোট টাকার পরিমাণ: {totalAmount}</Typography>
          </div>
          <hr />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default EditRoshid;
