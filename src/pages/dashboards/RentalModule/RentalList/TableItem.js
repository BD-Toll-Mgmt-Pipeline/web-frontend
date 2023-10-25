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
// import {useParams} from 'react-router-dom';

const TableItem = (props) => {
  console.log(props, 'props');
  const {product} = props;
  // const {id} = useParams();

  const descriptions = product?.myArrayField?.map((x) => x.description) || [];
  const joinedDescriptions = descriptions.join(', ');
  const add_descriptions =
    product?.myArrayField?.map((x) => x.additionaldescription) || [];

  const start_month =
    product?.myArrayField?.map((x) => x.payment_start_month) || [];
  const start_year =
    product?.myArrayField?.map((x) => x.payment_start_year) || [];
  const end_month =
    product?.myArrayField?.map((x) => x.payment_end_month) || [];
  const end_year = product?.myArrayField?.map((x) => x.payment_end_year) || [];

  const joined_Add_Descriptions = add_descriptions.join(', ');

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
            to={`/dashboard/edit-payment-voucher/${product?.roshidNo}`}
            underline='none'
          >
            {moment(props?.product?.date, 'YYYY-MM-DD').format('DD-MM-YYYY')}
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
          {product?.roshidNo}
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
          {product?.total_amount}
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
          {joinedDescriptions}
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
          {joined_Add_Descriptions}
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
          {start_month}/{start_year}{' '}
          {end_month === [] ? `- ${end_month}/${end_year}` : ''}
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default TableItem;

TableItem.propTypes = {
  product: PropTypes.object.isRequired,
  date: PropTypes.object.isRequired,
};
