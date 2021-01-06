import React from "react";
import OutPutTableData from "../../components/OutPutTableData";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import "./RawInfluent.scss";
import "../style.scss";

const RawInfluentCalculator = ({
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
    <div className={"form"}>
      <h4>Plant Influent After Grit Removal (24HC)</h4>
      <div className={"leftColumn"}>
        <div className={"form_input"}>
          <span className={"input__label"}> WWADF (m³/d):</span>

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
        {isSeeOutputData && <OutPutTableData dataID={dataID} />}
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
  );
};

export default RawInfluentCalculator;
