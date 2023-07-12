import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import {Box} from '@mui/material';
import {Fonts} from 'shared/constants/AppEnums';
// import {formatDate} from '../../../../Utils/globalFunctions';
import {Link as RouterLink} from 'react-router-dom';
import Link from '@mui/material/Link';
import moment from 'moment';
import { useParams } from 'react-router-dom';

const TableItem = (props) => {
  const {product} = props;
  const { id } = useParams();
  // const id = '0909430329043';

  return (
    <TableRow>
      <TableCell component='th' scope='row'>
        <Box
          sx={{
            mb: 2,

            fontSize: 13,
            fontWeight: Fonts.MEDIUM,
          }}
        >
          <Link
            component={RouterLink}
            to={`/dashboard/edit-payment-voucher/${id}`}
            underline='none'
          >
            {moment(product?.date, 'YYYY-MM-DD').format('DD-MM-YYYY')}
          </Link>
        </Box>
      </TableCell>

      <TableCell
        sx={{
          verticalAlign: 'top',
        }}
      >
        <Box
          sx={{
            mb: 2,

            textAlign: 'right',
            fontSize: 13,
            fontWeight: Fonts.MEDIUM,
          }}
        >
          {moment(product?.date, 'YYYY-MM-DD').format('DD-MM-YYYY')}
        </Box>
      </TableCell>

      <TableCell
        sx={{
          verticalAlign: 'top',
        }}
      >
        <Box
          sx={{
            mb: 2,

            textAlign: 'right',
            fontSize: 13,
            fontWeight: Fonts.MEDIUM,
          }}
        >
          {product.total_amount}
        </Box>
      </TableCell>

      <TableCell
        sx={{
          verticalAlign: 'top',
        }}
      >
        <Box
          sx={{
            mb: 2,

            textAlign: 'right',
            fontSize: 13,
            fontWeight: Fonts.MEDIUM,
          }}
        >
          {product.order_type}
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default TableItem;

TableItem.propTypes = {
  product: PropTypes.object.isRequired,
};
