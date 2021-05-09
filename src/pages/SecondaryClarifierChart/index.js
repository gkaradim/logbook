import React, { useState } from "react";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import ChartPerL from "./ChartPerL";
import ChartPerKG from "./ChartPerKG";

import "../chartStyle.scss";

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

const SecondaryClarifierChart = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div className="reports">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs"
        >
          <Tab label="Per MG" {...a11yProps(0)} />
          <Tab label="Per KG" {...a11yProps(1)} />
        </Tabs>
        <h4>Secondary Clarifier After Grit Removal (24HC)</h4>
        <TabPanel value={value} index={0}>
          <ChartPerL />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ChartPerKG />
        </TabPanel>
      </div>
    </div>
  );
};

export default SecondaryClarifierChart;
