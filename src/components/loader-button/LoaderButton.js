import React from "react";

import "./LoaderButton.css";
import Button from "@material-ui/core/Button";

export default function LoaderButton() {
  const buttonStyle = {
    background: "#2957ba",
    color: "#f1f1f1",
    display: "inline-block",
    fontSize: "14px",
    margin: "10px 0",
    width: "100%",
    fontWeight: "normal",
    textTransform: "Capitalize",
    borderRadius: "2px",
  };

  return <Button className='loaderButton' style={buttonStyle}>Ver Más</Button>;
}
