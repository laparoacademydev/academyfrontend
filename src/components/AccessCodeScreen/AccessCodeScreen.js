import classes from "./AccessCodeScreen.module.css";
import React, { useState } from "react";
import buttonclasses from "../UI/Button.module.css";
import { AppHelper } from "../../App";

function AccessCodeScreen(props) {
  const [code, setCode] = useState(false);
  const [error, setError] = useState(undefined);

  function handleChange(event) {
    setCode({ value: event.target.value });
  }

  return (
    <div className={classes.accesscodebackground}>
      <div className={classes.accesscodewindow}>
        <div className={classes.accesscodetext}>
          {error === undefined
            ? "Please submit the serial number of your Laparo device. You will find it on the device. If you can't find it, please contact us at academy@laparosimulators.com"
            : error}
        </div>
        <div
          className={classes.accesscode}
          onSubmit={(event) => {
            props.sendAccessCode(code.value, (err) => setError(err));
            event.preventDefault();
          }}
        >
          <form className={classes.accesscodeform} onChange={handleChange}>
            <input type="text"></input>
            <div
              className={`${buttonclasses.button}  ${classes.accesscodesubmitbtn}`}
              onClick={() => {
                props.sendAccessCode(code.value, (err) => setError(err));
              }}
            >
              <div
                className={`${buttonclasses.buttontext} ${classes.accesscodesubmitbtntext}`}
              >
                submit
              </div>
            </div>
            <div
              className={`${buttonclasses.button}  ${classes.accesscodelogoutbtn}`}
              onClick={function () {
                window.localStorage.removeItem("jwt");
                window.location.href = `${AppHelper.LoginUrl}`;
              }}
            >
              <div
                className={`${buttonclasses.buttontext} ${classes.accesscodesubmitbtntext}`}
              >
                Log Out
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AccessCodeScreen;
