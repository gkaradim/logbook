import React from "react";
import OutPutTableData from "../../components/OutPutTableData";

const InfluentCalculator = ({
  wwadf,
  tss,
  total,
  submitForm,
  setWwadf,
  setTss,
  isSeeOutputData,
  dataID
}) => {
  return (
    <div>
      <label>WWADF:</label>
      <br />
      <input type="number" value={wwadf} onChange={(e) => setWwadf(e.target.value)} />
      <br />
      <br />

      <label>TSS:</label>
      <br />
      <input type="number" value={tss} onChange={(e) => setTss(e.target.value)} />
      <br />
      <br />

      {/* <label>Total: {total}</label> */}
      <br />
      <br />

      <button onClick={submitForm}>Submit</button>
      {isSeeOutputData && <OutPutTableData dataID={dataID} />}
    </div>
  );
};

export default InfluentCalculator;
