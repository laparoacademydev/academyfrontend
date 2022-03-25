import classes from "./ScenarioList.module.css";
import React from "react";
import { AppHelper } from "./../../App.js";

function EducationItem(props) {
  return (
    <div
      className={classes.sleducationitem}
      onClick={() => props.setSelectedItem(props.selectedScenario)}
    >
      <img
        src={`${AppHelper.storageUrl}laparoacademy-mediacontent/edu_placeholder.png`}
        alt={"thumb error"}
        className={classes.scenariolistthumbimg}
      ></img>
      <div className={classes.sleducationtitle}>
        {props.selectedScenario.title[props.selectedLanguage]}
      </div>
      <div className={classes.sleducationitemskills}>
        {props.selectedScenario.subTitle[props.selectedLanguage]}
      </div>
    </div>
  );
}

export default EducationItem;
