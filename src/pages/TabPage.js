import React from "react";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import RawInfluent from "./RawInfluent";
import PrimaryClarifier from "./PrimaryClarifier";
import Rbc from "./RBC";
import SecondaryClarifier from "./SecondaryClarifier";
import FinalEffluent from "./FinalEffluent";
import AnaerobicDigestion from "./AnaerobicDigestion";

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="flowRate">
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
        <RawInfluent />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PrimaryClarifier />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Rbc />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <SecondaryClarifier />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <FinalEffluent />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <AnaerobicDigestion />
      </TabPanel>
    </div>
  );
}

export default TabPage;
