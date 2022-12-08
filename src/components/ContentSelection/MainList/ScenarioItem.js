import classes from "./MainList.module.css";
import React from "react";
import { AppHelper } from "../../../App.js";
import { useState } from "react";
import passedico from "../../../graphicassets/icons/passed_ico.svg";
import todoico from "../../../graphicassets/icons/todo_ico.svg";

function ScenarioItem(props) {
  const [scenarioInHistory, setScenarioInHistory] = useState(null);

  if (scenarioInHistory === null) {
    setScenarioInHistory(
      props.userTrainingHistory.includes(props.selectedScenario.id)
    );
  }

  return (
    <div
      className={classes.scenariolistitem}
      onClick={() => {
        props.setSelectedItem(props.selectedScenario);
        let scenarioselected = "scenarioselected";
        props.LogUserEvent(scenarioselected, props.selectedScenario.id);
      }}
    >
      <div className={classes.listthumb}>
        <img
          src={`${AppHelper.storageUrl}laparoacademy-mediacontent/${props.selectedScenario.id}_thumb.jpg`}
          alt={"thumb error"}
          className={classes.listthumbimg}
        ></img>
      </div>

      <div className={classes.slscenariotitle}>
        {props.selectedScenario.name[props.selectedLanguage]}
      </div>
      <div className={classes.slscenarioskill}>
        {props.selectedScenario.skills[props.selectedLanguage]}
      </div>
      <img
        src={scenarioInHistory ? passedico : todoico}
        alt={"."}
        className={classes.passedico}
      ></img>
    </div>
  );
}

export default ScenarioItem;
