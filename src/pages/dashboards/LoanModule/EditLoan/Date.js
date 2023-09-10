import React, { useState } from "react";

const MonthYearDropdown = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const renderMonthOptions = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return months.map((month, index) => (
      <option key={index} value={index + 1}>
        {month}
      </option>
    ));
  };

  const renderYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 5;
    const endYear = currentYear + 50;
    const years = [];

    for (let year = startYear; year <= endYear; year++) {
      years.push(year);
    }

    return years.map((year) => (
      <option key={year} value={year}>
        {year}
      </option>
    ));
  };

  return (
    <div>
      <label htmlFor="month">Month:</label>
      <select id="month" value={selectedMonth} onChange={handleMonthChange}>
        <option value="">Select Month</option>
        {renderMonthOptions()}
      </select>

      <label htmlFor="year">Year:</label>
      <select id="year" value={selectedYear} onChange={handleYearChange}>
        <option value="">Select Year</option>
        {renderYearOptions()}
      </select>
    </div>
  );
};

export default MonthYearDropdown;
