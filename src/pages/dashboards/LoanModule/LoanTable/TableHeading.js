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
      <TableCell>আবেদনের তারিখ</TableCell>
      <TableCell>সদস্যের নাম</TableCell>
      <TableCell>সদস্যের নম্বর</TableCell>
      <TableCell>আব্দেনকৃত টাকার পরিমাণ</TableCell>
      <TableCell>পরিশোধ তারিখ</TableCell>
      <TableCell>স্টেটাস</TableCell>
      <TableCell>ব্যবস্থা</TableCell>
    </TableRow>
  );
};

export default TableHeading;
