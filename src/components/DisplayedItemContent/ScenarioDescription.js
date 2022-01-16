import classes from "./DisplayedItemContent.module.css";
import ScenarioButton from "./ScenarioButton";
import { AppHelper } from "./../../App.js";

function ScenarioDescription(props) {
  return (
    <div className={classes.itemcontentcomponent}>
      <div className={classes.itemcontenttophalf}>
        <div>
          <div className={classes.scenarioheader}>
            {props.selectedItemContent.name.en}
          </div>
          <div className={classes.scenarioskills}>
            {props.selectedItemContent.skills.en}
          </div>
          <div className={classes.scenariodescription}>
            {props.selectedItemContent.description.en}
          </div>
        </div>
        <hr className={classes.horizontalline}></hr>
        <div className={classes.scenarioinstructionheader}>Instructions</div>
        <div className={classes.scenarioinstructiongrid}>
          <video className={classes.scenarioimg} controls>
            <source
              src={`${AppHelper.storageUrl}laparoacademy-mediacontent/${props.selectedItemContent.id}_training.mp4`}
              // src={`${AppHelper.storageUrl}laparoacademy-videos/TM1_training.mp4`}
              type="video/mp4"
            />
          </video>
          <div className={classes.scenarioinstructions}>
            {props.selectedItemContent.instructions.en}
          </div>
        </div>
      </div>
      <div className={classes.scenariopreparationbox}>
        <div className={classes.scenariopreparationheader}>Preparation</div>
        <div className={classes.scenariopreptext}>
          {props.selectedItemContent.preparation.en}
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
