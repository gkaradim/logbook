import React, { useState, useEffect } from "react";

// import { Tabs, Tab } from "react-bootstrap";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import DatePicker from "react-datepicker";

import axios from "axios";
import moment from "moment";
import { Line } from "react-chartjs-2";

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

/* const lineChartData = {
  labels: ['January', 'February', 'March','April', 'May','January', 'February', 'March','April', 'May'],
  datasets: [
    {
      label: "Flow Rate",
      fill: false,
      lineTension: 0.5,
      backgroundColor: "rgba(75,192,192,1)",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 2,
      data: [200, 559, 680, 781, 256],
    },
    {
      label: "TSS",
      fill: false,
      lineTension: 0.5,
      backgroundColor: "red",
      borderColor: "#ccc",
      borderWidth: 2,
      data: [1, 3, 5, 100, 30]
    }
  ]
} */

function TabPage() {
  const [data, setData] = useState(null);
  const [date, setDate] = useState(new Date());

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [isSeeOutputData, setIsSeeOutputData] = useState(false);

  const [wwadf, setWwadf] = useState("");
  const [tss, setTss] = useState("");

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
        setWwadf(data.wwadf);
        setTss(data.tss);
        setIsSeeOutputData(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeDate = async (date) => {
    try {
      setDate(date);
      const dateNew = moment(date).format("YYYY-MM-DD");

      const response = await axios.get(`/api/v1/influent`, {
        params: { date: dateNew },
      });

      const data = response.data;

      console.log(response);

      if (response.status == 200) {
        setData(data);
        setWwadf(data.wwadf);
        setTss(data.tss);
        setIsSeeOutputData(true);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setData(null);
          setWwadf("");
          setTss("");
          setIsSeeOutputData(false);
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

  return (
    <div className="flowRate" style={{ paddingLeft: 260 }}>
      <div className={"flowRate__inner"}>
        <h2>Greek Log Book</h2>

        <DatePicker
          selected={date}
          onChange={(date) => changeDate(date)}
          maxDate={new Date()}
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
        <Tab label="Raw Influent" {...a11yProps(0)} />
        <Tab label="Primary Clarifier Effluent" {...a11yProps(1)} />
        <Tab label="RBC Unit A" {...a11yProps(2)} />
        <Tab label="RBC Unit B" {...a11yProps(3)} />
        <Tab label="Secondary Clarifier Effluent" {...a11yProps(4)} />
        <Tab label="Final Effluent" {...a11yProps(5)} />
        <Tab label="Raw (primary) Sludge" {...a11yProps(6)} />
        <Tab label="Biogas" {...a11yProps(7)} />
        <Tab label="WAS (secondary sludge)" {...a11yProps(8)} />
        <Tab label="Digester Sludge" {...a11yProps(9)} />
      </Tabs>

      <TabPanel value={value} index={0}>
        {/* <Line
          data={lineChartData}
          options={{
            title: {
              display: true,
              text: 'Average Rainfall per month',
              fontSize: 20
            },
            legend: {
              display: true,
              position: 'right'
            }
          }}/> */}

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

        <Line
          data={lineChartData}
          options={{
            title: {
              display: true,
              text: "Average Rainfall per month",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "right",
            },
          }}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Primary Clarifier Effluent
      </TabPanel>
      <TabPanel value={value} index={2}>
        RBC Unit A
      </TabPanel>
      <TabPanel value={value} index={3}>
        RBC Unit B
      </TabPanel>
      <TabPanel value={value} index={4}>
        Secondary Clarifier Effluent
      </TabPanel>
      <TabPanel value={value} index={5}>
        Final Effluent
      </TabPanel>
      <TabPanel value={value} index={6}>
        Raw (primary) Sludge
      </TabPanel>
      <TabPanel value={value} index={7}>
        Biogas
      </TabPanel>
      <TabPanel value={value} index={8}>
        WAS (secondary sludge)
      </TabPanel>
      <TabPanel value={value} index={9}>
        Digester Sludge
      </TabPanel>
    </div>
  );
}

export default TabPage;
