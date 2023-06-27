import React from 'react';
import Chip from '@mui/material/Chip';
import PropTypes from 'prop-types';

const CustomChip = ({label, type}) => {
  if (type === 'success') {
    return (
      <Chip
        component={'span'}
        label={label}
        variant='filled'
        size='small'
        sx={{
          color: '#1F8A70',
          background: '#DDF7E3',
          border: '1px solid #1F8A70',
          fontWeight: 'bold',
          // padding: '0 12px',
        }}
      />
    );
  }

  if (type === 'warning') {
    return (
      <Chip
        component={'span'}
        label={label}
        variant='filled'
        size='small'
        sx={{
          color: '#F99417',
          background: '#ffe9d1',
          border: '1px solid #f99417',
          fontWeight: 'bold',
          // padding: '0 12px',
        }}
      />
    );
  }

  if (type === 'error') {
    return (
      <Chip
        component={'span'}
        label={label}
        variant='filled'
        size='small'
        sx={{
          color: '#DC0000',
          background: '#ffc4c4',
          border: '1px solid #DC0000',
          fontWeight: 'bold',
          // padding: '0 12px',
        }}
      />
    );
  }

  return (
    <Chip
      component={'span'}
      label={label}
      variant='filled'
      size='small'
      sx={{
        color: '#146C94',
        background: '#d1f3ff',
        border: '1px solid #146C94',
        fontWeight: 'bold',
        // padding: '0 12px',
      }}
    />
  );
};

export default CustomChip;

CustomChip.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
};
