import React from "react";
import exiticon from "../../graphicassets/icons/backarrow_blue.svg";
import classes from "./WebcamExit.module.css";

function WebcamExit(props) {
  function WebcamExitButtonClick() {
    props.setPlayingScenario(false);
    if (props.fullScreen === true) {
      props.switchFullScreen();
    }
    props.LogUserEvent("endtraining", props.selectedItem.id);
  }

  return (
    <div className={`${classes.webcamexitbtn}`} onClick={WebcamExitButtonClick}>
      <img src={exiticon} className={classes.webcamexit} alt="."></img>
      <div className={classes.buttontxt}>
        {props.localizationData.webcamtraining.exit}
      </div>
    </div>
  );
}

export default WebcamExit;
