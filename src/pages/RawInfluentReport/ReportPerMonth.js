import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { API_URL } from "utils/config";

import DatePicker from "react-datepicker";
import { HorizontalBar } from "react-chartjs-2";

import moment from "moment";
import axios from "axios";

const ReportPerL = () => {
  //Use state methods for API and chart
  const [date, setDate] = useState(new Date());
  const [chartData, setData] = useState(null);

  const report = async () => {
    //We are using moment to just format the data , if you want you can delete or use date-fns.
    //request from API
    const response = await axios.get(`${API_URL}/api/v1/influent/data/chart`, {
      params: {
        MeasurementUnit: "mg/l",
        date,
      },
    });

    const data = response.data;

    console.log("data", response.data);

    let datasets = [];
    data.forEach((d, index) => {
      if (index == 0) {
        d.parameters.forEach((p) => {
          datasets.push({
            fill: false,
            lineTension: 0,
            backgroundColor: "rgba(75,192,192,1)",
            borderColor: "rgba(0,0,0,1)",
            borderWidth: 1,
            label: `${p.name} ${p.measurementType}`,
            data: [p.value],
          });
        });
      } else {
        d.parameters.forEach((p, index) => {
          datasets[index].data.push(p.value);
        });
      }
    });

    const chart = {
      labels: data.map((d) => moment(d.date).format("DD-MM-YYYY")),
      datasets,
    };

    setData(chart);
  };

  return (
    <>
      <div className="col-12">
        <div className={"form_calendar"}>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            showFullMonthYearPicker
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

      <div className="col-12 col-md-9">
        {chartData && (
          <HorizontalBar
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
