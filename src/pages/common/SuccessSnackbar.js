import React, {useState, useEffect} from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import PropTypes from 'prop-types';

const Snack = ({message, open, onClose, severity}) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsOpen(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={handleClose}
      style={{fontSize: '16px'}}
    >
      <MuiAlert
        onClose={handleClose}
        severity={severity}
        style={{fontSize: '18px', width: '300px'}}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

Snack.propTypes = {
  message: PropTypes.string.isRequired,
  severity: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired, // Use the open prop
  onClose: PropTypes.func.isRequired,
};

export default Snack;
