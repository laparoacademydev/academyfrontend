import classes from "./Courses.module.css";
import lapico from "../../graphicassets/icons/freestart_ico.svg";

function FreeTrainingItem(props) {
  return (
    <div
      onClick={props.StartScenarioFreeTraining}
      className={classes.freetrainingitem}
    >
      <div className={classes.fthorizontalline}></div>
      <div className={classes.courseitemdescription}>
        <img src={lapico} alt="."></img>
        <div>{props.localizationData.courses.startscenariofree}</div>
      </div>
    </div>
  );
}

export default FreeTrainingItem;
