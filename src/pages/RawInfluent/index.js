import React, { useState, useEffect } from "react";

import TextField from "@material-ui/core/TextField";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { API_URL } from "utils/config";

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

  const [inputDatas, setInputDatas] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    getTodayValues();
  }, []);

  const getTodayValues = async () => {
    try {
      const dateNew = moment(new Date()).format("YYYY-MM-DD");

      const response = await axios.get(`${API_URL}/api/v1/influent/data`, {
        params: { date: dateNew },
      });

      const data = response.data;

      if (response.status === 200) {
        setInputDatas(data.parameters);
        setInfluentData(data);
        setData(data);
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

      const dateNew = moment(date).format("YYYY-MM-DD");
      const response = await axios.get(`${API_URL}/api/v1/influent/data`, {
        params: { date: dateNew },
      });

      const data = response.data;

      setInputDatas(data.parameters);
      setInfluentData(data);
      setData(data);
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
      // if (!data) {
      const dateNew = moment(date).toISOString();
      const parameters = inputDatas.map((d) => {
        return { ...d, value: Number(d.value) };
      });
      const response = await axios.post(`${API_URL}/api/v1/influent`, {
        parameters,
        comments: comment,
        date: dateNew,
      });

      const data = response.data;

      if (response.status === 201) {
        setInputDatas(data.parameters);
        setInfluentData(data);
        setData(data);
      }
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const setInputValue = (value, indexNumber) => {
    let datas = [...inputDatas];
    datas[indexNumber].value = value;
    setInputDatas(datas);
  };

  const prevDate = () => {
    const currentDate = date;
    currentDate.setDate(currentDate.getDate() - 1);
    changeDate(currentDate);
  };

  const nextDate = () => {
    const currentDate = date;
    currentDate.setDate(currentDate.getDate() + 1);
    changeDate(currentDate);
  };

  const formStr2 = "dddd, DD MMMM YYYY";
  const inputValue = moment(`${date}`).format(formStr2);

  return (
    <div className={"form"}>
      <div className={"form_title"}>
        <h4>Plant Influent After Grit Removal (24HC)</h4>
        <div className={"form_title__calendar"}>
          <span className={"form_title__icon"} onClick={() => prevDate()}>
            <NavigateBeforeIcon />
          </span>

          <DatePicker
            selected={date}
            onChange={(date) => changeDate(date)}
            maxDate={new Date()}
            dateFormat="cccc, d MMMM" // 'cccc' is not correct, it uses the old formatting from date-fns and should be replaced with 'dddd' once it is fixed in react-datepicker
          />
          <span className={"form_title__icon"} onClick={() => nextDate()}>
            <NavigateNextIcon />
          </span>
        </div>
        <span className={"form_title__dateRight"}>{inputValue}</span>
      </div>
      <div className={"innerForm"}>
        <div className={"leftColumn"}>
          <div className={"leftColumn__inner"}>
            {data &&
              data?.parameters?.map((item, i) => {
                return (
                  <div
                    className={"form_input"}
                    key={`${i}-raw`}
                    id={`form_input-${i}`}
                  >
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
                      value={inputDatas[i].value}
                      onChange={(e) => setInputValue(e.target.value, i)}
                    />
                  </div>
                );
              })}
          </div>
          {data && (
            <TextField
              multiline
              className={"formTextarea"}
              rows={4}
              rowsMax={4}
              id="number"
              label="Observations"
              variant="outlined"
              value={data.comments}
              onChange={(e) => setComment(e.target.value)}
            />
          )}
        </div>

        <div className={"outputData"}>
          {data && <OutPutTableData date={date} />}
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
