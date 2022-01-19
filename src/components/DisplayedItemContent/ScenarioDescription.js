import classes from "./DisplayedItemContent.module.css";
import ScenarioButton from "./ScenarioButton";
import { AppHelper } from "./../../App.js";

function ScenarioDescription(props) {
  return (
    <div className={classes.itemcontentcomponent}>
      <div className={classes.itemcontenttophalf}>
        <div>
          <div className={classes.scenarioheader}>
            {eval("props.selectedItemContent.name." + props.selectedLanguage)}
          </div>
          <div className={classes.scenarioskills}>
            {eval("props.selectedItemContent.skills." + props.selectedLanguage)}
          </div>
          <div className={classes.scenariodescription}>
            {eval(
              "props.selectedItemContent.description." + props.selectedLanguage
            )}
          </div>
        </div>
        <hr className={classes.horizontalline}></hr>
        <div className={classes.scenarioinstructionheader}>Instructions</div>
        <div className={classes.scenarioinstructiongrid}>
          <video className={classes.scenarioimg} controls preload="metadata">
            <source
              src={`${AppHelper.storageUrl}laparoacademy-mediacontent/${props.selectedItemContent.id}_training.mp4`}
              // src={`${AppHelper.storageUrl}laparoacademy-videos/TM1_training.mp4`}
              type="video/mp4"
            />
            <track
              label={`${props.selectedLanguage}`}
              kind="subtitles"
              srclang={`${props.selectedLanguage}`}
              src={`${AppHelper.storageUrl}laparoacademy-mediacontent/vvt/${props.selectedItemContent.id}_training_${props.selectedLanguage}.vtt`}
              default
            />
          </video>
          <div className={classes.scenarioinstructions}>
            {eval(
              "props.selectedItemContent.instructions." + props.selectedLanguage
            )}
          </div>
        </div>
      </div>
      <div className={classes.scenariopreparationbox}>
        <div className={classes.scenariopreparationheader}>Preparation</div>
        <div className={classes.scenariopreptext}>
          {eval(
            "props.selectedItemContent.preparation." + props.selectedLanguage
          )}
        </div>
        <img
          src={`${AppHelper.storageUrl}laparoacademy-mediacontent/${props.selectedItemContent.id}_preparation.jpg`}
          alt={"error"}
          className={classes.scenarioprepimg}
        ></img>

        <ScenarioButton
          setPlayingScenario={props.setPlayingScenario}
        ></ScenarioButton>
      </div>
    </div>
  );
}

export default ScenarioDescription;
