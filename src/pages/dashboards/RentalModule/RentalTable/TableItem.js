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
import ActiveStatus from '@crema/common/ActiveStatus';
import RentalAppMenuList from '../RentalAppMenuList/RentalAppMenuList';
import moment from 'moment';
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
        {data?.vehicle_class ? data?.vehicle_class : 'N/A'}
      </TableCell>
      <TableCell align='left' className='tableCell'>
        {data?.vehicle_number ? data?.vehicle_number : 'N/A'}
      </TableCell>

      <TableCell align='left' className='tableCell'>
        <Box
          sx={{
            fontWeight: Fonts.MEDIUM,
          }}
        >
          <Link
            component={RouterLink}
            to={`/dashboard/rental-details/${data?.voterId}`}
            underline='none'
          >
            {data.name}
          </Link>
        </Box>
      </TableCell>

      <TableCell align='left' className='tableCell'>
        <Link
          component={RouterLink}
          to={`/dashboard/rental-details/${data?.voterId}`}
          underline='none'
        >
          {moment(data?.date, 'YYYY-MM-DD').format('DD-MM-YYYY')}
        </Link>
      </TableCell>

      <TableCell align='left' className='tableCell'>
        {data.phone}
      </TableCell>

      <TableCell align='left' className='tableCell'>
        <ActiveStatus
          status={data?.status === 'true' ? 'active' : 'inactive'}
        />
      </TableCell>
      <TableCell>
        <RentalAppMenuList id={data} />
      </TableCell>
    </TableRow>
  );
};

export default TableItem;

TableItem.propTypes = {
  data: PropTypes.object.isRequired,
};
