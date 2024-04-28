import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import {Fonts} from 'shared/constants/AppEnums';
import {Link as RouterLink} from 'react-router-dom';
import Link from '@mui/material/Link';
import ActiveStatus from '@crema/common/ActiveStatus';
import MemberAppMenuList from '../MemberAppMenuList/MemberAppMenuList';
import moment from 'moment';

const TableItem = ({data}) => (
  <>
    {data.length == 0 ? (
      <TableRow>
        <TableCell colSpan={7} align='center'>
          No Log found.
        </TableCell>
      </TableRow>
    ) : (
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
            to={`/dashboard/member-details/662b477fc2b865d1458eaa4c}`}
            underline='none'
          >
            {data?.car_Full_NumberPlate?.substring(0, 5) + 'মেট্রো'}
          </Link>
        </TableCell>
        <TableCell align='left' className='t  ableCell'>
          <Link
            component={RouterLink}
            to={`/dashboard/member-details/${data._id.toString()}`}
            underline='none'
          >
            {data?.car_Full_NumberPlate?.substring(14, 36)}
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
              to={`/dashboard/member-details/662b477fc2b865d1458eaa4c`}
              underline='none'
            >
              {moment(data?.createdAt).format('DD-MM-YYYY')}
            </Link>
          </Box>
        </TableCell>
        <TableCell align='left' className='tableCell'>
          <Box
            sx={{
              fontWeight: Fonts.MEDIUM,
            }}
          >
            <Link
              component={RouterLink}
              to={`/dashboard/member-details/662b477fc2b865d1458eaa4c`}
              underline='none'
            >
              {moment(data?.createdAt).format('HH:mm:ss')}
            </Link>
          </Box>
        </TableCell>
        <TableCell align='left' className='tableCell'>
          {data?.car_type}
        </TableCell>
        <TableCell align='left' className='tableCell'>
          {data?.toll_fee + "tk"}
        </TableCell>
        <TableCell align='left' className='tableCell'>
          {data?.payType === null ? 'Unpaid' : data?.payType}
        </TableCell>
        <TableCell align='left' className='tableCell'>
          <ActiveStatus
            status={data?.payStatus}
          />
        </TableCell>
        <TableCell>
          <MemberAppMenuList id={data.memberId} />
        </TableCell>
      </TableRow>
    )}
  </>
);

export default TableItem;

TableItem.propTypes = {
  data: PropTypes.object,
};
