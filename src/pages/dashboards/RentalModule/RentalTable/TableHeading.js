import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import {Fonts} from 'shared/constants/AppEnums';

const TableHeading = () => {
  return (
    <TableRow
      sx={{
        '& th': {
          fontSize: 13,
          padding: 2,
          fontWeight: Fonts.BOLD,
          '&:first-of-type': {
            pl: 5,
          },
          '&:last-of-type': {
            pr: 5,
          },
        },
      }}
    >
      <TableCell>Vehicle Class</TableCell>
      <TableCell>Vehicle Number</TableCell>
      <TableCell>Payment Method</TableCell>
      <TableCell>Total Usable Amount</TableCell>
      <TableCell>Last Amount Used</TableCell>
      <TableCell>Status</TableCell>
      <TableCell>Settings</TableCell>
    </TableRow>
  );
};

export default TableHeading;
