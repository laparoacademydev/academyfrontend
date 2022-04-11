import classes from "./ScenarioPreparationBox.module.css";
import { AppHelper } from "../../../App.js";
import ScenarioButton from "./ScenarioButton";

function ScenarioPreparationBox(props) {
  console.log(props.selectedItemContent);
  return (
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

      {/* <ScenarioButton
        setPlayingScenario={props.setPlayingScenario}
        localizationData={props.localizationData}
        selectedLanguage={props.selectedLanguage}
      ></ScenarioButton> */}
    </div>
  );
}

export default ScenarioPreparationBox;