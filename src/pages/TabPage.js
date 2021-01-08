import React from "react";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import RawInfluentCalculator from "./RawInfluent/index";

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
        <RawInfluentCalculator setInfluentData={setInfluentData} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Primary Clarifier Effluent<br/>
        {influentData && influentData.tss}
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
