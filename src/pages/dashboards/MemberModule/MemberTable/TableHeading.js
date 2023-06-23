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
      <TableCell>সদস্য নাম্বার</TableCell>
      <TableCell>নাম</TableCell>
      <TableCell>মোবাইল নাম্বার</TableCell>
      <TableCell>পিতার নাম</TableCell>
      <TableCell>সনাক্তকারি সদস্য</TableCell>
      <TableCell>সচল স্টেটাস</TableCell>
      <TableCell>ব্যবস্থা</TableCell>
    </TableRow>
  );
};

export default TableHeading;
