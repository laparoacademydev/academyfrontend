import classes from "./TrainerSelectBox.module.css";
import buttonclasses from "../UI/Button.module.css";

function TrainerSelectBox(props) {
  function AspireSwitch() {
    props.setVideoConstraints(props.aspireVideoConstraints);
    props.setCurrentTrainer("aspire");
  }

  function AdvanceSwitch() {
    props.setVideoConstraints(props.advanceVideoConstraints);
    props.setCurrentTrainer("advance");
  }

  return (
    <div className={classes.trainerselectbox}>
      <div className={classes.selectboxheader}>
        {props.localizationData.webcamtraining.devselectheader}
      </div>
      <div className={classes.selectboxtext}>
        {props.localizationData.webcamtraining.devselecttext}
      </div>
      <div className={classes.selectboxbuttons}>
        <div
          className={`${classes.selectboxbutton} ${buttonclasses.button}`}
          onClick={AdvanceSwitch}
        >
          <div className={`${buttonclasses.buttontext}`}>advance</div>
        </div>
        <div
          className={`${classes.selectboxbutton} ${buttonclasses.button}`}
          onClick={AspireSwitch}
        >
          <div className={`${buttonclasses.buttontext}`}>aspire</div>
        </div>
      </div>
    </div>
  );
}

export default TrainerSelectBox;
