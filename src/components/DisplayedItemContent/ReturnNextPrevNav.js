import exiticon from "../../graphicassets/icons/backarrow_blue.svg";
import classes from "./DisplayedItemContent.module.css";

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
        <div className={classes.prevbuttontext}>
          {props.localizationData.scenariodescription.prevbtn}
        </div>
      </div>
    </div>
  );
}

export default ReturnNextPrevNav;
