import React from "react";
import classes from "./AccessCodeScreen.module.css";
import { AppHelper } from "../../../App";
import buttonclasses from "../../UI/Button.module.css";

function AccessCodeLogout() {
  return (
    <div
      className={`${buttonclasses.button}  ${classes.accesscodelogoutbtn}`}
      onClick={() => {
        window.localStorage.removeItem("jwt");
        window.location.href = `${AppHelper.LoginUrl}`;
      }}
    >
      <div className={`${classes.logoutbtntext}`}>Log Out</div>
    </div>
  );
}

export default AccessCodeLogout;
