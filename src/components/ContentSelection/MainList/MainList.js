import classes from "./MainList.module.css";
import ScenarioItem from "./ScenarioItem";
import React from "react";
import ContentItem from "./ContentItem";
import { Fragment } from "react";

function MainList(props) {
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
                <ContentItem
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
export default MainList;
