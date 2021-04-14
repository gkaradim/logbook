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

import "./PrimaryClarifier.scss";
import "../style.scss";
import { ListItemAvatar, ListItemSecondaryAction } from "@material-ui/core";

const PrimaryClarifier = ({ setPrimaryClarifierData }) => {
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState(null);
  const [calculatedData, setCalculatedData] = useState([]);

  const [inputDatas, setInputDatas] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    getTodayValues();
  }, []);

  const getTodayValues = async () => {
    try {
      const dateNew = moment(new Date()).format("YYYY-MM-DD");

      const response = await axios.get(`${API_URL}/api/v1/stages`, {
        params: {
          Stage: "Primary Clarifier",
          Date: dateNew,
        },
      });

      const data = response.data;

      const dataInputs = response.data?.units[0].measurements[0].data.map(
        (item) => {
          return item;
        }
      );

      const calculatedData = data?.units.map(
        (i) => i.measurements[0]?.calculatedData
      );

      // const calculatedData2 = data?.units[0].measurements[0].calculatedData;

      // console.log("calculatedData2", calculatedData2);

      if (response.status === 200) {
        setInputDatas(dataInputs);
        // setCalculatedData(calculatedData);
        setPrimaryClarifierData(data);

        setData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log("data", data);

  const changeDate = async (date) => {
    try {
      setDate(date);
      setData(null);
      setPrimaryClarifierData(null);

      const dateNew = moment(date).format("YYYY-MM-DD");
      const response = await axios.get(`${API_URL}/api/v1/stages`, {
        params: {
          Stage: "Primary Clarifier",
          Date: dateNew,
        },
      });

      const data = response.data;

      const dataInputs = response.data?.units[0].measurements[0].data.map(
        (item) => {
          return item;
        }
      );

      const calculatedData = data?.units.map(
        (i) => i.measurements[0]?.calculatedData
      );

      setInputDatas(dataInputs);
      // setCalculatedData(calculatedData);
      setPrimaryClarifierData(data);
      setData(data);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setData(null);
          setPrimaryClarifierData(null);
        }
      }
      console.log(error.response ? error.response : error);
    }
  };

  const submitForm = async () => {
    try {
      // if (!data) {
      const dateNew = moment(date).toISOString();

      const calculatedData = data?.units.map(
        (i) => i.measurements[0]?.calculatedData
      );
      const dataInputs = data?.units[0].measurements[0].data.map((item) => {
        return item;
      });
      const response = await axios.post(`${API_URL}/api/v1/stages`, {
        Stage: "Primary Clarifier",
        Units: [
          {
            name: "Clarifier",
            measurements: [
              {
                date: dateNew,
                data: dataInputs,
              },
            ],
          },
          {
            name: "Raw Sludge",
            measurements: [
              {
                date: dateNew,
                data: dataInputs,
              },
            ],
          },
        ],
        comments: comment,
      });

      // const data = response.data;

      console.log("dataInputsssssss", dataInputs);

      if (response.status === 201) {
        setInputDatas(dataInputs);
        // setCalculatedData(calculatedData);
        // setInfluentData(data);
        // setData(data);
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

    console.log("datas", datas);
    console.log("inputDatas", inputDatas);
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
  const dateValueRight = moment(`${date}`).format(formStr2);

  const unitLeftName = data?.units[0].name;
  const unitRightName = data?.units[1].name;
  const dataInputs = data?.units[0]?.measurements[0].data.map((item) => {
    return item;
  });

  // console.log("calculatedData", calculatedData);

  return (
    <div className={"form"}>
      <div className={"form_title"}>
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
        <span className={"form_title__dateRight"}>{dateValueRight}</span>
      </div>
      <div className={"innerForm"}>
        <div className={"column"}>
          <h4>{unitLeftName}</h4>
          <div className={"column__inner"}>
            {data &&
              dataInputs?.map((item, i) => {
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
                      type="number"
                      variant="outlined"
                      value={inputDatas[i].value}
                      onChange={(e) => setInputValue(e.target.value, i)}
                    />
                  </div>
                );
              })}
          </div>
        </div>
        <div className={"column"}>
          <h4>{unitRightName}</h4>
          <div className={"column__inner"}>
            {data &&
              dataInputs?.map((item, i) => {
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
                      type="number"
                      variant="outlined"
                      value={inputDatas[i].value}
                      onChange={(e) => setInputValue(e.target.value, i)}
                    />
                  </div>
                );
              })}
          </div>
        </div>
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

      {calculatedData.length > 0 && (
        <div className={"outputData"}>
          <OutPutTableData date={date} />}
        </div>
      )}

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

export default PrimaryClarifier;
