import React from "react";
import exiticon from "../../graphicassets/icons/backarrow_blue.svg";
import classes from "./WebcamExit.module.css";
import { AppHelper } from "../../App";
import { Link } from "react-router-dom";

function WebcamExit(props) {
  function WebcamExitButtonClick() {
    // props.setwebCamTrainingActive(false);
    if (props.fullScreen === true) {
      props.switchFullScreen();
    }
    // AppHelper.LogEvent("endtraining", props.selectedItem.id);
  }

  return (
    <Link
      to="/"
      className={`${classes.webcamexitbtn}`}
      onClick={WebcamExitButtonClick}
    >
      <img src={exiticon} className={classes.webcamexit} alt="."></img>
      <div className={classes.buttontxt}>
        {props.localizationData.webcamtraining.exit}
      </div>
    </Link>
  );
}

export default WebcamExit;
