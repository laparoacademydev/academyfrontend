import classes from "./../UserPanel.module.css";
import { AppHelper } from "../../../App.js";

function CurrentScenarioDescription(props) {
  console.log(props);
  return (
    <div className={classes.currentscenarioitem}>
      <div className={classes.currentscenarioheader}>
        {props.selectedItem.name[props.selectedLanguage]}
      </div>
      <div className={classes.currentscenarioskills}>
        {props.selectedItem.skills[props.selectedLanguage]}
      </div>
      <div className={classes.currentscenarioinstructions}>
        {props.selectedItem.instructions[props.selectedLanguage]}
      </div>
      <video
        className={classes.currentscenariovideo}
        controls
        preload="metadata"
        src={`${AppHelper.storageUrl}laparoacademy-mediacontent/${props.selectedItem.id}_training.mp4`}
        type="video/mp4"
      >
        <track
          label={`${props.selectedLanguage}`}
          kind="subtitles"
          srcLang={`${props.selectedLanguage}`}
          src={`${AppHelper.storageUrl}laparoacademy-mediacontent/vvt/${props.selectedItem.id}_training_${props.selectedLanguage}.vtt`}
          default
        />
      </video>
    </div>
  );
}

export default CurrentScenarioDescription;
