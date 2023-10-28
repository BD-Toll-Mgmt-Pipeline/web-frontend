import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import PropTypes from 'prop-types';

const COLORS = ['#0088FE', '#FF8042'];

function DailyBar({income, expense}) {
  const data = [
    {name: 'জমা ', income: income?.totalIncome},
    {name: 'খরচ', expense: expense?.totalExpense},
  ];

  return (
    <div
      className='DailyBar'
      style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
    >
      <BarChart width={300} height={400} data={data}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='income' fill={COLORS[0]} name='জমা ' />
        <Bar dataKey='expense' fill={COLORS[1]} name='খরচ' />
      </BarChart>
    </div>
  );
}

DailyBar.propTypes = {
  income: PropTypes.shape({
    totalIncome: PropTypes.number,
  }).isRequired,
  expense: PropTypes.shape({
    totalExpense: PropTypes.number,
  }).isRequired,
};

export default DailyBar;
