import exiticon from "../../graphicassets/icons/backarrow_blue.svg";
import leftarrico from "../../graphicassets/icons/leftarrico.svg";
import rightarrico from "../../graphicassets/icons/rightarrico.svg";
import classes from "./ReturnNextPrev.module.css";

function ReturnNextPrevNav(props) {
  return (
    <div>
      <div
        className={classes.returnbutton}
        onClick={() => {
          props.setSelectedItem(null);
        }}
      >
        <img src={exiticon} className={classes.returnbuttonarrow} alt="."></img>
        <div className={classes.returnbuttontext}>
          {props.localizationData.scenariodescription.returnbtn}
        </div>
      </div>
      {props.selectedNextItem !== null ? (
        <div
          className={classes.nextbutton}
          onClick={() => {
            if (props.selectedNextItem !== null) {
              props.setSelectedItem(props.selectedNextItem);
              let scenarioselected = "scenarioselected";
              props.LogUserEvent(scenarioselected, props.selectedNextItem.id);
            }
          }}
        >
          <img src={rightarrico} className={classes.rightarrico} alt="."></img>
          <div className={classes.nextbuttontext}>
            {props.localizationData.scenariodescription.nextbtn}
          </div>
        </div>
      ) : (
        <div></div>
      )}
      {props.selectedPrevItem !== null ? (
        <div
          className={classes.prevbutton}
          onClick={() => {
            if (props.selectedPrevItem !== null) {
              props.setSelectedItem(props.selectedPrevItem);
              let scenarioselected = "scenarioselected";
              props.LogUserEvent(scenarioselected, props.selectedPrevItem.id);
            }
          }}
        >
          <img src={leftarrico} className={classes.leftarrico} alt="."></img>
          <div className={classes.prevbuttontext}>
            {props.localizationData.scenariodescription.prevbtn}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default ReturnNextPrevNav;
