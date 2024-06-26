import React from 'react';
import TableCell from '@mui/material/TableCell';
import IntlMessages from '@crema/utility/IntlMessages';
import TableRow from '@mui/material/TableRow';
import {Box} from '@mui/material';
import {Fonts} from 'shared/constants/AppEnums';

const TableHeading = () => {
  return (
    <TableRow>
      <TableCell>
        <Box
          sx={{
            color: 'text.secondary',
            fontSize: 13,
            fontWeight: Fonts.BOLD,
          }}
        >
          <IntlMessages id='সর্বশেষ পেমেন্ট' />
        </Box>
      </TableCell>

      <TableCell>
        <Box
          sx={{
            color: 'text.secondary',
            textAlign: 'right',
            fontSize: 13,
            fontWeight: Fonts.BOLD,
          }}
        >
          <IntlMessages id='পেমেন্ট হতে' />
        </Box>
      </TableCell>

      
      <TableCell>
        <Box
          sx={{
            color: 'text.secondary',
            textAlign: 'right',
            fontSize: 13,
            fontWeight: Fonts.BOLD,
          }}
        >
          <IntlMessages id='পেমেন্ট পর্যন্ত' />
        </Box>
      </TableCell>

      <TableCell>
        <Box
          sx={{
            color: 'text.secondary',
            textAlign: 'right',
            fontSize: 13,
            fontWeight: Fonts.BOLD,
          }}
        >
          <IntlMessages id='রশিদ নং' />
        </Box>
      </TableCell>

      <TableCell>
        <Box
          sx={{
            color: 'text.secondary',
            textAlign: 'right',
            fontSize: 13,
            fontWeight: Fonts.BOLD,
          }}
        >
          <IntlMessages id='মোট পেমেন্ট/টাকা ' />
        </Box>
      </TableCell>

      <TableCell>
        <Box
          sx={{
            color: 'text.secondary',
            textAlign: 'right',
            fontSize: 13,
            fontWeight: Fonts.BOLD,
          }}
        >
          <IntlMessages id='পেমেন্ট বিবরণ' />
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default TableHeading;
