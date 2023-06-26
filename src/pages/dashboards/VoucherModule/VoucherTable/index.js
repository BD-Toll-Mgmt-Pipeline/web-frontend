import React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import PropTypes from 'prop-types';
import TableHeading from './TableHeading';
import TableItem from './TableItem';
import AppTableContainer from '@crema/core/AppTableContainer';

const VoucherTable = ({orderList}) => {
  return (
    <AppTableContainer>
      <Table className='table'>
        <TableHead>
          <TableHeading />
        </TableHead>
        <TableBody>
          {orderList.map((data) => (
            <TableItem data={data} key={data.customerId} />
          ))}
        </TableBody>
      </Table>
    </AppTableContainer>
  );
};

export default VoucherTable;

VoucherTable.defaultProps = {
  customerList: [],
  orderList: [],
};

VoucherTable.propTypes = {
  customerList: PropTypes.array,
  orderList: PropTypes.array,
};
