import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
// import CustomerAppMenuList from '../../CustomerAppMenuList/CustomerAppMenuList';
// import Avatar from '@mui/material/Avatar';
import {Fonts} from 'shared/constants/AppEnums';
import {Link as RouterLink} from 'react-router-dom';
import Link from '@mui/material/Link';
// import CustomerStatus from 'common/statusChip/CustomerStatus';

const TableItem = ({data}) => {
  return (
    <TableRow
      key={data.name}
      sx={{
        '& .tableCell': {
          fontSize: 13,
          padding: 2,
          whiteSpace: 'nowrap',
          '&:first-of-type': {
            pl: 5,
          },
          '&:last-of-type': {
            pr: 5,
          },
        },
      }}
      className='item-hover'
    >
      <TableCell align='left' className='tableCell'>
        <Link
          component={RouterLink}
          to={`/dashboard/edit-member/${data.memberId}`}
          underline='none'
        >
          {data?.memberId}
        </Link>
      </TableCell>
      <TableCell align='left' className='tableCell'>
        <Box
          sx={{
            fontWeight: Fonts.MEDIUM,
          }}
        >
          <Link
            component={RouterLink}
            to={`/dashboard/edit-member/${data.memberId}`}
            underline='none'
          >
            {data.name}
          </Link>
        </Box>
      </TableCell>
      <TableCell align='left' className='tableCell'>
        {data.phone}
      </TableCell>
      <TableCell align='left' className='tableCell'>
        {data.fatherName}
      </TableCell>
      <TableCell align='left' className='tableCell'>
        {data.status}
      </TableCell>
      <TableCell align='left' className='tableCell'>
        {data.status}
        {/* <CustomerStatus status={data.status} /> */}
      </TableCell>
      <TableCell>{/* <CustomerAppMenuList id={data.id} /> */}</TableCell>
    </TableRow>
  );
};

export default TableItem;

TableItem.propTypes = {
  data: PropTypes.object.isRequired,
};
