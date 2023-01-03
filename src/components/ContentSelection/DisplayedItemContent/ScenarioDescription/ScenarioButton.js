import React from "react";
import classes from "../DisplayedItemContent.module.css";
import { AppHelper } from "../../../../App";
import { Link } from "react-router-dom";

function ScenarioButton(props) {
  function ScenarioButtonClick() {
    props.setwebCamTrainingActive(true);
    AppHelper.LogEvent("scenariostart", props.selectedItemContent.id);
  }

  return (
    <Link
      to="/webcamtraining"
      className={`${classes.buttonstarttraining}`}
      onClick={ScenarioButtonClick}
    >
      <div className={classes.buttontext}>
        {props.localizationData.scenariodescription.startbtn}
      </div>
    </Link>
  );
}

export default ScenarioButton;
