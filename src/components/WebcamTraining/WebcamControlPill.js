import classes from "./WebcamControlPill.module.css";
import fullscrico from "../../graphicassets/icons/fullscreen_ico.svg";
import startrecordico from "../../graphicassets/icons/startrecord_ico.svg";
import stoprecordico from "../../graphicassets/icons/stoprec_ico.svg";

function WebcamControlPill(props) {
  function handleRecording() {
    if (props.capturing === true) {
      props.setIsActive(false);
      props.handleStopCaptureClick();
    } else if (props.capturing === false) {
      props.handleStartCaptureClick();
      if (props.timeInSeconds > 0) {
        props.setTimeInSeconds(0);
      }
      props.setIsActive(true);
    }
  }

  return (
    <div className={classes.webcamplayer}>
      <div className={classes.webcambuttonrecord} onClick={handleRecording}>
        <div className={classes.webcamrecordico}>
          <img
            src={props.capturing ? stoprecordico : startrecordico}
            alt="."
          ></img>
        </div>
      </div>
      <div
        className={classes.webcambuttonfullscr}
        onClick={props.switchFullScreen}
      >
        <div className={classes.webcamfullscrico}>
          <img src={fullscrico} alt="." />
        </div>
      </div>
    </div>
  );
}
export default WebcamControlPill;
