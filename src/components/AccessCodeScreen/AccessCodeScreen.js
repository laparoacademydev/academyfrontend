import classes from "./AccessCodeScreen.module.css";
import React, { useState } from "react";
import AccessCodeLogout from "./AccessCodeLogout";
import AccessCodeSubmit from "./AccessCodeSubmit";
import { Fragment } from "react";
import LaparoSticker from "./LaparoSticker";

function AccessCodeScreen(props) {
  const [error, setError] = useState(undefined);
  const [code, setCode] = useState(false);
  function handleChange(event) {
    setCode({ value: event.target.value });
  }

  return (
    <Fragment>
      <LaparoSticker></LaparoSticker>
      <div className={classes.accesscodebackground}>
        <div className={classes.accesscodewindow}>
          <div className={classes.accesscodetext}>
            {error === undefined
              ? "Please submit the product number of your Laparo device. See example below. If you can't find it, please contact us at academy@laparosimulators.com"
              : error}
          </div>
          <AccessCodeSubmit
            sendAccessCode={props.sendAccessCode}
            accessCodeError={props.accessCodeError}
            code={code}
            handleChange={handleChange}
            setCode={setCode}
          />

          <AccessCodeLogout />
          {props.accessCodeError ? (
            <div className={classes.erroraccesscodetext}>
              Sorry, your access code is not valid.
            </div>
          ) : null}
        </div>
      </div>
    </Fragment>
  );
}

export default AccessCodeScreen;
