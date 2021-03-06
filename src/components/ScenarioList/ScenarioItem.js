import classes from "./ScenarioList.module.css";
import React from "react";
import { AppHelper } from "./../../App.js";

function ScenarioItem(props) {
  return (
    <div
      className={classes.scenariolistitem}
      onClick={() => {
        props.setSelectedItem(props.selectedScenario);
        let scenarioselected = "scenarioselected";
        props.LogUserEvent(scenarioselected, props.selectedScenario.id);
      }}
    >
      <img
        src={`${AppHelper.storageUrl}laparoacademy-mediacontent/${props.selectedScenario.id}_thumb.jpg`}
        alt={"thumb error"}
        className={classes.scenariolistthumbimg}
      ></img>
      <div className={classes.slscenariotitle}>
        {props.selectedScenario.name[props.selectedLanguage]}
      </div>
      <div className={classes.slscenarioskill}>
        {props.selectedScenario.skills[props.selectedLanguage]}
      </div>
    </div>
  );
}

export default ScenarioItem;
