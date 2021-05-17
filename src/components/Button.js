import React from "react";
import classNames from "classnames";
import { Button, CircularProgress } from "@material-ui/core";

import "./Button.scss";

export const UIButton = (props) => {
  let materialUIProps = { ...props };

  // delete props that are not relevant for the MUI component
  delete materialUIProps.loading;
  delete materialUIProps.label;
  delete materialUIProps.btnType;

  return (
    <Button
      className={classNames("btn", {
        [`btn--${props.btnType}`]: props.btnType,
      })}
      disableElevation
      {...materialUIProps}
    >
      <span>{!props.loading && props.label ? props.label : null}</span>
      {props.loading ? <CircularProgress size={21} /> : null}
    </Button>
  );
};

export default UIButton;
