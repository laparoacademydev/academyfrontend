import React, { Fragment } from "react";
import classes from "./AccessCodePromptDismiss.module.css";
import buttonclasses from "../../UI/Button.module.css";

function AccessCodePromptDismiss(props) {
  function checkDate(firstdate) {
    let dateNow = new Date();
    let dateDifference = dateNow - new Date(firstdate);
    let daysDifference = Math.floor(dateDifference / (1000 * 60 * 60 * 24));

    if (daysDifference >= 14) {
      return (
        <div className={`${buttonclasses.button}  ${classes.deadbutton}`}>
          <div className={`${classes.btntext}`}>
            {props.localizationData.accesscodeprompt.dismissbutton}
          </div>
        </div>
      );
    } else {
      return (
        <div
          className={`${buttonclasses.button}  ${classes.button}`}
          onClick={() => {
            props.setAccessCodePrompt(false);
          }}
        >
          <div className={`${classes.btntext}`}>
            {props.localizationData.accesscodeprompt.dismissbutton}
          </div>
        </div>
      );
    }
  }

  return <Fragment>{checkDate(props.firstLoginDate)}</Fragment>;
}

export default AccessCodePromptDismiss;
