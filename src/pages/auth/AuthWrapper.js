import React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import {Typography} from '@mui/material';
import {Fonts} from 'shared/constants/AppEnums';

const AuthWrapper = ({children}) => {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card
        sx={{
          maxWidth: 900,
          minHeight: {xs: 320, sm: 450},
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
        }}
      >
        <Box
          sx={{
            width: {xs: '100%', sm: '50%', lg: '40%'},
            padding: {xs: 5, lg: 10},
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {children}
        </Box>
        <Box
          sx={{
            width: {xs: '100%', sm: '50%', lg: '60%'},
            position: 'relative',
            padding: {xs: 5, lg: 10},
            display: {xs: 'none', sm: 'flex'},
            alignItems: {sm: 'center'},
            justifyContent: {sm: 'center'},
            flexDirection: {sm: 'column'},
            backgroundImage:
              "url('https://tfe-bd.sgp1.cdn.digitaloceanspaces.com/uploads/1608002874.jpg')", // Provide the link to your image
            backgroundSize: 'cover', // Optional: Adjust the background size
            backgroundPosition: 'center', // Optional: Adjust the background position
            color: (theme) => theme.palette.common.white,
            fontSize: 14,
            '::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the opacity as needed
              backdropFilter: 'blur(2px)',
              zIndex: 1,
            },
          }}
        >
          <Box
            sx={{
              maxWidth: 320,
              position: 'relative', // Ensure child elements are positioned relative to this container
              zIndex: 2, // Place child elements above the overlay
            }}
          >
            <Typography
              component='h2'
              sx={{
                fontWeight: Fonts.BOLD,
                fontSize: 30,
                mb: 4,
              }}
            >
              Bangladesh Bridge Toll Fixation App
            </Typography>
            <Typography
              component='h5'
              sx={{
                fontWeight: Fonts.BOLD,
                fontSize: 18,
                mb: 4,
              }}
            >
              {/* Admin Dashboard App */}
            </Typography>
            <Typography
              component='h5'
              sx={{
                fontWeight: Fonts.BOLD,
                fontSize: 12,
                mb: 4,
              }}
            >
              {/* Developed By - TechWave Limited */}
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default AuthWrapper;

AuthWrapper.propTypes = {
  children: PropTypes.node,
};
