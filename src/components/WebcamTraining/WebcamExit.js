import React from "react";
import exiticon from "../../graphicassets/icons/backarrow_blue.svg";
import classes from "./WebcamTraining.module.css";

function WebcamExit(props) {
  return (
    <div
      className={`${classes.webcamexitbtn}`}
      onClick={() => {
        props.setPlayingScenario(false);
        if (props.fullScreen === true) {
          props.switchFullScreen();
        }
      }}
    >
      <img src={exiticon} className={classes.webcamexit} alt="."></img>
      <div className={classes.buttontxt}>
        {props.localizationData.webcamtraining.exit}
      </div>
    </div>
  );
}

export default WebcamExit;
