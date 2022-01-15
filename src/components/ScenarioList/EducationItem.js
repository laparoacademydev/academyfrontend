import classes from "./ScenarioList.module.css";
import React from "react";
// the Scenario Item is each Item on the Scenario list - we need to feed into this formatting information and feed it out to the ScenarioList

function EducationItem(props) {
  // console.log(props.selectedScenario[0]);

  return (
    <div
      className={classes.sleducationitem}
      onClick={() => props.setSelectedCourseItem(props.selectedScenario)}
    >
      <img
        src={`https://storageaccountacadea4e1.blob.core.windows.net/laparoacademy-images/edu_placeholder.png`}
        alt={"thumb error"}
        className={classes.scenariolistthumbimg}
      ></img>
      <div className={classes.sleducationtitle}>
        {props.selectedScenario.title.en}
      </div>
      <div className={classes.sleducationitemskills}>
        {props.selectedScenario.subTitle.en}
      </div>
      {/* <div
      // className="scenario-item__description"
      //onClick={() => props.setCourseId(props.id)}
      >
        {/* <h2>{props.title}</h2> */}
    </div>
  );
}

export default EducationItem;
