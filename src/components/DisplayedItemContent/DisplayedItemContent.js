import classes from "./DisplayedItemContent.module.css";
import EducationSection from "./EducationSection.js";
import ScenarioDescription from "./ScenarioDescription.js";

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
      />
    );
  } else {
    return <div className={classes.itemcontentcomponent}>error?</div>;
  }
}

export default DisplayedItemContent;
