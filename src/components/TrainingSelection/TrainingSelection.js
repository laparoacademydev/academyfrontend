import classes from "./TrainingSelection.module.css";
import Courses from "../Courses/Courses";
import { Fragment } from "react";
import { AppHelper } from "../../App";
import ScenarioList from "../ScenarioList/ScenarioList";
import DisplayedItemContent from "../DisplayedItemContent/DisplayedItemContent";

function TrainingSelection(props) {
  return (
    <Fragment>
      {props.selectedItem === null ||
      props.selectedItem === AppHelper.DefaultFreeTraining ? (
        <ScenarioList
          selectedScenarioList={props.selectedScenarioList}
          setSelectedItem={props.setSelectedItem}
          selectedLanguage={props.selectedLanguage}
          LogUserEvent={props.LogUserEvent}
          userTrainingHistory={props.userTrainingHistory}
        ></ScenarioList>
      ) : (
        <DisplayedItemContent
          selectedItemContent={props.selectedItem}
          setPlayingScenario={props.setPlayingScenario}
          selectedLanguage={props.selectedLanguage}
          localizationData={props.localizationData}
          setSelectedItem={props.setSelectedItem}
          selectedNextItem={props.selectedNextItem}
          selectedPrevItem={props.selectedPrevItem}
          LogUserEvent={props.LogUserEvent}
          setUserTrainingHistory={props.setUserTrainingHistory}
          userTrainingHistory={props.userTrainingHistory}
          featureTestingMode={props.featureTestingMode}
          RemoveLogScenarioCompleted={props.RemoveLogScenarioCompleted}
        ></DisplayedItemContent>
      )}
      <Courses
        items={props.items}
        setCourseIdAndScenarioList={props.setCourseIdAndScenarioList}
        selectedCourseID={props.selectedCourseID}
        selectedLanguage={props.selectedLanguage}
        localizationData={props.localizationData}
        StartScenarioFreeTraining={props.StartScenarioFreeTraining}
      ></Courses>
    </Fragment>
  );
}

export default TrainingSelection;
