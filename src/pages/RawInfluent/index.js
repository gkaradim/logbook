import React, { useState, useEffect } from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import OutPutTableData from "../../components/OutPutTableData";

import DatePicker from "react-datepicker";
import moment from "moment";
import axios from "axios";

import "./RawInfluent.scss";
import "../style.scss";

const RawInfluent = ({ setInfluentData }) => {
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState(null);
  // const [wwadf, setWwadf] = useState("");
  // const [tss, setTss] = useState("");

  const [inputDatas, setInputDatas] = useState({
    name: "string",
    value: 0,
    measurementType: "string",
    measurementUnit: "string",
  });

  useEffect(() => {
    getTodayValues();
  }, []);

  const getTodayValues = async () => {
    try {
      const dateNew = moment(new Date()).format("YYYY-MM-DD");

      const response = await axios.get(`/api/v1/influent/data`, {
        params: { date: dateNew },
      });

      const data = response.data;
      console.log("getTodayValues", data);

      if (response.status === 200) {
        setData(data);
        setInfluentData(data);
        setInputDatas({
          name: data.name,
          value: data.value,
          measurementType: data.measurementType,
          measurementUnit: data.measurementUnit,
        });
        // setWwadf(data.wwadf);
        // setTss(data.tss);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeDate = async (date) => {
    try {
      setDate(date);
      setData(null);
      setInfluentData(null);
      // setWwadf("");
      // setTss("");

      const dateNew = moment(date).format("YYYY-MM-DD");
      const response = await axios.get(`/api/v1/influent/data`, {
        params: { date: dateNew },
      });

      const data = response.data;

      console.log("changeDate", data);

      setData(data);
      setInfluentData(data);
      // setWwadf(data.wwadf);
      // setTss(data.tss);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setData(null);
          setInfluentData(null);
        }
      }
      console.log(error.response ? error.response : error);
    }
  };

  const submitForm = async () => {
    try {
      if (!data) {
        const dateNew = moment(date).toISOString();
        const response = await axios.post("/api/v1/influent", {
          date: dateNew,
          wwadf: Number(inputDatas.wwadf),
          tss: Number(inputDatas.tss),
        });

        const data = response.data;

        if (response.status === 201) {
          setData(data);
          setInfluentData(data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setInputValue = (value, stateName) => {
    setInputDatas({ ...inputDatas, [stateName]: value });
  };

  return (
    <div className={"form"}>
      <div className={"form_title"}>
        <h4>Plant Influent After Grit Removal (24HC)</h4>
        <DatePicker
          selected={date}
          onChange={(date) => changeDate(date)}
          maxDate={new Date()}
        />
      </div>
      <div className={"innerForm"}>
        <div className={"leftColumn "}>
          {data &&
            data?.parameters?.map((item) => {
              return (
                <div className={"form_input"} key={item.name}>
                  <span className={"input__label"}>
                    {item.name} ({item.measurementUnit})
                    <sub> {item.measurementType}</sub>
                  </span>

                  <TextField
                    className={"custom_textfield"}
                    id="number"
                    label={item.measurementUnit}
                    type="number"
                    variant="outlined"
                    value={item.value}
                    onChange={(e) => setInputValue(e.target.value, item.name)}
                    // disabled={data.parameters}
                  />
                </div>
              );
            })}
        </div>

        <div className={"outputData"}>
          {data && <OutPutTableData dataID={data.id} />}
        </div>
      </div>

      <div className={"formButton"}>
        <Button
          variant="outlined"
          size="medium"
          color="primary"
          onClick={submitForm}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default RawInfluent;
