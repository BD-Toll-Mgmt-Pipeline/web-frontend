import React from 'react';
import {Box} from '@mui/material';
import logoImage from '../../../../../assets/icon/logo.png';

const AppLogo = () => {
  return (
    <Box
      sx={{
        height: {xs: 56, sm: 70},
        padding: 2.5,
        display: 'flex',
        flexDirection: 'row',
        cursor: 'pointer',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      className='app-logo'
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <img
          src={logoImage}
          alt='Logo'
          style={{
            height: '100px',
            maxWidth: '100%',
            marginLeft: '80px',
            maxHeight: {xs: 40, sm: 45},
          }}
        />
      </div>
    </Box>
  );
};

export default AppLogo;
