import {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {Typography, Skeleton, Button} from '@mui/material';
import ActiveStatus from '@crema/common/ActiveStatus';
import AppCard from '@crema/core/AppCard';
import {GrStatusWarning} from 'react-icons/gr';
import {GoHeart} from 'react-icons/go';


export default function MemberDetails() {
  const {id} = useParams();
  const [member, setMember] = useState({});
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [nomineeImage, setNomineeImage] = useState(null);
  const [nomineeImageLoading, setNomineeImageLoading] = useState(true);

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
    console.log(id);
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
      // Handle successful update
      console.log(response.data);
    } catch (error) {
      // Handle error
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
              <GrStatusWarning style={{color:'lightblue', marginRight:'5px'}}/> {'সদস্য বাতিল'}
            </Button>
          ) : (
            <Button
              variant='outlined'
              color='primary'
              onClick={handleUpdateMember}
              sx={{margin: '5px'}}
            >
               <GoHeart style={{color:'lightblue', marginRight:'5px'}}/> {'সদস্য একটিভ'}
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
                  User Photo
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
                  Nominee Photo
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
                সদস্য নাম্বার: {member.memberId}
              </Typography>
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
    </div>
  );
}
