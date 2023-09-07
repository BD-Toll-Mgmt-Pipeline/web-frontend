import React from 'react';
import {PieChart, Pie, Cell, Tooltip, Legend} from 'recharts';
import PropTypes from 'prop-types'; // Import PropTypes

const COLORS = ['#0088FE', '#FF8042'];

function DailyCharts({income, expense}) {
  console.log(income, expense);
  const data = [
    {name: 'ইনকাম', value: income?.totalIncome},
    {name: 'খরচ', value: expense?.totalExpense},
  ];
  return (
    <div
      className='DailyCharts'
      style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
    >
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill='#8884d8'
          dataKey='value'
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

DailyCharts.propTypes = {
  income: PropTypes.number.isRequired,
  expense: PropTypes.number.isRequired,
};

export default DailyCharts;
