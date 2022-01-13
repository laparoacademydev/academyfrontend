import classes from "./CourseItem.module.css";

function CourseItem(props) {
  return (
    <div
      className={
        props.course.id === props.selectedCourseID
          ? classes.courseitemselected
          : classes.courseitem
      }
    >
      <div
        className={classes.courseitemdescription}
        onClick={() => props.setCourseIdAndScenarioList(props.course)}
      >
        <div>{props.course.name.en}</div>
      </div>
    </div>
  );
}

export default CourseItem;
