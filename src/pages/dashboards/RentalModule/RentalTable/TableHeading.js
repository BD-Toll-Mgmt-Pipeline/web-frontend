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
      <TableCell>সম্পত্তির পরিচিতি</TableCell>
      <TableCell>ভাড়ার ধরণ</TableCell>
      <TableCell>ভাড়াটিয়ার নাম</TableCell>
      <TableCell>আবেদনের তারিখ</TableCell>
      <TableCell>মোবাইল নাম্বার</TableCell>
      <TableCell>স্টেটাস</TableCell>
      <TableCell>ব্যবস্থা</TableCell>
    </TableRow>
  );
};

export default TableHeading;
