import React, {useState, useEffect} from 'react';
import AppCard from '@crema/core/AppCard';
import {Button, Typography} from '@mui/material';
import {GrMoney} from 'react-icons/gr';
// import axios from 'axios';
import DailyCharts from './DailyIncomeExpenseCharts';
import CompanyInExlist from './CompanyInExList';
import CompanyExpenseList from './CompanyExpenseList';
import DailyBar from './DailyInExBar';
import PropTypes from 'prop-types';
import makeAuthenticatedRequest from 'pages/common/common';
import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';

export default function RentalReport({totalIncomeDate, totalExpenseDate}) {
  const [incomeData, setIncomeData] = useState(0);
  const [expenseData, setExpenseData] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isVoucherReady] = useState(true);

  console.log(
    incomeData,
    'incomeDataincomeDataincomeDataincomeDataincomeDataincomeDataincomeDataincomeDataincomeDataincomeData',
  );
  console.log(
    expenseData,
    'expenseDataexpenseDataexpenseDataexpenseDataexpenseDataexpenseDataexpenseDataexpenseData',
  );

  const [toDate] = useState(new Date().toISOString().slice(0, 10));

  useEffect(() => {
    fetchIncomeData();
    fetchExpenseData();
  }, [toDate]);

  const fetchIncomeData = () => {
    const apiUrl = `${
      process.env.REACT_APP_BASE_URL
    }/income-expense/total-income?fromDate=${new Date()
      .toISOString()
      .slice(0, 10)}&toDate=${new Date().toISOString().slice(0, 10)}`;

    setLoading(true);

    makeAuthenticatedRequest(
      apiUrl,
      (data) => {
        setIncomeData(data);
        setLoading(false);
      },
      (errorMessage) => {
        console.error(errorMessage);
        setLoading(false);
      },
    );
  };

  const fetchExpenseData = () => {
    const apiUrl = `${
      process.env.REACT_APP_BASE_URL
    }/expense/total-expense?fromDate=${new Date()
      .toISOString()
      .slice(0, 10)}&toDate=${new Date().toISOString().slice(0, 10)}`;
    setLoading(true);

    makeAuthenticatedRequest(
      apiUrl,
      (data) => {
        setExpenseData(data);
        setLoading(false);
      },
      (errorMessage) => {
        console.error(errorMessage);
        setLoading(false);
      },
    );
  };

  const generatePDFContent = async () => {
    const incomeTableRows = incomeData.individualIncome
      .map(
        (item) => `
    <tr>
      <td>${item?.name}</td>
      <td>${item?.roshidNo}</td>
      <td>${item?.total_amount}</td>
    </tr>
  `,
      )
      .join('');

    const expenseTableRows = expenseData.individualExpenses
      .map(
        (item) => `
    <tr>
      <td>${item?.voucher_title}</td>
      <td>${item?.voucherNo}</td>
      <td>${item?.total_amount}</td>
    </tr>
  `,
      )
      .join('');

    const staticContent = `
      <div>
      <body>
      <div style="position: relative;">
       
        <h2 style="text-align: center; margin: 10px;">
        <b>আনসারুল মুসলিমীন বহুমূখী সমবায় সমিতি লি:</b>
        </h2>

        <h5 style="text-align: center; margin: 10px;">
          <b>ANSARUL MUSLIMIN BAHUMUKHI SAMABAY SAMITY LTD.</b>
        </h5>
        
        <h6 style="margin-bottom: 4px; text-align: center; margin: 10px;">
          ১-জি, ১/১, চিড়িয়াখানা রোড, মিরপুর-১, ঢাকা-১২১৬ <br />
          গভ: রেজি: নং-১২৮/৯৮
          <br />
          ফোন-৮০২১৬৩৬
        </h6>

        <div style="display: flex; justify-content: space-between;">
        <h2>Total Income: ${incomeData?.totalIncome}</h2>
        <h2>Total Expense: ${expenseData?.totalExpense}</h2>
        </div>

         
        <div style="display: flex; justify-content: space-between;">
        <div style="flex: 1; margin-right: 10px;">
          <table border="1" style="margin: 10px auto; text-align: center; width: 100%;">
            <thead>
              <tr>
                <th style="border: 1px solid #000; padding: 5px;">ক্র: নং:</th>
                <th style="border: 1px solid #000; padding: 5px;">বিবরণ</th>
                <th style="border: 1px solid #000; padding: 5px;">টাকার পরিমাণ</th>
              </tr>
            </thead>
            <tbody id="incomeTableBody">
              ${incomeTableRows}
            </tbody>
          </table>
        </div>
        <div style="flex: 1; margin-left: 10px;">
          <table border="1" style="margin: 10px auto; text-align: center; width: 100%;">
            <thead>
              <tr>
                <th style="border: 1px solid #000; padding: 5px;">ক্র: নং:</th>
                <th style="border: 1px solid #000; padding: 5px;">বিবরণ</th>
                <th style="border: 1px solid #000; padding: 5px;">টাকার পরিমাণ</th>
              </tr>
            </thead>
            <tbody id="expenseTableBody">
              ${expenseTableRows}
            </tbody>
          </table>
        </div>
      </div>
       

    `;

    // Create a temporary div to hold the content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = staticContent;

    // Append the temporary div to the body
    document.body.appendChild(tempDiv);

    // Use html2pdf to generate the PDF
    await html2pdf(tempDiv, {
      margin: 10,
      filename: 'test',
      image: {type: 'jpeg', quality: 0.98},
      html2canvas: {scale: 2},
      jsPDF: {
        unit: 'mm',
        format: 'a3',
        orientation: 'portrait',
        width: 105, // A7 width
        height: 74, // A7 height
      },
    });

    // Remove the temporary div from the body
    document.body.removeChild(tempDiv);
  };

  const handlePrint = async (data) => {
    if (isVoucherReady) {
      const pdf = new jsPDF();
      await generatePDFContent(pdf, data);
    }
  };

  return (
    <>
      <Button variant='contained' color='primary' onClick={handlePrint}>
        Download Report
      </Button>
      <div style={{display: 'flex', justifyContent: 'space-around'}}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <AppCard style={{margin: '20px'}}>
            {totalIncomeDate?.totalIncome ? (
              <div>
                <Typography variant='h3'>
                  <GrMoney style={{marginRight: '10px'}} />
                  সার্চ রেজাল্ট (জমা )
                </Typography>
                <Typography variant='h3'>
                  {loading
                    ? 'Loading...'
                    : totalIncomeDate?.totalIncome
                    ? totalIncomeDate.totalIncome -
                      (totalExpenseDate?.totalExpense || 0) +
                      ' টাকা'
                    : 'No Income'}
                </Typography>
              </div>
            ) : (
              <div>
                <Typography variant='h3'>
                  <GrMoney style={{marginRight: '10px'}} />
                  আজকের জমা
                </Typography>
                <Typography variant='h3'>
                  {loading
                    ? 'Loading...'
                    : incomeData?.totalIncome
                    ? incomeData?.totalIncome + ' টাকা'
                    : 'No Income'}
                </Typography>
              </div>
            )}
          </AppCard>
          <AppCard style={{margin: '20px'}}>
            {totalExpenseDate?.totalExpense ? (
              <div>
                <Typography variant='h3'>
                  <GrMoney style={{marginRight: '10px'}} />
                  সার্চ রেজাল্ট (খরচ)
                </Typography>
                <Typography variant='h3'>
                  {loading
                    ? 'Loading...'
                    : totalExpenseDate?.totalExpense
                    ? totalExpenseDate?.totalExpense + ' টাকা'
                    : 'No Expense'}
                </Typography>
              </div>
            ) : (
              <div>
                <Typography variant='h3'>
                  <GrMoney style={{marginRight: '10px'}} />
                  আজকের খরচ
                </Typography>
                <Typography variant='h3'>
                  {loading
                    ? 'Loading...'
                    : expenseData?.totalExpense
                    ? expenseData?.totalExpense + ' টাকা'
                    : 'No Expense'}
                </Typography>
              </div>
            )}
          </AppCard>
        </div>
        <div>
          <DailyCharts
            income={totalIncomeDate?.totalIncome ? totalIncomeDate : incomeData}
            expense={
              totalExpenseDate?.totalExpense ? totalExpenseDate : expenseData
            }
          />
        </div>
        <div>
          <DailyBar
            income={totalIncomeDate?.totalIncome ? totalIncomeDate : incomeData}
            expense={
              totalExpenseDate?.totalExpense ? totalExpenseDate : expenseData
            }
          />
        </div>
      </div>
      <CompanyInExlist
        income={totalIncomeDate?.totalIncome ? totalIncomeDate : incomeData}
      />

      <CompanyExpenseList
        sx={{marginTop: '20px'}}
        expense={
          totalExpenseDate?.totalExpense ? totalExpenseDate : expenseData
        }
      />
    </>
  );
}

RentalReport.propTypes = {
  totalIncomeDate: PropTypes.shape({
    totalIncome: PropTypes.number,
  }),
  totalExpenseDate: PropTypes.shape({
    totalExpense: PropTypes.number,
  }),
};
