import classes from "./DisplayedItemContent.module.css";
import ContentSection from "./ContentSection/ContentSection.js";
import ScenarioDescription from "./ScenarioDescription/ScenarioDescription.js";
import { Fragment } from "react";

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
      <Fragment>
        <ContentSection
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
        <div className={classes.scenariolistrightsidefiller}></div>
      </Fragment>
    );
  } else if (
    !props.selectedItemContent.content &&
    props.selectedItemContent.instructions
  ) {
    return (
      <Fragment>
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
        <div className={classes.scenariolistrightsidefiller}></div>
      </Fragment>
    );
  } else {
    return <div className={classes.itemcontentcomponent}>error?</div>;
  }
}

export default DisplayedItemContent;
