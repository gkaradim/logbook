import React, { useState } from "react";
import "./OutPutTableData.scss";

import axios from "axios";
import moment from "moment";

const OutPutTableData = ({ dataID, date }) => {
  const [data, setData] = useState(null);

  React.useEffect(() => {
    getOutput();
  }, []);

  const getOutput = async () => {
    try {
      const response = await axios.get(
        `/api/v1/influent/data/calculated?date=${moment(date).toISOString()}`
      );

      const data = response.data;

      if (response.status === 200) {
        setData(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={"outPutTable"}>
      <label>CALCULATED DATA</label>
      <br />
      {data &&
        data[0]?.parameters?.map((item, i) => {
          return (
            <div className={"form_input"} key={`${i}-outp`}>
              <span className={"input__label"}>
                {item.name} <sub> {item.measurementType}</sub> (
                {item.measurementUnit}) :
              </span>
              <span>{item.value}</span>
            </div>
          );
        })}
    </div>
  );
};

export default OutPutTableData;
