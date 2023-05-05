import exiticon from "../../../graphicassets/icons/backarrow_blue.svg";
import leftarrico from "../../../graphicassets/icons/leftarrico.svg";
import rightarrico from "../../../graphicassets/icons/rightarrico.svg";
import classes from "./ReturnNextPrev.module.css";
import { Fragment } from "react";
import { useState } from "react";
import React from "react";
import { AppHelper } from "../../../App";

function ReturnNextPrevNav(props) {
  // console.log(`returnNextPrevNav:`);
  // console.log(props);

  const [selectedNextItem, setSelectedNextItem] = useState(null);
  const [selectedPrevItem, setSelectedPrevItem] = useState(null);

  React.useEffect(() => {
    if (selectedNextItem === null && selectedPrevItem === null) {
      selectedNextPrev(
        props.selectedItemContent.id,
        props.selectedScenarioList
      );
    }
  }, [
    props.selectedItemContent,
    selectedNextItem,
    selectedPrevItem,
    props.selectedScenarioList,
  ]);

  function selectedNextPrev(id, selectedScenarioList) {
    // used to track the next and prev scenario for next-prev component buttons to work as intended:
    var scenarioListArrayNextPosition;
    var scenarioListArrayPrevPosition;

    for (let i = 0; i < selectedScenarioList.length; i++) {
      if (id === selectedScenarioList[i].scenario.id) {
        scenarioListArrayNextPosition = i + 1;
        scenarioListArrayPrevPosition = i - 1;

        setSelectedPrevItem(
          scenarioListArrayPrevPosition >= 0
            ? selectedScenarioList[scenarioListArrayPrevPosition].scenario
            : null
        );

        setSelectedNextItem(
          scenarioListArrayNextPosition <= selectedScenarioList.length - 1
            ? selectedScenarioList[scenarioListArrayNextPosition].scenario
            : null
        );
      }
    }
  }

  function ReturnButton() {
    props.setDisplayContentItem(false);
    props.setSelectedItemContent(null);
  }

  // Components:
  function RenderReturnButton() {
    return (
      <div className={classes.returnbutton} onClick={ReturnButton}>
        <img src={exiticon} className={classes.returnbuttonarrow} alt="."></img>
        <div className={classes.returnbuttontext}>
          {props.localizationData.scenariodescription.returnbtn}
        </div>
      </div>
    );
  }

  function RenderNextButton() {
    return (
      <div
        className={classes.nextbutton}
        onClick={() => {
          if (selectedNextItem !== null) {
            props.setSelectedItemContent(selectedNextItem);
            let scenarioselected = "scenarioselected";
            AppHelper.LogEvent(scenarioselected, selectedNextItem.id);
          }
        }}
      >
        <img src={rightarrico} className={classes.rightarrico} alt="."></img>
        <div className={classes.nextbuttontext}>
          {props.localizationData.scenariodescription.nextbtn}
        </div>
      </div>
    );
  }

  function RenderPrevButton() {
    return (
      <div
        className={classes.prevbutton}
        onClick={() => {
          if (selectedPrevItem !== null) {
            props.setSelectedItemContent(selectedPrevItem);
            let scenarioselected = "scenarioselected";
            AppHelper.LogEvent(scenarioselected, selectedPrevItem.id);
          }
        }}
      >
        <img src={leftarrico} className={classes.leftarrico} alt="."></img>
        <div className={classes.prevbuttontext}>
          {props.localizationData.scenariodescription.prevbtn}
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      <div className={classes.nextprevbackroundgrad}>
        <RenderReturnButton></RenderReturnButton>
        {selectedNextItem !== null ? (
          <RenderNextButton></RenderNextButton>
        ) : (
          <></>
        )}
        {selectedPrevItem !== null ? (
          <RenderPrevButton></RenderPrevButton>
        ) : (
          <div></div>
        )}
      </div>
    </Fragment>
  );
}

export default ReturnNextPrevNav;
