import React, {useContext} from "react";
import { createPortal } from "react-dom";
import { UserContext } from "./hooks/userContext";

import "./App.css";

const AlertContainer = document.getElementById("alert");

const Alert = () => {
  const { alert } = useContext(UserContext);
  return createPortal(
    <>
      {alert.status && <div className="alert">
          <p>{alert.message}</p>
      </div>}
    </>,
    AlertContainer
  );
};

export default Alert;
