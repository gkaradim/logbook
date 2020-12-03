import React, { useState, useEffect } from "react";

import { Tabs, Tab } from "react-bootstrap";
import DatePicker from "react-datepicker";

import axios from "axios";
import moment from "moment";

import CalculatorTwo from "./CalculatorTwo/CalculatorTwo";
import InfluentCalculator from "./Influent/index";

function TabPage() {
  const [data, setData] = useState(null);
  const [date, setDate] = useState(new Date());
  const today = moment();
  const disableFutureDt = (current) => {
    return current.isBefore(today);
  };

  const [isSeeOutputData, setIsSeeOutputData] = useState(false);

  const [wwadf, setWwadf] = useState("");
  const [tss, setTss] = useState("");
  const [thirdNumber, setThirdNumber] = useState("");

  useEffect(() => {
    //getTodayValues();
  }, []);

  const getTodayValues = async () => {
    try {
      const date = moment(new Date()).format("YYYY-MM-DD");

      const response = await axios.get(`/calculate/${date}`);

      const resData = response.data;

      if (resData.status) {
        setData(resData.data);
        setWwadf(resData.data.wwadf);
        setTss(resData.data.tss);
        setThirdNumber(resData.data.thirdNumber);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeDate = async (date) => {
    try {
      setDate(date);
      // const dateNew = moment(date).format("YYYY-MM-DD");

      const response = await axios.get(`/api/v1/influent`);

      const resData = response.data;

      if (resData.status) {
        setData(resData.data);
        setWwadf(resData.data.wwadf);
        setTss(resData.data.tss);
      } else {
        setData(null);
        setWwadf("");
        setTss("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitForm = async () => {
    try {
      if (!data) {
        const dateNew = moment(date).toISOString();
        const response = await axios.post("/api/v1/influent", {
          date: dateNew,
          wwadf: Number(wwadf),
          tss: Number(tss),
        });

        const data = response.data;

        if (response.status === 201) {
          setData(data);
          setIsSeeOutputData(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const submitFormTwo = async () => {
  //   try {
  //     if (!data) {
  //       alert("First set Wwadf and Tss");
  //     } else {
  //       const response = await axios.put(`/calculate/${data._id}`, {
  //         thirdNumber,
  //         wwadf,
  //       });

  //       const resData = response.data;

  //       if (resData.status) {
  //         setData(resData.data);
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="px-5">
      <h2 className="mb-3">GREEK LOG BOOK</h2>

      <DatePicker
        className="mb-4"
        selected={date}
        onChange={(date) => changeDate(date)}
        isValidDate={disableFutureDt}
      />

      <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
        <Tab className="py-5" eventKey="home" title="Calculator 1">
          <InfluentCalculator
            wwadf={wwadf}
            tss={tss}
            total={data ? data.total : ""}
            submitForm={submitForm}
            setWwadf={setWwadf}
            setTss={setTss}
            isSeeOutputData={isSeeOutputData}
            dataID={data ? data.id : ""}
          />
        </Tab>

        <Tab className="py-5" eventKey="profile" title="Calculator 2">
          <CalculatorTwo
            thirdNumber={thirdNumber}
            totalTwo={data ? data.totalTwo : ""}
            setThirdNumber={setThirdNumber}
            // submitFormTwo={submitFormTwo}
          />
        </Tab>
      </Tabs>
    </div>
  );
}

export default TabPage;
