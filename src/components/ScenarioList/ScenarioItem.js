import classes from "./ScenarioList.module.css";
import React from "react";
// the Scenario Item is each Item on the Scenario list - we need to feed into this formatting information and feed it out to the ScenarioList

function ScenarioItem(props) {
  return (
    <div
      className={classes.scenariolistitem}
      onClick={() => props.setSelectedCourseItem(props.selectedScenario)}
    >
      <img
        src={`https://storageaccountacadea4e1.blob.core.windows.net/laparoacademy-images/thumbnail/${props.selectedScenario.id}_thumbnail.jpg`}
        alt={"thumb error"}
        className={classes.scenariolistthumbimg}
      ></img>
      <div className={classes.slscenariotitle}>
        {props.selectedScenario.name.en}
      </div>
      <div className={classes.slscenarioskill}>
        {props.selectedScenario.skills.en}
      </div>
    </div>
  );
}

export default ScenarioItem;
