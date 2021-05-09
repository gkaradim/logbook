import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./Loader.scss";

export const Loader = ({ color, contained, className }) => {
  return (
    <div className={"loader " + className}>
      {contained ? (
        <div className="loader">
          <CircularProgress color={color} />
        </div>
      ) : (
        <CircularProgress color={color} />
      )}
    </div>
  );
};

Loader.defaultProps = {
  color: "primary",
  contained: true,
};

export default Loader;
