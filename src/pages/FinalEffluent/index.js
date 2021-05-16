import React, { useState, useEffect } from "react";

import TextField from "@material-ui/core/TextField";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { API_URL } from "utils/config";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";

import Button from "@material-ui/core/Button";

import OutPutTableData from "../../components/OutPutTableData";

import DatePicker from "react-datepicker";
import moment from "moment";
import axios from "axios";

import "./FinalEffluent.scss";
import "../style.scss";

const FinalEffluent = () => {
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState(null);
  const [calculatedData, setCalculatedData] = useState([]);

  const [inputDatas, setInputDatas] = useState([]);
  const [comment, setComment] = useState("");

  const [removeCalculatedModal, setRemoveCalculatedModal] = React.useState({
    show: false,
  });

  const handleOpenCalculated = () => {
    setRemoveCalculatedModal({
      show: true,
    });
  };

  useEffect(() => {
    getTodayValues();
  }, []);

  const getTodayValues = async () => {
    try {
      const dateNew = moment(new Date()).format("YYYY-MM-DD");

      const response = await axios.get(`${API_URL}/api/v1/stages`, {
        params: {
          Stage: "Final Effluent",
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

      if (response.status === 200) {
        setInputDatas(dataInputs);
        setData(data);
        setCalculatedData(calculatedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeDate = async (date) => {
    try {
      setDate(date);
      setData(null);

      const dateNew = moment(date).format("YYYY-MM-DD");
      const response = await axios.get(`${API_URL}/api/v1/stages`, {
        params: {
          Stage: "Final Effluent",
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
      setData(data);
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
      const response = await axios.post(`${API_URL}/api/v1/stages`, {
        Stage: "Final Effluent",
        Units: [
          {
            name: "Final Effluent",
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

      if (response.status === 201) {
        setInputDatas(dataInputs);
        setCalculatedData(calculatedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setInputValue = (value, indexNumber) => {
    let datas = [...inputDatas];
    datas[indexNumber].value = Number(value);
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

  const todaysDate = () => {
    const currentDate = new Date();
    changeDate(currentDate);
  };

  const formStr2 = "dddd, DD MMMM YYYY";
  const dateValueRight = moment(`${date}`).format(formStr2);

  const unitName = data?.units.map((item) => {
    return item.name;
  });

  const dataInputs = data?.units[0]?.measurements[0].data.map((item) => {
    return item;
  });

  return (
    <div className={"form"}>
      <div className={"form_title"}>
        <div className={"form_title__calendar"}>
          <span className={"form_title__icon"} onClick={() => prevDate()}>
            <NavigateBeforeIcon />
            Previous Day
          </span>

          <DatePicker
            selected={date}
            onChange={(date) => changeDate(date)}
            maxDate={new Date()}
            dateFormat="cccc, d MMMM" // 'cccc' is not correct, it uses the old formatting from date-fns and should be replaced with 'dddd' once it is fixed in react-datepicker
          />
          <span className={"form_title__icon"} onClick={() => nextDate()}>
            Next Day
            <NavigateNextIcon />
          </span>
          <span
            className={"form_title__icon--today"}
            onClick={() => todaysDate()}
          >
            Today
          </span>
        </div>
        <span className={"form_title__dateRight--outter"}>
          Selected Date:
          <span className={"form_title__dateRight"}>{dateValueRight}</span>
        </span>
      </div>
      <div className={"innerForm"}>
        <div className={"leftColumn"}>
          <h4>{unitName}</h4>
          <div className={"leftColumn__inner"}>
            {data &&
              dataInputs?.map((item, i) => {
                return (
                  <div
                    className={"form_input form_input_finalEffluent"}
                    key={`${i}-raw`}
                    id={`form_input-${i}`}
                  >
                    <span className={"input__label"}>{item.name}</span>
                    <div className={"inputs_flex"}>
                      <TextField
                        className={"custom_textfield"}
                        id="number"
                        variant="outlined"
                        value={inputDatas[i].value}
                        onChange={(e) => {
                          const re = /^[0-9\b]+$/;
                          if (
                            e.target.value === "" ||
                            re.test(e.target.value)
                          ) {
                            setInputValue(e.target.value, i);
                          } else {
                            setInputValue("", i);
                          }
                        }}
                      />
                      <span className={"input__labelEnd"}>
                        {item.measurementUnit}
                        <sub> {item.measurementType}</sub>
                      </span>
                    </div>
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

        {calculatedData[0]?.length > 0 && (
          <div className={"outPutTable__button"}>
            <Button variant="contained" onClick={handleOpenCalculated}>
              Show Calculated Values
            </Button>
          </div>
        )}

        {removeCalculatedModal && removeCalculatedModal.show ? (
          <Dialog open={removeCalculatedModal.show}>
            <div className={"outPutTable__popup"}>
              <div className={"outPutTable__title "}>
                <div
                  className={"outPutTable__close"}
                  onClick={() => {
                    setRemoveCalculatedModal({
                      show: false,
                    });
                  }}
                >
                  <CloseIcon />
                </div>
              </div>

              <DialogContent>
                <div className={"outPutTable__content"}>
                  {calculatedData.length > 0 && (
                    <div className={"outPutTable"}>
                      <label>Calculated Values</label>
                      {data &&
                        data?.units[0]?.measurements[0]?.calculatedData?.map(
                          (item, i) => {
                            return (
                              <div className={"form_input"} key={`${i}-outp`}>
                                <span className={"input__label"}>
                                  {item.name} <sub> {item.measurementType}</sub>
                                </span>
                                <span>{item.value}</span>
                                <span className={"calculated_type"}>
                                  {item.measurementUnit}
                                </span>
                              </div>
                            );
                          }
                        )}
                    </div>
                  )}
                </div>
              </DialogContent>
            </div>
          </Dialog>
        ) : null}
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

export default FinalEffluent;
