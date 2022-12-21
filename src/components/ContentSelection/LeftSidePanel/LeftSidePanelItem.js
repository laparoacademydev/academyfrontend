import classes from "./LeftSidePanel.module.css";

function LeftSidePanelItem(props) {
  function CheckIfSelected() {
    if (props.course.id === props.selectedCourseID) {
      return true;
    } else {
      return false;
    }
  }

  function SelectPanelItem() {
    props.setDisplayContentItem(false);
    props.RenderScenarioList(props.course);
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
        onClick={SelectPanelItem}
      >
        <div className={classes.courseitemdescription}>
          {props.course.name[props.selectedLanguage]}
        </div>
      </div>
    </div>
  );
}

export default LeftSidePanelItem;
