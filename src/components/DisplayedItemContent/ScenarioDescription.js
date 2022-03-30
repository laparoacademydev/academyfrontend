import classes from "./DisplayedItemContent.module.css";
import ScenarioButton from "./ScenarioButton";
import ReturnNextPrevNav from "./ReturnNextPrevNav";
import { AppHelper } from "./../../App.js";

function ScenarioDescription(props) {
  return (
    <div className={classes.itemcontentcomponent}>
      <ReturnNextPrevNav
        setSelectedItem={props.setSelectedItem}
        localizationData={props.localizationData}
        selectedNextItem={props.selectedNextItem}
        selectedPrevItem={props.selectedPrevItem}
      />
      <div className={classes.itemcontenttophalf}>
        <div>
          <div className={classes.scenarioheader}>
            {props.selectedItemContent.name[props.selectedLanguage]}
          </div>
          <div className={classes.scenarioskills}>
            {props.selectedItemContent.skills[props.selectedLanguage]}
          </div>
          <div className={classes.scenariodescription}>
            {props.selectedItemContent.description[props.selectedLanguage]}
          </div>
        </div>
        <hr className={classes.horizontalline}></hr>
        <div className={classes.scenarioinstructionheader}>
          {props.localizationData.scenariodescription.instructions}
        </div>
        <div className={classes.scenarioinstructiongrid}>
          <video
            className={classes.scenarioimg}
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
          <div className={classes.scenarioinstructions}>
            {props.selectedItemContent.instructions[props.selectedLanguage]}
          </div>
        </div>
      </div>
      <div className={classes.scenariopreparationbox}>
        <div className={classes.scenariopreparationheader}>
          {props.localizationData.scenariodescription.preparation}
        </div>
        <div className={classes.scenariopreptext}>
          {props.selectedItemContent.preparation[props.selectedLanguage]}
        </div>
        <img
          src={`${AppHelper.storageUrl}laparoacademy-mediacontent/${props.selectedItemContent.id}_preparation.jpg`}
          alt={"error"}
          className={classes.scenarioprepimg}
        ></img>

        <ScenarioButton
          setPlayingScenario={props.setPlayingScenario}
          localizationData={props.localizationData}
          selectedLanguage={props.selectedLanguage}
        ></ScenarioButton>
      </div>
    </div>
  );
}

export default ScenarioDescription;
