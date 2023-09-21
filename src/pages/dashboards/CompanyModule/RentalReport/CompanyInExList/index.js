import React from 'react';
import PropTypes from 'prop-types';
// import HeaderTwo from 'common/typography/HeaderTwo';
import TableHeading from './TableHeading';
import TableItem from './TableItem';
import {styled} from '@mui/material/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import AppCard from '@crema/core/AppCard';

const StyledTable = styled(Table)(() => ({
  '& > thead > tr > th, & > tbody > tr > th, & > tfoot > tr > th, & > thead > tr > td, & > tbody > tr > td, & > tfoot > tr > td':
    {
      padding: 8,
    },
}));

const CompanyInExlist = ({income}) => {
  console.log(income);
  return (
    <AppCard>
      <Typography variant='h3' mb={3}>
        ইনকাম
      </Typography>
      <hr />
      <StyledTable>
        <TableHead>
          <TableHeading />
        </TableHead>
        <TableBody>
          {income?.individualIncome?.length > 0 ? (
            income?.individualIncome?.map((product) => {
              return <TableItem key={product._id} product={product} />;
            })
          ) : (
            <TableRow>
              <TableCell
                colSpan={7}
                sx={{fontSize: 14, fontWeight: 600, textAlign: 'center'}}
              >
                No Payment Information Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </StyledTable>
    </AppCard>
  );
};

export default CompanyInExlist;

CompanyInExlist.propTypes = {
  customerDetails: PropTypes.object,
  income: PropTypes.arrayOf(PropTypes.object),
};
