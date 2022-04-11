import React from "react";
import classes from "../DisplayedItemContent.module.css";

function ScenarioButton(props) {
  return (
    <div
      className={`${classes.buttonstarttraining}`}
      onClick={() => {
        props.setPlayingScenario(true);
      }}
    >
      <div className={classes.buttontext}>
        {props.localizationData.scenariodescription.startbtn}
      </div>
    </div>
  );
}

export default ScenarioButton;
