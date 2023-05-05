import React from "react";
import classes from "./LeftSidePanel.module.css";

function LeftSidePanelItem(props) {
  const CheckIfSelected = () => props.course.id === props.selectedCourseID;

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
