import classes from "./ScenarioList.module.css";
import React from "react";
import { AppHelper } from "./../../App.js";
import eduicon from "../../graphicassets/icons/edu_blue.svg";

function EducationItem(props) {
  return (
    <div
      className={classes.sleducationitem}
      onClick={() => {
        props.setSelectedItem(props.selectedScenario);
        let eduselected = "eduselected";
        props.LogUserEvent(eduselected, props.selectedScenario.id);
      }}
    >
      <img
        src={`${AppHelper.storageUrl}laparoacademy-mediacontent/edu_placeholder.png`}
        alt={"thumb error"}
        className={classes.scenariolistthumbimg}
      ></img>
      <div className={classes.sleducationtitle}>
        <img src={eduicon} alt="." />
        {props.selectedScenario.title.text[props.selectedLanguage]}
      </div>
      <div className={classes.sleducationitemskills}>
        {props.selectedScenario.subTitle.text[props.selectedLanguage]}
      </div>
    </div>
  );
}

export default EducationItem;
