import classes from "./Courses.module.css";
import CourseItem from "./CourseItem";

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
      </div>
    </div>
  );
}

export default Courses;
