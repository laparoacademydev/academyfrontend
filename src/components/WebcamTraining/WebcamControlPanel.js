import classes from "./WebcamTraining.module.css";

import buttonclasses from "../UI/Button.module.css";
import fullscrico from "../../graphicassets/icons/fullscreen_ico.svg";
import startrecordico from "../../graphicassets/icons/startrecord_ico.svg";
import stoprecordico from "../../graphicassets/icons/stoprec_ico.svg";
import recordico from "../../graphicassets/icons/record_ico.svg";

import WebcamControlPill from "./WebcamControlPill";
import WebcamTimerPill from "./WebcamTimerPill";

import { Fragment } from "react";

function WebcamControlPanel(props) {
  return (
    <Fragment>
      <WebcamControlPill
        handleStopCaptureClick={props.handleStopCaptureClick}
        handleStartCaptureClick={props.handleStartCaptureClick}
        localizationData={props.localizationData}
        fullScreen={props.fullScreen}
        recordedChunks={props.recordedChunks}
        switchFullScreen={props.switchFullScreen}
        uploading={props.uploading}
        uploaded={props.uploaded}
        handleDownload={props.handleDownload}
        capturing={props.capturing}
        selectedLanguage={props.selectedLanguage}
      />
      {props.capturing ? (
        <WebcamTimerPill trainingStartTime={props.trainingStartTime} />
      ) : (
        <></>
      )}
    </Fragment>
  );
}

export default WebcamControlPanel;
