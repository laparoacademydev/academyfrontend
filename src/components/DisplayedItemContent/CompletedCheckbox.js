import React from "react";
import classes from "./DisplayedItemContent.module.css";
import checkboxno from "../../graphicassets/icons/chckboxno_gray.svg";
import checkboxyes from "../../graphicassets/icons/chckboxyes_green.svg";
import { useState } from "react";

function CompletedCheckbox(props) {
  const [checkboxComplete, setCheckboxComplete] = useState(null);

  React.useEffect(() => {
    if (props.userTrainingHistory.includes(props.selectedItemContent.id)) {
      setCheckboxComplete(true);
    } else {
      setCheckboxComplete(false);
    }
  }, [props.selectedItemContent.id]);

  function Checkbox() {
    if (
      props.userTrainingHistory.includes(props.selectedItemContent.id) &&
      checkboxComplete === true
    ) {
      let array = props.userTrainingHistory.filter(function (
        value,
        index,
        arr
      ) {
        return value !== props.selectedItemContent.id;
      });
      props.setUserTrainingHistory(array);
      setCheckboxComplete(false);
      props.RemoveLogScenarioCompleted(props.selectedItemContent.id);
    } else if (checkboxComplete === false) {
      let array = props.userTrainingHistory;
      array.push(props.selectedItemContent.id);
      props.setUserTrainingHistory(array);
      setCheckboxComplete(true);
      props.LogUserEvent("scenariocompleted", props.selectedItemContent.id);
    }
  }

  return (
    <div>
      <img
        onClick={Checkbox}
        src={checkboxComplete ? checkboxyes : checkboxno}
        className={classes.returnbuttonarrow}
        alt="."
      ></img>
    </div>
  );
}

export default CompletedCheckbox;
