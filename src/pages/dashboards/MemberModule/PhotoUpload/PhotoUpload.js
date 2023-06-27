import React, {useState} from 'react';
import './PhotoUpload.css';
import axios from 'axios';
import PropTypes from 'prop-types';

const PhotoUpload = ({id}) => {
  const [userPhoto, setUserPhoto] = useState(null);
  const [nomineePhoto, setNomineePhoto] = useState(null);

  const handleUserPhotoUpload = (event) => {
    const memberId = id;
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    formData.append('memberId', memberId);

    axios
      .post('http://localhost:5000/members/upload', formData)
      .then((response) => {
        const imageUrl = response.data.imageUrl; // Modify this line based on the actual response from the server
        setUserPhoto(imageUrl);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleNomineePhotoUpload = (event) => {
    const file = event.target.files[0];
    resizeImage(file, setNomineePhoto);
  };

  const resizeImage = (file, setImage) => {
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new Image();
      img.src = event.target.result;
      img.onload = function () {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const MAX_SIZE = 2 * 300; // 2 inches at 300 DPI
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_SIZE) {
            height *= MAX_SIZE / width;
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width *= MAX_SIZE / height;
            height = MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          const resizedFile = new File([blob], file.name, {
            type: file.type,
            lastModified: Date.now(),
          });
          setImage(URL.createObjectURL(resizedFile));
        }, file.type);
      };
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className='photo-upload-container'>
      <div className='photo-upload-item'>
        <h3>User Photo</h3>
        {userPhoto ? (
          <img src={userPhoto} alt='User Photo' className='uploaded-photo' />
        ) : (
          <p>No user photo uploaded</p>
        )}
        <br />
        <input type='file' accept='image/*' onChange={handleUserPhotoUpload} />
      </div>

      <div className='photo-upload-item'>
        <h3>Nominee Photo</h3>
        {nomineePhoto ? (
          <img
            src={nomineePhoto}
            alt='Nominee Photo'
            className='uploaded-photo'
          />
        ) : (
          <p>No nominee photo uploaded</p>
        )}
        <br />
        <input
          type='file'
          accept='image/*'
          onChange={handleNomineePhotoUpload}
        />
      </div>
    </div>
  );
};

PhotoUpload.propTypes = {
    id: PropTypes.string.isRequired,
  };

export default PhotoUpload;
