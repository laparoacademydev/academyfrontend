import React from "react";
import classes from "../DisplayedItemContent.module.css";
import chckboxyesicon from "../../../graphicassets/icons/chckboxyes_blue.svg";
import chckboxnoicon from "../../../graphicassets/icons/chckboxno_gray.svg";

function CompletedCheckBox(props) {
  function addScenarioID() {
    if (props.completedScenarios.includes(props.scenarioID) !== true) {
      props.setCompletedScenarios((state) => [...state, props.scenarioID]);
    } else {
      props.setCompletedScenarios(
        props.completedScenarios.filter((id) => id !== props.scenarioID)
      );
    }
  }

  return (
    <div className={classes.checkbox} onClick={addScenarioID}>
      {props.completedScenarios.includes(props.scenarioID) ? (
        <img src={chckboxyesicon} className={classes.checkboxno} alt="."></img>
      ) : (
        <img src={chckboxnoicon} className={classes.checkboxno} alt="."></img>
      )}
    </div>
  );
}

export default CompletedCheckBox;
