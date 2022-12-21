import classes from "./MainList.module.css";
import ScenarioItem from "./ScenarioItem";
import React from "react";
import ContentItem from "./ContentItem";
import { Fragment } from "react";

function MainList(props) {
  // console.log(props);

  if (
    props.selectedScenarioList === null ||
    props.selectedScenarioList === "undefined" ||
    props.selectedScenarioList.length === 0
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
                  setSelectedItemContent={props.setSelectedItemContent}
                  selectedLanguage={props.selectedLanguage}
                  userTrainingHistory={props.userTrainingHistory}
                  setDisplayContentItem={props.setDisplayContentItem}
                />
              );
            } else {
              return (
                <ContentItem
                  key={object.scenario.id}
                  selectedScenario={object.scenario}
                  setSelectedItemContent={props.setSelectedItemContent}
                  selectedLanguage={props.selectedLanguage}
                  userTrainingHistory={props.userTrainingHistory}
                  setDisplayContentItem={props.setDisplayContentItem}
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
