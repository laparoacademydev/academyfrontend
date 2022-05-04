import classes from "./DisplayedItemContent.module.css";
import EducationSection from "./EducationSection/EducationSection.js";
import ScenarioDescription from "./ScenarioDescription/ScenarioDescription.js";

function DisplayedItemContent(props) {
  if (
    !props.selectedItemContent.content &&
    !props.selectedItemContent.instructions
  ) {
    return <div className={classes.itemcontentcomponent}>wait</div>;
  } else if (
    props.selectedItemContent.content &&
    !props.selectedItemContent.instructions
  ) {
    return (
      <EducationSection
        selectedItemContent={props.selectedItemContent}
        selectedLanguage={props.selectedLanguage}
        setSelectedItem={props.setSelectedItem}
        localizationData={props.localizationData}
        selectedNextItem={props.selectedNextItem}
        selectedPrevItem={props.selectedPrevItem}
        LogUserEvent={props.LogUserEvent}
        setUserTrainingHistory={props.setUserTrainingHistory}
        userTrainingHistory={props.userTrainingHistory}
        featureTestingMode={props.featureTestingMode}
        RemoveLogScenarioCompleted={props.RemoveLogScenarioCompleted}
      />
    );
  } else if (
    !props.selectedItemContent.content &&
    props.selectedItemContent.instructions
  ) {
    return (
      <ScenarioDescription
        selectedItemContent={props.selectedItemContent}
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
      />
    );
  } else {
    return <div className={classes.itemcontentcomponent}>error?</div>;
  }
}

export default DisplayedItemContent;
