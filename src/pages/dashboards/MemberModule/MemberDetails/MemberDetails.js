import AppCard from '@crema/core/AppCard';
import {Typography, Skeleton} from '@mui/material';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ActiveStatus from '@crema/common/ActiveStatus';
import {useParams} from 'react-router-dom';

export default function MemberDetails() {
  const {id} = useParams();
  const [member, setMember] = useState({});
  const [loading, setLoading] = useState(true);
  console.log(member);

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

  useEffect(() => {
    getMember();
  }, []);

  return (
    <div>
      <AppCard>
        <Typography variant='h3' mb={5}>
          Member Details
        </Typography>
        <hr />
        {loading ? (
          <Skeleton variant='rectangular' width={200} height={30} />
        ) : (
          <>
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
                সনাক্তকারি সদস্যর ঠিকানাঃ: {member.identificationMemberAddress}
              </Typography>
            </div>
          </>
        )}
      </AppCard>
    </div>
  );
}
