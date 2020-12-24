import React from "react";
import OutPutTableData from "../../components/OutPutTableData";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import "./Influent.scss";

const InfluentCalculator = ({
  wwadf,
  tss,
  data,
  submitForm,
  setWwadf,
  setTss,
  isSeeOutputData,
  dataID,
}) => {
  return (
    <div>
      <br />
      <span> WWADF (m³/d)</span>
      <TextField
        id="filled-number"
        // label="WWADF (m³/d)"
        type="number"
        variant="filled"
        value={wwadf}
        onChange={(e) => setWwadf(e.target.value)}
        disabled={data}
      />

      <br />
      <br />

      <br />
      <TextField
        id="filled-number"
        label="TSS (mg/L)"
        type="number"
        variant="filled"
        value={tss}
        onChange={(e) => setTss(e.target.value)}
        disabled={data}
      />

      <br />
      <br />

      {/* <label>Total: {total}</label> */}
      <br />
      <br />
      <Button
        variant="outlined"
        size="medium"
        color="primary"
        onClick={submitForm}
      >
        Submit
      </Button>
      {isSeeOutputData && <OutPutTableData dataID={dataID} />}
    </div>
  );
};

export default InfluentCalculator;
