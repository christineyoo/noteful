import React from "react";
import "./ValidationError.css";

export default function ValidationError(props) {
  if (props.message) {
    return <span className="error">{props.message}</span>;
  }
  return <></>;
}
