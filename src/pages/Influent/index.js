import React from "react";
import OutPutTableData from "../../components/OutPutTableData";

const InfluentCalculator = ({
  wwadf,
  tss,
  total,
  submitForm,
  setWwadf,
  setTss,
}) => {
  return (
    <div>
      <label>WWADF:</label>
      <br />
      <input value={wwadf} onChange={(e) => setWwadf(e.target.value)} />
      <br />
      <br />

      <label>TSS:</label>
      <br />
      <input value={tss} onChange={(e) => setTss(e.target.value)} />
      <br />
      <br />

      {/* <label>Total: {total}</label> */}
      <br />
      <br />

      <button onClick={submitForm}>Submit</button>
      <OutPutTableData />
    </div>
  );
};

export default InfluentCalculator;
