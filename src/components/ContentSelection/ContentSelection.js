import LeftSidePanel from "./LeftSidePanel/LeftSidePanel";
import { Fragment } from "react";
import { AppHelper } from "../../App";
import MainList from "./MainList/MainList";
import DisplayedItemContent from "./DisplayedItemContent/DisplayedItemContent";

function ContentSelection(props) {
  return (
    <Fragment>
      {props.selectedItem === null ||
      props.selectedItem === AppHelper.DefaultFreeTraining ? (
        <MainList
          selectedScenarioList={props.selectedScenarioList}
          setSelectedItem={props.setSelectedItem}
          selectedLanguage={props.selectedLanguage}
          LogUserEvent={props.LogUserEvent}
          userTrainingHistory={props.userTrainingHistory}
        ></MainList>
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
      <LeftSidePanel
        items={props.items}
        setCourseIdAndScenarioList={props.setCourseIdAndScenarioList}
        selectedCourseID={props.selectedCourseID}
        selectedLanguage={props.selectedLanguage}
        localizationData={props.localizationData}
        StartScenarioFreeTraining={props.StartScenarioFreeTraining}
      ></LeftSidePanel>
    </Fragment>
  );
}

export default ContentSelection;
