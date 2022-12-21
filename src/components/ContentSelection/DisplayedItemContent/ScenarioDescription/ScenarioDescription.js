import classes from "../DisplayedItemContent.module.css";
import scenarioclasses from "./ScenarioDescription.module.css";
import ScenarioButton from "./ScenarioButton";
import { AppHelper } from "../../../../App.js";
import ScenarioPreparationBox from "./ScenarioPreparationBox";
import CompletedCheckbox from "../CompletedCheckbox";

function ScenarioDescription(props) {
  return (
    <div className={classes.itemcontentcomponent}>
      <ScenarioButton
        setwebCamTrainingActive={props.setwebCamTrainingActive}
        localizationData={props.localizationData}
        selectedLanguage={props.selectedLanguage}
        selectedItemContent={props.selectedItemContent}
      ></ScenarioButton>

      <div className={scenarioclasses.itemcontenttophalf}>
        <div>
          <div className={scenarioclasses.checkbox}>
            <CompletedCheckbox
              setUserTrainingHistory={props.setUserTrainingHistory}
              userTrainingHistory={props.userTrainingHistory}
              selectedItemContent={props.selectedItemContent}
            ></CompletedCheckbox>
          </div>

          <div className={scenarioclasses.header}>
            {props.selectedItemContent.name[props.selectedLanguage]}
          </div>
          <div className={scenarioclasses.skills}>
            {props.selectedItemContent.skills[props.selectedLanguage]}
          </div>
          <div className={scenarioclasses.description}>
            {props.selectedItemContent.description[props.selectedLanguage]}
          </div>
        </div>
        <hr className={scenarioclasses.horizontalline}></hr>
        <div className={scenarioclasses.instructionheader}>
          {props.localizationData.scenariodescription.instructions}
        </div>
        <div className={scenarioclasses.instructiongrid}>
          <video
            className={scenarioclasses.scenarioimg}
            controls
            preload="metadata"
            src={`${AppHelper.storageUrl}laparoacademy-mediacontent/${props.selectedItemContent.id}_training.mp4`}
            type="video/mp4"
          >
            <track
              label={`${props.selectedLanguage}`}
              kind="subtitles"
              srcLang={`${props.selectedLanguage}`}
              src={`${AppHelper.storageUrl}laparoacademy-mediacontent/vvt/${props.selectedItemContent.id}_training_${props.selectedLanguage}.vtt`}
              default
            />
          </video>
          <div className={scenarioclasses.scenarioinstructions}>
            {props.selectedItemContent.instructions[props.selectedLanguage]}
          </div>
        </div>
        <ScenarioPreparationBox
          localizationData={props.localizationData}
          selectedItemContent={props.selectedItemContent}
          selectedLanguage={props.selectedLanguage}
        ></ScenarioPreparationBox>
      </div>
    </div>
  );
}

export default ScenarioDescription;
