import React, { Fragment, useState } from "react";
import AccessCodePromptSubmit from "./AccessCodePromptSubmit";
import LaparoPromptSticker from "./LaparoPromptSticker";
import AccessCodePromptDismiss from "./AccessCodePromptDismiss";
import classes from "./AccessCodePrompt.module.css";

function AccessCodePrompt(props) {
  const localization = props.localizationData.accesscodeprompt;
  const firstdate = Date.parse(props.firstLoginDate);
  const [error, setError] = useState(undefined);
  const [code, setCode] = useState(false);

  function handleChange(event) {
    setCode({ value: event.target.value });
  }

  function TrialModePrompt(firstlogindate) {
    let dateNow = new Date();
    let dateDifference = dateNow - new Date(firstlogindate);
    let daysDifference = Math.floor(dateDifference / (1000 * 60 * 60 * 24));

    let dateFourteenDaysAhead = new Date(
      firstlogindate + 14 * 24 * 60 * 60 * 1000
    )
      .toISOString()
      .substring(0, 10);

    if (daysDifference >= 14) {
      return (
        <div className={classes.accesscodetext}>
          {localization.expiredtrialmode}
          {"   "}
          {dateFourteenDaysAhead}
        </div>
      );
    } else if (daysDifference < 14) {
      return (
        <div className={classes.accesscodetext}>
          {localization.trialmodeactive}
          {"   "}
          {dateFourteenDaysAhead}
        </div>
      );
    }
  }

  return (
    <Fragment>
      <div className={classes.accesscodebackground}>
        <div className={classes.accesscodewindow}>
          <div className={classes.accesscodetitle}>Warning</div>
          {TrialModePrompt(firstdate)}

          <div className={classes.accesscodetext}>
            {localization.information}
          </div>
          <AccessCodePromptSubmit
            sendAccessCode={props.sendAccessCode}
            localizationData={props.localizationData}
            handleChange={handleChange}
            accessCodeError={props.accessCodeError}
            code={code}
            setCode={setCode}
          ></AccessCodePromptSubmit>
          <AccessCodePromptDismiss
            firstLoginDate={firstdate}
            setAccessCodePrompt={props.setAccessCodePrompt}
            accessCodePrompt={props.accessCodePrompt}
            localizationData={props.localizationData}
          ></AccessCodePromptDismiss>
          <LaparoPromptSticker></LaparoPromptSticker>
          {props.accessCodeError ? (
            <div className={classes.erroraccesscodetext}>
              Sorry, your access code is not valid.
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default AccessCodePrompt;
