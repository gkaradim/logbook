import React, { useState, useEffect  } from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import OutPutTableData from "../../components/OutPutTableData";

import DatePicker from "react-datepicker";
import moment from "moment";
import axios from "axios";

import "./RawInfluent.scss";
import "../style.scss";

const RawInfluentCalculator = ({ setInfluentData }) => {
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState(null);
  const [wwadf, setWwadf] = useState("");
  const [tss, setTss] = useState("");

  //const [inputDatas, setInputDatas] = useState({ wwadf: "", tss: "" })

  useEffect(() => {
    getTodayValues();
  }, []);

  const getTodayValues = async () => {
    try {
      const dateNew = moment(new Date()).format("YYYY-MM-DD");

      const response = await axios.get(`/api/v1/influent`, {
        params: { date: dateNew },
      });

      const data = response.data;

      if (response.status === 200) {
        setData(data);
        setInfluentData(data);
        //setInputDatas({ wwadf: data.wwadf, tss: data.tss })
        setWwadf(data.wwadf);
        setTss(data.tss);
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
      setWwadf("");
      setTss("");

      const dateNew = moment(date).format("YYYY-MM-DD");
      const response = await axios.get(`/api/v1/influent`, {
        params: { date: dateNew },
      });

      const data = response.data;
      setData(data);
      setInfluentData(data);
      setWwadf(data.wwadf);
      setTss(data.tss);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setData(null);
          setInfluentData(null);
        }
      }
      console.log(error.response ? error.response : error); 
    }
  }

  const submitForm = async () => {
    try {
      if (!data) {
        const dateNew = moment(date).toISOString();
        const response = await axios.post("/api/v1/influent", {
          date: dateNew,
          wwadf: Number(wwadf),
          tss: Number(tss)
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
  }

  // const setInputValue = (value, stateName) => {
  //   setInputDatas({ ...inputDatas, [stateName] : value })
  // }

  return (
    <div className={"form"}>
      <h4>Plant Influent After Grit Removal (24HC)</h4>
      <DatePicker selected={date} onChange={(date) => changeDate(date)} maxDate={new Date()} />

      <div className={"leftColumn mt-5"}>
        <div className={"form_input"}>
          <span className={"input__label"}> WWADF (m³/d):</span>

          {/* {<TextField
            className={"custom_textfield"}
            id="number"
            label="m³/d"
            type="number"
            variant="outlined"
            value={inputDatas.wwadf}
            onChange={(e) => setInputValue(e.target.value, "wwadf")}
          />} */}
          <TextField
            className={"custom_textfield"}
            id="number"
            label="m³/d"
            type="number"
            variant="outlined"
            value={wwadf}
            onChange={(e) => setWwadf(e.target.value)}
            disabled={data}
          />
        </div>

        <div className={"form_input"}>
          <span className={"input__label"}> TSS (mg/L):</span>

          <TextField
            className={"custom_textfield"}
            id="filled-number"
            label="mg/L"
            type="number"
            variant="outlined"
            value={tss}
            onChange={(e) => setTss(e.target.value)}
            disabled={data}
          />
        </div>
      </div>

      <div className={"outputData"}>
        {data && <OutPutTableData dataID={data.id} />}
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
  )
}

export default RawInfluentCalculator;
