import classes from "./Sidebar.module.css";

function CourseItem(props) {
  return (
    <div
      className={
        props.course.id === props.selectedCourseID
          ? classes.courseitemselected
          : classes.courseitem
      }
      onClick={() => props.setCourseIdAndScenarioList(props.course)}
    >
      <div className={classes.courseitemdescription}>
        {props.course.name[props.selectedLanguage]}
      </div>
    </div>
  );
}

export default CourseItem;
