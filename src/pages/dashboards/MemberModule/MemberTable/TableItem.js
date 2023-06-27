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

const TableItem = ({data}) => (
  <>
    {data.length == 0 ? (
      <TableRow>
        <TableCell colSpan={7} align='center'>
          No member found.
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
            to={`/dashboard/member-details/${data.memberId}`}
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
              to={`/dashboard/member-details/${data.memberId}`}
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
          {data.identificationMemberName}
        </TableCell>
        <TableCell align='left' className='tableCell'>
          <ActiveStatus
            status={data?.activeStatus === true ? 'active' : 'inactive'}
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
