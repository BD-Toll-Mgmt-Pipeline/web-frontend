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
      <TableCell>প্রজেক্ট অনুমোদনের তারিখ </TableCell>
      <TableCell>প্রজেক্টের নাম </TableCell>
      <TableCell>ঠিকানা</TableCell>
      <TableCell>অনুমোদিত প্লট সংখ্যা</TableCell>
      <TableCell>প্রত্যেক শেয়ার মূল্য (আনুমানিক)</TableCell>
      <TableCell>স্টেটাস</TableCell>
      <TableCell>ব্যবস্থা</TableCell>
    </TableRow>
  );
};

export default TableHeading;
