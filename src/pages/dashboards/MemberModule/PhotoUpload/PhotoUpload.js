import React, { useState } from 'react';
import './PhotoUpload.css';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Snackbar, Alert } from '@mui/material';

const PhotoUpload = ({ id }) => {
  const [userPhoto, setUserPhoto] = useState(null);
  const [nomineePhoto, setNomineePhoto] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleUserPhotoUpload = async (event) => {
    const memberId = id;
    const imagetype = 'user';
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    formData.append('memberId', memberId);
    formData.append('imagetype', imagetype);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/members/upload`,
        formData
      );

      const imageUrl = response.data.imageUrl;
      setUserPhoto(imageUrl);
      showSnackbar('success', 'User photo uploaded successfully');
    } catch (error) {
      console.log(error);
      showSnackbar('error', 'Failed to upload user photo');
    }
  };

  const handleNomineePhotoUpload = async (event) => {
    const memberId = id;
    const imagetype = 'nominee';
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    formData.append('memberId', memberId);
    formData.append('imagetype', imagetype);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/members/upload`,
        formData
      );

      const imageUrl = response.data.imageUrl;
      setNomineePhoto(imageUrl);
      showSnackbar('success', 'Nominee photo uploaded successfully');
    } catch (error) {
      console.log(error);
      showSnackbar('error', 'Failed to upload nominee photo');
    }
  };

  const showSnackbar = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="photo-upload-container">
      <div className="photo-upload-item">
        <h3>User Photo</h3>
        {userPhoto ? (
          <>
            <img src={userPhoto} alt="User Photo" className="uploaded-photo" />
            <br />
            <small>Uploaded User Photo</small>
          </>
        ) : (
          <>
            <div className="image-placeholder" />
            <br />
            <small>No user photo uploaded</small>
          </>
        )}
        <br />
        <input
          type="file"
          accept="image/*"
          onChange={handleUserPhotoUpload}
        />
      </div>

      <div className="photo-upload-item">
        <h3>Nominee Photo</h3>
        {nomineePhoto ? (
          <>
            <img
              src={nomineePhoto}
              alt="Nominee Photo"
              className="uploaded-photo"
            />
            <br />
            <small>Uploaded Nominee Photo</small>
          </>
        ) : (
          <>
            <div className="image-placeholder" />
            <br />
            <small>No nominee photo uploaded</small>
          </>
        )}
        <br />
        <input
          type="file"
          accept="image/*"
          onChange={handleNomineePhotoUpload}
        />
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

PhotoUpload.propTypes = {
  id: PropTypes.string.isRequired,
};

export default PhotoUpload;
