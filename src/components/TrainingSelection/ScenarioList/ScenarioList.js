import classes from "./ScenarioList.module.css";
import ScenarioItem from "./ScenarioItem";
import React from "react";
import EducationItem from "./EducationItem";
import { Fragment } from "react";

function ScenarioList(props) {
  if (
    props.selectedScenarioList === null ||
    props.selectedScenarioList === "undefined"
  ) {
    return <div className={classes.spinner}></div>;
  } else {
    return (
      <Fragment>
        <div className={classes.scenariolist}>
          {props.selectedScenarioList.map((object) => {
            if (object.type === "scenario") {
              return (
                <ScenarioItem
                  key={object.scenario.id}
                  selectedScenario={object.scenario}
                  setSelectedItem={props.setSelectedItem}
                  selectedLanguage={props.selectedLanguage}
                  LogUserEvent={props.LogUserEvent}
                  userTrainingHistory={props.userTrainingHistory}
                />
              );
            } else {
              return (
                <EducationItem
                  key={object.scenario.id}
                  selectedScenario={object.scenario}
                  setSelectedItem={props.setSelectedItem}
                  selectedLanguage={props.selectedLanguage}
                  LogUserEvent={props.LogUserEvent}
                  userTrainingHistory={props.userTrainingHistory}
                />
              );
            }
          })}
          <div className={classes.scenariolistfiller}></div>
        </div>
        <div className={classes.scenariolistrightsidefiller}></div>
      </Fragment>
    );
  }
}
export default ScenarioList;
