import React, { useState, useEffect } from "react";

import { Tabs, Tab } from "react-bootstrap";
import DatePicker from "react-datepicker";

import axios from "axios";
import moment from "moment";

// Component Page
import CalculatorOne from "../components/CalculatorOne";
import CalculatorTwo from "../components/CalculatorTwo";

function TabPage() {
  const [data, setData] = useState(null);
  const [date, setDate] = useState(new Date());
  const [wwadf, setWwadf] = useState("");
  const [tss, setTss] = useState("");
  const [thirdNumber, setThirdNumber] = useState("");

  useEffect(() => {
    getTodayValues();
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

  const changeDate = async (newDate) => {
    try {
      setDate(newDate);
      const date = moment(newDate).format("YYYY-MM-DD");

      const response = await axios.get(
        `https://easy-log-book-api.herokuapp.com/api/v1/influent/${date}`
      );

      const resData = response.data;

      if (resData.status) {
        setData(resData.data);
        setWwadf(resData.data.wwadf);
        setTss(resData.data.tss);
        setThirdNumber(resData.data.thirdNumber);
      } else {
        setData(null);
        setWwadf("");
        setTss("");
        setThirdNumber("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitForm = async () => {
    try {
      if (!data) {
        const dateNew = moment(date).format("YYYY-MM-DD");
        const response = await axios.post(
          "https://easy-log-book-api.herokuapp.com/api/v1/influent",
          {
            wwadf,
            tss,
            date: dateNew,
          }
        );

        const data = response.data;

        if (data.status) {
          setData(data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitFormTwo = async () => {
    try {
      if (!data) {
        alert("First set Wwadf and Tss");
      } else {
        const response = await axios.put(`/calculate/${data._id}`, {
          thirdNumber,
          wwadf,
        });

        const resData = response.data;

        if (resData.status) {
          setData(resData.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-5">
      <h2 className="mb-3">GREEK LOG BOOK</h2>

      <DatePicker
        className="mb-4"
        selected={date}
        onChange={(date) => changeDate(date)}
      />

      <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
        <Tab className="py-5" eventKey="home" title="Calculator 1">
          <CalculatorOne
            wwadf={wwadf}
            tss={tss}
            total={data ? data.total : ""}
            submitForm={submitForm}
            setWwadf={setWwadf}
            setTss={setTss}
          />
        </Tab>

        <Tab className="py-5" eventKey="profile" title="Calculator 2">
          <CalculatorTwo
            thirdNumber={thirdNumber}
            totalTwo={data ? data.totalTwo : ""}
            setThirdNumber={setThirdNumber}
            submitFormTwo={submitFormTwo}
          />
        </Tab>
      </Tabs>
    </div>
  );
}

export default TabPage;
