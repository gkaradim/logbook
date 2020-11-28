import React from "react";

const CalculatorOne = ({ wwadf, tss, total, submitForm, setWwadf, setTss }) => {
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

      <label>Total: {total}</label>
      <br />
      <br />

      <button onClick={submitForm}>Submit</button>
    </div>
  );
};

export default CalculatorOne;
