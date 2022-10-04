import React from "react";
import classes from "./WebcamTraining.module.css";
import Webcam from "react-webcam";
import WebcamControlPanel from "./WebcamControlPanel";
import WebcamExit from "./WebcamExit";

import { Fragment } from "react";

import { useRef } from "react";

import Topbar from "../UI/Topbar/Topbar";

const aspireVideoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const advanceVideoConstraints = {
  width: 1920,
  height: 1080,
  facingMode: "user",
};

function WebcamTraining(props) {
  const webcamRef = React.useRef(null);
  const mediaRecorderRef = React.useRef(null);
  const [capturing, setCapturing] = React.useState(false);
  const [recordedChunks, setRecordedChunks] = React.useState([]);
  const [uploading, setUploading] = React.useState(false);
  const [uploaded, setUploaded] = React.useState(false);
  const [fullScreen, setFullScreen] = React.useState(false);
  const [videoConstraints, setVideoConstraints] = React.useState(
    aspireVideoConstraints
  );
  // const [currentTrainer, setCurrentTrainer] = React.useState(null);

  // const [deviceId, setDeviceId] = React.useState(0);
  // const [devices, setDevices] = React.useState([]);
  const [trainingStartTime, setTrainingStartTime] = React.useState(null);

  function switchFullScreen() {
    var elem = webcamRef.current.video;
    if (fullScreen === false) {
      openFullscreen(elem);
    } else if (fullScreen === true) {
      closeFullscreen(elem);
    }
  }

  function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
  }

  function closeFullscreen(elem) {
    if (elem.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen();
    }
  }

  const handleDataAvailable = React.useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStartCaptureClick = React.useCallback(() => {
    setTrainingStartTime(Date.now());
    let starttrainingrecording = "starttrainingrecording";
    props.LogUserEvent(starttrainingrecording, props.selectedItem.id);
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable]);

  const handleStopCaptureClick = React.useCallback(() => {
    let stoptrainingrecording = "stoptrainingrecording";
    props.LogUserEvent(stoptrainingrecording, props.selectedItem.id);
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, setCapturing]);

  const handleDownload = React.useCallback(() => {
    let videodownload = "videodownload";
    props.LogUserEvent(videodownload, props.selectedItem.id);
    if (recordedChunks.length) {
      let fileName = props.name + " " + Date().toString();
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  }, [recordedChunks]);

  const handleDevices = React.useCallback(
    (mediaDevices) =>
      props.setDevices(
        mediaDevices.filter(({ kind }) => kind === "videoinput")
      ),
    [props.setDevices]
  );

  React.useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: false, video: true })
      .then((s) => {
        navigator.mediaDevices.enumerateDevices().then((handleDevices) => {
          props.setDevices(handleDevices);
        });
      })
      .catch((error) => {
        console.log("Error :", error);
      });
  }, [handleDevices]);

  function switchDeviceId(device) {
    props.setDeviceId(device.deviceId);

    setVideoConstraints((prevState) => ({
      ...prevState,
      deviceId: device.deviceId,
    }));
    if (device.label.includes("USB2.0 Camera")) {
      setVideoConstraints(aspireVideoConstraints);
    }
    if (device.label.includes("HD USB Camera")) {
      setVideoConstraints(advanceVideoConstraints);
    }
  }

  return (
    <Fragment>
      {/* <Topbar
        items={props.courses}
        setCourseIdAndScenarioList={props.setCourseIdAndScenarioList}
        selectedCourseID={props.selectedCourseID}
        userEmail={props.userEmail}
        userIsActive={props.userIsActive}
        userPanelActive={props.userPanelActive}
        setUserPanelActive={props.setUserPanelActive}
        selectedLanguage={props.selectedLanguage}
        setSelectedLanguage={props.setSelectedLanguage}
        localizationData={props.localizationData}
        getLocalization={props.getLocalization}
        developerMode={props.developerMode}
        featureTestingMode={props.featureTestingMode}
        LogUserEvent={props.LogUserEvent}
        selectedItem={props.selectedItem}
        playingScenario={props.playingScenario}
        ReturnToBasic={props.ReturnToBasic}
        //cameraselect:
        devices={devices}
        switchDeviceId={switchDeviceId}
        deviceId={deviceId}
      ></Topbar> */}
      <div>
        <div className={classes.webcamview}>
          <Webcam
            audio={false}
            ref={webcamRef}
            forceScreenshotSourceSize={false}
            videoConstraints={videoConstraints}
          />
        </div>
        <WebcamControlPanel
          handleStopCaptureClick={handleStopCaptureClick}
          handleStartCaptureClick={handleStartCaptureClick}
          handleDownload={handleDownload}
          uploading={uploading}
          uploaded={uploaded}
          capturing={capturing}
          recordedChunks={recordedChunks}
          switchFullScreen={switchFullScreen}
          fullScreen={fullScreen}
          localizationData={props.localizationData}
          selectedLanguage={props.selectedLanguage}
          trainingStartTime={trainingStartTime}
        />
        <WebcamExit
          setPlayingScenario={props.setPlayingScenario}
          switchFullScreen={switchFullScreen}
          fullScreen={fullScreen}
          localizationData={props.localizationData}
          selectedLanguage={props.selectedLanguage}
        />
      </div>
    </Fragment>
  );
}

export default WebcamTraining;
