import React, { Fragment, useState, useEffect } from "react";
import WebcamControlPill from "./WebcamControlPill";
import WebcamTimerPill from "./WebcamTimerPill";

function WebcamControlPanel(props) {
  const [isActive, setIsActive] = useState(0);
  const [timeInSeconds, setTimeInSeconds] = useState(0);

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
        isActive={isActive}
        setIsActive={setIsActive}
        timeInSeconds={timeInSeconds}
        setTimeInSeconds={setTimeInSeconds}
      />
      {props.capturing || props.trainingStartTime !== null ? (
        <WebcamTimerPill
          trainingStartTime={props.trainingStartTime}
          capturing={props.capturing}
          handleDownload={props.handleDownload}
          isActive={isActive}
          setIsActive={setIsActive}
          timeInSeconds={timeInSeconds}
          setTimeInSeconds={setTimeInSeconds}
        />
      ) : (
        <></>
      )}
    </Fragment>
  );
}

export default WebcamControlPanel;
