import React from "react";
import "./OutPutTableData.scss";

import axios from "axios";

const OutPutTableData = ({ dataID }) => {
  const [output, setOutput] = React.useState({});
  React.useEffect(() => {
    getOutput();
  }, []);

  const getOutput = async () => {
    try {
      const response = await axios.get(`/api/v1/influent/${dataID}`);

      if (response.status === 200) {
        setOutput(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={"outPutTable"}>
      <label>OUTPUT DATA</label>
      <br />
      <p>wwadf: {output.wwadf}</p>
      <p>tss: {output.tss}</p>
    </div>
  );
};

export default OutPutTableData;
