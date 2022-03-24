import exiticon from "../../graphicassets/icons/backarrow_blue.svg";
import classes from "./DisplayedItemContent.module.css";

function ReturnButton(props) {
  return (
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
  );
}

export default ReturnButton;
