import React from "react";
import buttonclasses from "../UI/Button.module.css";
import classes from "./DisplayedItemContent.module.css";

function ScenarioButton(props) {
  return (
    <div
      className={`${buttonclasses.button} ${classes.buttonstarttraining}`}
      onClick={() => {
        props.setPlayingScenario(true);
      }}
    >
      <div className={buttonclasses.buttontext}>
        {eval(
          "props.localizationData.scenariodescription.startbtn.text." +
            props.selectedLanguage
        )}
      </div>
    </div>
  );
}

export default ScenarioButton;
