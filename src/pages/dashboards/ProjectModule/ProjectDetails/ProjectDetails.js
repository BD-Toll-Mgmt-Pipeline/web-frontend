import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {
  Typography,
  Skeleton,
  Button,
  Snackbar,
  Alert,
  TextField,
} from '@mui/material';
import ActiveStatus from '@crema/common/ActiveStatus';
import AppCard from '@crema/core/AppCard';
import {GrStatusWarning} from 'react-icons/gr';
import moment from 'moment';
import { MdCreate } from 'react-icons/md';

export default function ProjectDetails() {
  const {id} = useParams();
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [projectDetails, setProjectDetails] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const getMember = async () => {
    let memberid = id;
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/project/${memberid}`,
      );
      setProject(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleChange = (e, index) => {
    const {name, value} = e.target;
    const updatedRows = [...rows];
    updatedRows[index][name] = value;
    setRows(updatedRows);
  };

  const handleSave = async () => {
    try {
      const payload = {
        projectId: project?._id,
        projectName: project?.projectName,
        projectField: rows,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/project/project-details`,
        payload,
      );

      console.log('Data sent successfully:', response.data);

      // Show success message in Snackbar
      setSnackbarMessage('তথ্য সফলভাবে সাবমিট করা হয়েছে');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error sending data:', error);

      // Show error message in Snackbar
      setSnackbarMessage('তথ্য পাঠানো সমস্যায় পরেছে');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const getProjectDetailsById = async (projectId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/project/project-details/${projectId}`,
      );
      setProjectDetails(response.data.projectField);
      setRows(response.data.projectField);
      return response.data;
    } catch (error) {
      console.error('Error fetching project details:', error);
      throw error;
    }
  };

  const handleAddRow = () => {
    if (project?.plotNumbers) {
      const nextNumber = rows.length + 1;
      if (nextNumber <= project.plotNumbers) {
        setRows([
          ...rows,
          {number: nextNumber, shareholderName: '', buyingPrice: ''},
        ]);
      } else {
        // Show a Snackbar message if the limit is reached
        setSnackbarMessage('শেয়ারহোল্ডার সীমা অতিক্রম করেছে');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleUpdateProject = async () => {
    let projectId = id;
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/project/${projectId}`,
        project?.status === 'true'
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
      console.error('Failed to update project:', error);
    }
  };

  useEffect(() => {
    getMember();
    getProjectDetailsById(project?._id);
  }, [project?._id]);

  return (
    <div>
      <AppCard>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Typography variant='h3' mb={5}>
            Project Details : {project?.projectName}
          </Typography>
          {project?.status == 'true' ? (
            <Button
              variant='outlined'
              color='primary'
              onClick={handleUpdateProject}
              sx={{margin: '5px'}}
            >
              <GrStatusWarning
                style={{color: 'lightblue', marginRight: '5px'}}
              />{' '}
              {'প্রজেক্ট শেষ করুন'}
            </Button>
          ) : (
            ''
          )}
        </div>

        <hr />
        {loading ? (
          <Skeleton variant='rectangular' width={700} height={800} />
        ) : (
          <>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>
                প্রজেক্ট অনুমোদনের তারিখ:{' '}
                {moment(project?.openDate, 'YYYY-MM-DD').format('DD-MM-YYYY')}
              </Typography>
            </div>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>
                প্রজেক্টের নাম : {project?.projectName}
              </Typography>
            </div>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>
                প্রজেক্টের ঠিকানা : {project?.projectAddress}
              </Typography>
            </div>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>
                অনুমোদিত প্লট সংখ্যা: {project?.plotNumbers}
              </Typography>
            </div>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>
                বিক্রি হওয়া প্লট সংখ্যা : {projectDetails?.length}
              </Typography>
            </div>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>
                বাকি প্লট সংখ্যা:{' '}
                {project?.plotNumbers - projectDetails?.length}
              </Typography>
            </div>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>
                স্টেটাস :{' '}
                <ActiveStatus
                  status={project?.status === 'true' ? 'running' : 'done'}
                />
              </Typography>
            </div>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>
                প্রত্যেক শেয়ার মূল্য (আনুমানিক): {project?.plotSharePrice} টাকা
              </Typography>
            </div>
          </>
        )}
      </AppCard>

      <AppCard style={{marginTop: '20px'}}>
        <Button
          variant='outlined'
          color='primary'
          onClick={handleSave}
          sx={{margin: '5px', float: 'right'}}
        >
          সেভ করুন
        </Button>
        <Button
          variant='outlined'
          color='primary'
          onClick={handleAddRow}
          sx={{margin: '5px', float: 'right'}}
        >
          <MdCreate style={{margin: '5px'}} />
          নতুন শেয়ারহোল্ডার অ্যাড করুন
        </Button>

        {rows.map((row, index) => (
          <div
            key={index}
            style={{
              marginTop: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant='h4'>শেয়ারহোল্ডার নং : {row.number}</Typography>
            <TextField
              sx={{
                padding: '10px',
                '& .MuiInputBase-input.Mui-disabled': {
                  WebkitTextFillColor: '#000000',
                },
              }}
              type='text'
              placeholder='শেয়ারহোল্ডারের নাম'
              name='shareholderName'
              value={row.shareholderName}
              onChange={(e) => handleChange(e, index)}
              disabled={
                projectDetails &&
                projectDetails[index]?.shareholderName !== undefined
              }
            />
            <TextField
              sx={{
                padding: '10px',
                '& .MuiInputBase-input.Mui-disabled': {
                  WebkitTextFillColor: '#000000',
                },
              }}
              type='text'
              placeholder='বায়নানামায় পরিশোধিত টাকার পরিমান'
              name='buyingPrice'
              value={row.buyingPrice}
              onChange={(e) => handleChange(e, index)}
              disabled={
                projectDetails &&
                projectDetails[index]?.buyingPrice !== undefined
              }
            />
          </div>
        ))}
      </AppCard>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
      >
        <Alert severity={snackbarSeverity} onClose={handleSnackbarClose}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
