import classes from "./LeftSidePanel.module.css";
import LeftSidePanelItem from "./LeftSidePanelItem";
import FreeTrainingItem from "./FreeTrainingItem";

function LeftSidePanel(props) {
  return (
    <div className={classes.courses}>
      <div>
        {props.items.courses.map((course) => {
          return (
            <LeftSidePanelItem
              key={course.id}
              course={course}
              setCourseIdAndScenarioList={props.setCourseIdAndScenarioList}
              selectedCourseID={props.selectedCourseID}
              selectedLanguage={props.selectedLanguage}
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
