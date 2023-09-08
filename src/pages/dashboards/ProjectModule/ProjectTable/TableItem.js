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
  console.log(data, 'data table');
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
        <Link
          component={RouterLink}
          to={`/dashboards/project-details/${data?._id}`}
          underline='none'
        >
          {moment(data?.openDate, 'YYYY-MM-DD').format('DD-MM-YYYY')}
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
            to={`/dashboards/project-details/${data?._id}`}
            underline='none'
          >
            {data?.projectName}
          </Link>
        </Box>
      </TableCell>
      <TableCell align='left' className='tableCell'>
        {data?.projectAddress}
      </TableCell>
      <TableCell align='left' className='tableCell'>
        {data.plotNumbers}
      </TableCell>
      <TableCell align='left' className='tableCell'>
        {data.plotSharePrice}
      </TableCell>
      <TableCell align='left' className='tableCell'>
        <ActiveStatus
          status={data?.status === "true" ? 'running' : 'done'}
        />
      </TableCell>
      <TableCell>
        <RentalAppMenuList id={data._id} />
      </TableCell>
    </TableRow>
  );
};

export default TableItem;

TableItem.propTypes = {
  data: PropTypes.object.isRequired,
};
