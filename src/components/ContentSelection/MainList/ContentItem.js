import classes from "./MainList.module.css";
import React from "react";
import { AppHelper } from "../../../App.js";
import { useState } from "react";
import passedico from "../../../graphicassets/icons/passed_ico.svg";
import todoico from "../../../graphicassets/icons/todo_ico.svg";
import eduico from "../../../graphicassets/icons/eduico_white.svg";

function EducationItem(props) {
  const [scenarioInHistory, setScenarioInHistory] = useState(null);

  if (scenarioInHistory === null) {
    setScenarioInHistory(
      props.userTrainingHistory.includes(props.selectedScenario.id)
    );
  }

  function SelectItem() {
    props.setSelectedItemContent(props.selectedScenario);
    props.setDisplayContentItem(true);
    AppHelper.LogEvent("eduselected", props.selectedScenario.id);
  }

  return (
    <div className={classes.scenariolistitem} onClick={SelectItem}>
      <div className={classes.listthumb}>
        <img src={eduico} className={classes.eduico} alt={"."}></img>
        <img
          src={`${AppHelper.storageUrl}laparoacademy-mediacontent/edu_placeholder.png`}
          alt={"thumb error"}
          className={classes.listthumbimg}
        ></img>
      </div>

      <div className={classes.sleducationtitle}>
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
