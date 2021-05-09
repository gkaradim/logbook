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

const PrimaryClarifier = () => {
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState(null);
  // const [data2, setData2] = useState(null);

  const [calculatedData, setCalculatedData] = useState([]);

  const [inputDatas, setInputDatas] = useState([[], []]);
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

      const dataInputs2 = response.data?.units[1].measurements[0].data.map(
        (item) => {
          return item;
        }
      );

      const calculatedData = data?.units.map(
        (i) => i.measurements[0]?.calculatedData
      );

      if (response.status === 200) {
        setInputDatas([[...dataInputs], [...dataInputs2]]);
        setData({ ...data });
        setCalculatedData(calculatedData);
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
      const dataInputs2 = response.data?.units[1].measurements[0].data.map(
        (item) => {
          return item;
        }
      );

      const calculatedData = data?.units.map(
        (i) => i.measurements[0]?.calculatedData
      );

      setInputDatas([[...dataInputs], [...dataInputs2]]);
      setData({ ...data });
      setCalculatedData(calculatedData);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setData(null);
        }
      }
      console.log(error.response ? error.response : error);
    }
  };

  const submitForm = async () => {
    try {
      const dateNew = moment(date).toISOString();

      const calculatedData = data?.units.map(
        (i) => i.measurements[0]?.calculatedData
      );
      const dataInputs = data?.units[0].measurements[0].data.map((item) => {
        return item;
      });

      const dataInputs2 = data?.units[1].measurements[0].data.map((item) => {
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
                data: dataInputs2,
              },
            ],
          },
        ],
        comments: comment,
      });

      if (response.status === 201) {
        setInputDatas([[...dataInputs], [...dataInputs2]]);
        setCalculatedData(calculatedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setInputValue = (value, indexNumber, columnIndex) => {
    let datas = [...inputDatas];
    if (datas[columnIndex] && datas[columnIndex][indexNumber]) {
      datas[columnIndex][indexNumber].value = Number(value);
    }
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
  const dateValueRight = moment(`${date}`).format(formStr2);

  const unitLeftName = data?.units[0].name;
  const unitRightName = data?.units[1].name;
  const dataInputs = data?.units[0]?.measurements[0].data.map((item) => {
    return item;
  });

  const dataInputs2 = data?.units[1]?.measurements[0].data.map((item) => {
    return item;
  });

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
        <div className={"column_outter"}>
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
                        id={`id-${i}`}
                        type="number"
                        variant="outlined"
                        value={inputDatas[0][i] ? inputDatas[0][i].value : ""}
                        onChange={(e) => {
                          const re = /^[0-9\b]+$/;
                          console.log("inputDatas", inputDatas);
                          if (
                            e.target.value === "" ||
                            re.test(e.target.value)
                          ) {
                            setInputValue(e.target.value, i, 0);
                          } else {
                            setInputValue("", i, 0);
                          }
                        }}
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
                dataInputs2?.map((item, i) => {
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
                        id={`id-${i}`}
                        variant="outlined"
                        value={inputDatas[1][i] ? inputDatas[1][i].value : ""}
                        onChange={(e) => {
                          const re = /^[0-9\b]+$/;
                          if (
                            e.target.value === "" ||
                            re.test(e.target.value)
                          ) {
                            setInputValue(e.target.value, i, 1);
                          } else {
                            setInputValue("", i, 1);
                          }
                        }}
                      />
                    </div>
                  );
                })}
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
        </div>
        {calculatedData.length > 0 && (
          <div className={"outPutTable"}>
            <label>CALCULATED DATA {unitLeftName}</label>
            {data &&
              data?.units[0]?.measurements[0]?.calculatedData?.map(
                (item, i) => {
                  return (
                    <div className={"form_input"} key={`${i}-outp`}>
                      <span className={"input__label"}>
                        {item.name} <sub> {item.measurementType}</sub> (
                        {item.measurementUnit}) :
                      </span>
                      <span>{item.value}</span>
                    </div>
                  );
                }
              )}
          </div>
        )}

        {calculatedData.length > 0 && (
          <div className={"outPutTable"}>
            <label>CALCULATED DATA {unitRightName}</label>
            {data &&
              data?.units[1]?.measurements[0]?.calculatedData?.map(
                (item, i) => {
                  return (
                    <div className={"form_input"} key={`${i}-outp`}>
                      <span className={"input__label"}>
                        {item.name} <sub> {item.measurementType}</sub> (
                        {item.measurementUnit}) :
                      </span>
                      <span>{item.value}</span>
                    </div>
                  );
                }
              )}
          </div>
        )}
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

export default PrimaryClarifier;