import React, { forwardRef } from "react";

const CustomDateInput = ({
  value,
  onClick,
  onPreviousDayClick,
  onNextDayClick,
}) => (
  <div className="datePickerInput" onClick={onClick}>
    <h2 className={"datePickerInput__left"} onClick={onPreviousDayClick}>
      G1
    </h2>

    <h3>{value}</h3>
    <h2 className={"datePickerInput__right"} onClick={onNextDayClick}>
      G2
    </h2>
  </div>
);

export default forwardRef(CustomDateInput);
