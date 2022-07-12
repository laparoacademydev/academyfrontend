import classes from "./WebcamTraining.module.css";

import recordico from "../../graphicassets/icons/record_ico.svg";

function WebcamTimerPill(props) {
  return (
    <div className={classes.webcamtimer}>
      <div className={classes.webcamtimerrecordico}>
        <img src={recordico} alt="." />
      </div>
      <div className={classes.webcamtimertimer}>00:00:00</div>
    </div>
  );
}

export default WebcamTimerPill;
