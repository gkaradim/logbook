import React, { useState, useEffect } from "react";

// import { Tabs, Tab } from "react-bootstrap";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import DatePicker from "react-datepicker";

import axios from "axios";
import moment from "moment";

import CalculatorTwo from "./CalculatorTwo/CalculatorTwo";
import InfluentCalculator from "./Influent/index";

import "./TabPage.scss";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      className="tabs"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

function TabPage() {
  const [data, setData] = useState(null);
  const [date, setDate] = useState(new Date());
  const today = moment();
  const disableFutureDt = (current) => {
    return current.isBefore(today);
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
    <div className="container flowRate">
      <div className={"flowRate__inner"}>
        <h2>Greek Log Book</h2>

        <DatePicker
          selected={date}
          onChange={(date) => changeDate(date)}
          isValidDate={disableFutureDt}
        />
      </div>

      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        <Tab label="Influent" {...a11yProps(0)} />
        <Tab label="Tab 2" {...a11yProps(1)} />
        {/* <Tab label="Item Three" {...a11yProps(2)} />
        <Tab label="Item Four" {...a11yProps(3)} />
        <Tab label="Item Five" {...a11yProps(4)} />
        <Tab label="Item Six" {...a11yProps(5)} />
        <Tab label="Item Seven" {...a11yProps(6)} /> */}
      </Tabs>

      <TabPanel value={value} index={0}>
        <InfluentCalculator
          wwadf={wwadf}
          tss={tss}
          total={data ? data.total : ""}
          submitForm={submitForm}
          setWwadf={setWwadf}
          setTss={setTss}
          isSeeOutputData={isSeeOutputData}
          dataID={data ? data.id : ""}
          data={data}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        tab2
      </TabPanel>
    </div>
  );
}

export default TabPage;
