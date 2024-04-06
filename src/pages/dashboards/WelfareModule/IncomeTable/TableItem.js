import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
// import Box from '@mui/material/Box';
// import CustomerAppMenuList from '../../CustomerAppMenuList/CustomerAppMenuList';
// import Avatar from '@mui/material/Avatar';
// import {Fonts} from 'shared/constants/AppEnums';
// import {Link as RouterLink} from 'react-router-dom';
// import Link from '@mui/material/Link';
// import ActiveStatus from '@crema/common/ActiveStatus';
import RentalAppMenuList from '../RentalAppMenuList/RentalAppMenuList';
// import moment from 'moment';
// import CustomerStatus from 'common/statusChip/CustomerStatus';

const TableItem = ({data}) => {
  return (
    <TableRow
      key={data.id}
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
        {data?.payment_type ? data?.payment_type : 'N/A'}
      </TableCell>
      <TableCell align='left' className='tableCell'>
        {data?.payment_type ? data?.payment_type : 'N/A'}
      </TableCell>
      <TableCell align='left' className='tableCell'>
        {data?.card_number ? data?.card_number : 'N/A'}
      </TableCell>
      <TableCell>
        <RentalAppMenuList id={data.memberId} />
      </TableCell>
    </TableRow>
  );
};

export default TableItem;

TableItem.propTypes = {
  data: PropTypes.object.isRequired,
};
