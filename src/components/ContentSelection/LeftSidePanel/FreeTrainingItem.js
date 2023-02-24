import React from "react";
import classes from "./LeftSidePanel.module.css";
import lapico from "../../../graphicassets/icons/freestart_ico.svg";
import { Link } from "react-router-dom";

function FreeTrainingItem(props) {
  return (
    <Link
      to="/webcamtraining?id=freetraining"
      onClick={props.StartScenarioFreeTraining}
      className={classes.freetrainingitem}
    >
      <div className={classes.fthorizontalline}></div>
      <div className={classes.courseitemdescription}>
        <img src={lapico} alt="."></img>
        <div>{props.localizationData.courses.startscenariofree}</div>
      </div>
    </Link>
  );
}

export default FreeTrainingItem;
