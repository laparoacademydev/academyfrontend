import classes from "./ScenarioList.module.css";
import ScenarioItem from "./ScenarioItem";
import React from "react";
import EducationItem from "./EducationItem";

function ScenarioList(props) {
  if (
    props.selectedScenarioList === null ||
    props.selectedScenarioList === "undefined"
  ) {
    return <div className={classes.spinner}></div>;
  } else {
    return (
      <div className={classes.scenariolist}>
        {props.selectedScenarioList.map((object) => {
          if (object.type === "scenario") {
            return (
              <ScenarioItem
                key={object.scenario.id}
                selectedScenario={object.scenario}
                setSelectedItem={props.setSelectedItem}
                selectedLanguage={props.selectedLanguage}
              />
            );
          } else {
            return (
              <EducationItem
                key={object.scenario.id}
                selectedScenario={object.scenario}
                setSelectedItem={props.setSelectedItem}
                selectedLanguage={props.selectedLanguage}
              />
            );
          }
        })}
        <div className={classes.scenariolistfiller}></div>
      </div>
    );
  }
}
export default ScenarioList;
