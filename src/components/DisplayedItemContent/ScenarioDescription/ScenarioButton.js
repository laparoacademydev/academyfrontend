import React from "react";
import buttonclasses from "../../UI/Button.module.css";
import classes from "../DisplayedItemContent.module.css";

function ScenarioButton(props) {
  return (
    <div
      className={`${buttonclasses.button} ${classes.buttonstarttraining}`}
      onClick={() => {
        props.setPlayingScenario(true);
      }}
    >
      <div className={buttonclasses.buttontext}>
        {props.localizationData.scenariodescription.startbtn}
      </div>
    </div>
  );
}

export default ScenarioButton;
