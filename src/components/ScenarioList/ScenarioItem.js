import classes from "./ScenarioList.module.css";
import React from "react";
import { AppHelper } from "./../../App.js";

function ScenarioItem(props) {
  return (
    <div
      className={classes.scenariolistitem}
      onClick={() => props.setSelectedCourseItem(props.selectedScenario)}
    >
      <img
        src={`${AppHelper.storageUrl}laparoacademy-mediacontent/${props.selectedScenario.id}_thumb.jpg`}
        alt={"thumb error"}
        className={classes.scenariolistthumbimg}
      ></img>
      <div className={classes.slscenariotitle}>
        {eval("props.selectedScenario.name." + props.selectedLanguage)}
      </div>
      <div className={classes.slscenarioskill}>
        {eval("props.selectedScenario.skills." + props.selectedLanguage)}
      </div>
    </div>
  );
}

export default ScenarioItem;
