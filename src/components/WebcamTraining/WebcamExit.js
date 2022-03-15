import React from "react";
import exiticon from "../../graphicassets/icons/backarrow-white.svg";
import classes from "./WebcamTraining.module.css";
import buttonclasses from "../UI/Button.module.css";

function WebcamExit(props) {
  return (
    <div
      className={`${buttonclasses.button} ${classes.webcamexitbtn}`}
      onClick={() => {
        props.setPlayingScenario(false);
        if (props.fullScreen === true) {
          props.switchFullScreen();
        }
      }}
    >
      <img src={exiticon} className={classes.webcamexit} alt="."></img>
      <div className={buttonclasses.buttontext}>
        {eval(
          "props.localizationData.webcamtraining.exit.text." +
            props.selectedLanguage
        )}
      </div>
    </div>
  );
}

export default WebcamExit;
