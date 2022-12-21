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

  function SelectItem() {
    // console.log("SelectItem clicked");
    // console.log(props.selectedScenario);
    props.setSelectedItemContent(props.selectedScenario);
    props.setDisplayContentItem(true);
    let scenarioselected = "scenarioselected";
    AppHelper.LogEvent(scenarioselected, props.selectedScenario.id);
  }

  return (
    <div className={classes.scenariolistitem} onClick={SelectItem}>
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
