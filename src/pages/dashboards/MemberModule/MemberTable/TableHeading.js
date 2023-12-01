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
      <TableCell>Entry Date</TableCell>
      <TableCell>Entry Time</TableCell>
      <TableCell>Vehicle Type</TableCell>
      <TableCell>Toll Fee</TableCell>
      <TableCell>Pay Type</TableCell>
      <TableCell>Pay Status</TableCell>
      <TableCell>Settings</TableCell>
    </TableRow>
  );
};

export default TableHeading;
