import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Link as RouterLink} from 'react-router-dom';
import Link from '@mui/material/Link';
import PropTypes from 'prop-types';
import {BiCreditCardAlt} from 'react-icons/bi';

const options = [
  {
    label: 'বিস্তারিত দেখুন',
    url: (id) => `/dashboard/member-details/${id}`,
  },
  {
    label: 'এডিট করুন',
    url: (id) => `/dashboard/edit-member/${id}`,
  },
];
const MemberAppMenuList = ({id}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        style={{height: 30, width: 30}}
        aria-label='more'
        onClick={handleClick}
        size='large'
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id='long-menu'
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        {options.map((option) => (
          <MenuItem key={option.label} onClick={handleClose}>
            <Link component={RouterLink} to={option.url(id)} underline='none'>
              <BiCreditCardAlt style={{marginRight:'5px'}}/>
              {option.label}
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default MemberAppMenuList;

MemberAppMenuList.propTypes = {
  id: PropTypes.number.isRequired,
};
