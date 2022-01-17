import classes from "./ScenarioList.module.css";
import ScenarioItem from "./ScenarioItem";
import React from "react";
import EducationItem from "./EducationItem";

function ScenarioList(props) {
  if (
    props.selectedScenarioList === null ||
    props.selectedScenarioList === "undefined"
  ) {
    return <div className={classes.scenariolist}>Loading!</div>;
  } else {
    return (
      <div className={classes.scenariolist}>
        <div>
          {props.selectedScenarioList.map((object) => {
            if (object.type === "scenario") {
              return (
                <ScenarioItem
                  key={object.scenario.id}
                  selectedScenario={object.scenario}
                  setSelectedCourseItem={props.setSelectedCourseItem}
                  selectedLanguage={props.selectedLanguage}
                />
              );
            } else {
              // console.log(object.scenario.id);
              return (
                <EducationItem
                  key={object.scenario.id}
                  selectedScenario={object.scenario}
                  setSelectedCourseItem={props.setSelectedCourseItem}
                  selectedLanguage={props.selectedLanguage}
                />
              );
            }
          })}
        </div>
      </div>
    );
  }
}
export default ScenarioList;
