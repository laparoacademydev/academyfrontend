import classes from "./ScenarioList.module.css";
import React from "react";
import { AppHelper } from "./../../App.js";
import eduicon from "../../graphicassets/icons/edu_blue.svg";
import { useState } from "react";
import passedico from "../../graphicassets/icons/passed_ico.svg";
import todoico from "../../graphicassets/icons/todo_ico.svg";

function EducationItem(props) {
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
      <img
        src={scenarioInHistory ? passedico : todoico}
        alt={"."}
        className={classes.passedico}
      ></img>
    </div>
  );
}

export default EducationItem;
