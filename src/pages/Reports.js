import React, { useState } from "react";

import DatePicker from "react-datepicker";
import { Line } from 'react-chartjs-2'
import moment from 'moment';
import axios from 'axios';

function Reports() {
  //Use state methods for API and chart
  const [startDate, setStartDate] = useState(new Date()); //New data is given because we need to render the component with Todays Data to show it.
  const [endDate, setEndDate] = useState(null);
  const [chartData, setData] = useState(null);

  //On change method to set startDate end endDate for the API 
  const onChange = dates => {
    console.log(dates);
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const report = async () => {
    //We are using moment to just format the data , if you want you can delete or use date-fns.
    const from = moment(startDate).format("YYYY-MM-DD");
    const to = moment(endDate).format("YYYY-MM-DD");
    //request from API
    const response = await axios.get('/api/v1/influent/out', { params: { from, to } });

    const data = response.data;

    //Chart dataset documentation. You can check website of the chart. It is documeneted there.
    const chart = {
      labels: data.map(d => { return moment(d.date).format('DD-MM-YYYY') }), //Array map for the labels data as DATE.
      datasets: [{
        label: 'Tss',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: data.map(d => { return d.tss }) //Array map for the data as DATA.
      }]
    }
    setData(chart);
  }
  
  return (
    <div className="container flowRate" style={{ paddingLeft: 240 }}>
      <h1>Reports</h1>

      <div className="row">
        <div className="col-12">
          Start Date 
          <DatePicker
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            maxDate={new Date()}
            selectsRange
            inline 
          /> {/*  it returns dates array as response after we choose first and second date.  */}
        </div>
        <div className="col-sm-4">
          <button onClick={report} className="btn btn-primary">TSS Report</button>
        </div>
        <div className="col-sm-8">
          {chartData && <Line
            data={chartData}
            options={{
              title: {
                display: true,
                text: 'Average Rainfall per month',
                fontSize: 20
              },
              legend: {
                display: true,
                position: 'right'
              }
            }} />}
        </div>
      </div>
    </div>
  );
}

export default Reports;
