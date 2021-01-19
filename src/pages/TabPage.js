import React from "react";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import RawInfluent from "./RawInfluent/index";

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
  const [value, setValue] = React.useState(0);
  const [influentData, setInfluentData] = React.useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="flowRate" style={{ paddingLeft: 260 }}>
      <div className={"flowRate__inner"}>
        <h2>Greek Log Book</h2>
      </div>

      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs"
      >
        <Tab label="Raw Influent" {...a11yProps(0)} />
        <Tab label="Primary Clarifier Stage" {...a11yProps(1)} />
        <Tab label="RBC Stage" {...a11yProps(2)} />
        <Tab label="Secondary Clarifier Stage" {...a11yProps(3)} />
        <Tab label="Final Effluent" {...a11yProps(4)} />
        <Tab label="Anaerobic Digestion Stage" {...a11yProps(5)} />
      </Tabs>

      <TabPanel value={value} index={0}>
        <RawInfluent setInfluentData={setInfluentData} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Primary Clarifier Stage
        <br />
        {influentData && influentData.tss}
      </TabPanel>
      <TabPanel value={value} index={2}>
        RBC Stage
      </TabPanel>
      <TabPanel value={value} index={3}>
        Secondary Clarifier Stage
      </TabPanel>
      <TabPanel value={value} index={4}>
        Final Effluent
      </TabPanel>
      <TabPanel value={value} index={5}>
        Anaerobic Digestion Stage
      </TabPanel>
    </div>
  );
}

export default TabPage;
