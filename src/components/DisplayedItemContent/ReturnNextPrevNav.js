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
      <div
        className={classes.nextbutton}
        onClick={() => {
          if (props.selectedNextItem !== null) {
            props.setSelectedItem(props.selectedNextItem);
          }
        }}
      >
        <img src={rightarrico} className={classes.rightarrico} alt="."></img>
        <div className={classes.nextbuttontext}>
          {props.localizationData.scenariodescription.nextbtn}
        </div>
      </div>
      <div
        className={classes.prevbutton}
        onClick={() => {
          if (props.selectedPrevItem !== null) {
            props.setSelectedItem(props.selectedPrevItem);
          }
        }}
      >
        <img src={leftarrico} className={classes.leftarrico} alt="."></img>
        <div className={classes.prevbuttontext}>
          {props.localizationData.scenariodescription.prevbtn}
        </div>
      </div>
    </div>
  );
}

export default ReturnNextPrevNav;
