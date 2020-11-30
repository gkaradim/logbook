import React from "react";
import "./OutPutTableData.scss";

const OutPutTableData = () => {
  React.useEffect(() => {
    //Explain the diferrence
    // getLogs(id)
    //   .then((res) => {
    //     setData(res.data);
    //   })
    //   .catch((err) => {
    //     toast.error(getErrorMessage(err));
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
    // try {
    //   const response = await axios.get(
    //   );
    //   const resData = response.data;
    //   if (resData.status) {
    //     setData(resData.data);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    //eslint-disable-next-line
  }, []);

  return (
    <div className={"outPutTable"}>
      <label>OUTPUT DATA</label>
      <br />
    </div>
  );
};

export default OutPutTableData;
