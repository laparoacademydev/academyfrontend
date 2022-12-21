import React from "react";
import classes from "../DisplayedItemContent.module.css";
import { AppHelper } from "../../../../App";

function ScenarioButton(props) {
  return (
    <div
      className={`${classes.buttonstarttraining}`}
      onClick={() => {
        props.setwebCamTrainingActive(true);
        var scenariostart = "scenariostart";
        AppHelper.LogEvent(scenariostart, props.selectedItemContent.id);
      }}
    >
      <div className={classes.buttontext}>
        {props.localizationData.scenariodescription.startbtn}
      </div>
    </div>
  );
}

export default ScenarioButton;
