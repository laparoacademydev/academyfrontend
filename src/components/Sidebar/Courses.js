import classes from "./Sidebar.module.css";
import CourseItem from "./CourseItem";
import FreeTrainingItem from "./FreeTrainingItem";

function Courses(props) {
  return (
    <div className={classes.courses}>
      <div>
        {props.items.courses.map((course) => {
          return (
            <CourseItem
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

export default Courses;
