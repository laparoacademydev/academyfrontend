import classes from "./LeftSidePanel.module.css";

function LeftSidePanelItem(props) {
  function CheckIfSelected() {
    if (props.course.id === props.selectedCourseID) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div>
      <div
        className={
          CheckIfSelected()
            ? classes.courseitemgreenline
            : classes.courseitemnoline
        }
      ></div>

      <div
        className={
          CheckIfSelected() ? classes.courseitemselected : classes.courseitem
        }
        onClick={() => props.setCourseIdAndScenarioList(props.course)}
      >
        <div className={classes.courseitemdescription}>
          {props.course.name[props.selectedLanguage]}
        </div>
      </div>
    </div>
  );
}

export default LeftSidePanelItem;
