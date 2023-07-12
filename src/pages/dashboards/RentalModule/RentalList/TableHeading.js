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
          <IntlMessages id='Last Payment Date' />
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
          <IntlMessages id='Invoice No' />
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
          <IntlMessages id='Total Payment(TK)' />
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
          <IntlMessages id='invoice.ordertype' />
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default TableHeading;
