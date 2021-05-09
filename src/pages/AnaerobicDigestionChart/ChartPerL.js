import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { API_URL } from "utils/config";

import DatePicker from "react-datepicker";
import { Line } from "react-chartjs-2";
import moment from "moment";
import axios from "axios";

const ReportPerL = () => {
  //Use state methods for API and chart
  const [startDate, setStartDate] = useState(new Date()); //New data is given because we need to render the component with Todays Data to show it.
  const [endDate, setEndDate] = useState(null);
  const [chartData, setData] = useState(null);

  //On change method to set startDate end endDate for the API
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const report = async () => {
    //We are using moment to just format the data , if you want you can delete or use date-fns.
    const from = moment(startDate).format("YYYY-MM-DD");
    const to = moment(endDate).format("YYYY-MM-DD");
    //request from API

    const response = await axios.get(`${API_URL}/api/v1/charts`, {
      params: {
        Stage: "Anaerobic Digestion",
        Type: "data_daily_average",
        from,
        to,
      },
    });

    const data = response.data;

    console.log("data", response.data);

    let datasets = [];
    data?.units[0]?.measurements?.forEach((d, index) => {
      if (index == 0) {
        d.data.forEach((p) => {
          datasets.push({
            fill: false,
            lineTension: 0,
            backgroundColor:
              "rgb(" +
              Math.floor(Math.random() * 430 + 200) +
              "," +
              Math.floor(Math.random() * 430 + 200) +
              "," +
              Math.floor(Math.random() * 430 + 200) +
              ")",
            borderColor:
              "rgb(" +
              Math.floor(Math.random() * 130 + 100) +
              "," +
              Math.floor(Math.random() * 130 + 100) +
              "," +
              Math.floor(Math.random() * 130 + 100) +
              ")",
            borderWidth: 1,
            label: `${p.name} ${p.measurementType}`,
            data: [p.value],
          });
        });
      } else {
        d.data.forEach((p, index) => {
          datasets[index].data.push(p.value);
        });
      }
    });

    const chart = {
      labels: data?.units[0]?.measurements.map((d) =>
        moment(d.date).format("DD-MM-YYYY")
      ),
      datasets,
    };

    setData(chart);
  };

  const formStr2 = "DD/MM/yyyy";

  const inputValue =
    moment(`${startDate}`).format(formStr2) +
    " - " +
    moment(`${endDate}`).format(formStr2);

  return (
    <>
      <div className="col-12">
        <div className={"form_calendar"}>
          <DatePicker
            selected={null}
            onChange={onChange}
            placeholderText="Choose a date range"
            startDate={startDate}
            endDate={endDate}
            selectsRange
            openToDate={new Date()}
            value={!endDate ? new Date() : inputValue}
          />
        </div>

        {/* it returns dates array as response after we choose first and second date.  */}

        <div className={"reportsBtns"}>
          <Button
            variant="outlined"
            size="medium"
            color="primary"
            onClick={report}
          >
            Show chart
          </Button>
        </div>
      </div>

      <div className="col-12">
        {chartData && (
          <Line
            data={chartData}
            options={{
              title: {
                display: true,
                text: "Chart",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
        )}
      </div>
    </>
  );
};

export default ReportPerL;
