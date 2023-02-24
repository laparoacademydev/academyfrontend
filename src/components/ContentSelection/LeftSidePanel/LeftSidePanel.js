import React from "react";
import classes from "./LeftSidePanel.module.css";
import LeftSidePanelItem from "./LeftSidePanelItem";
import FreeTrainingItem from "./FreeTrainingItem";

function LeftSidePanel(props) {
  return (
    <div className={classes.courses}>
      <div>
        {props.courses.courses.map((course) => {
          return (
            <LeftSidePanelItem
              key={course.id}
              course={course}
              RenderScenarioList={props.RenderScenarioList}
              selectedCourseID={props.selectedCourseID}
              selectedLanguage={props.selectedLanguage}
              setDisplayContentItem={props.setDisplayContentItem}
            />
          );
        })}
        <FreeTrainingItem
          localizationData={props.localizationData}
          StartScenarioFreeTraining={props.StartScenarioFreeTraining}
        ></FreeTrainingItem>
        <div className={classes.sidebarfiller}></div>
      </div>
    </div>
  );
}

export default LeftSidePanel;
