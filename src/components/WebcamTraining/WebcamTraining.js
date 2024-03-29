import React, { Fragment } from "react";
import AppHelper from "../../App";
import classes from "./WebcamTraining.module.css";
import Webcam from "react-webcam";
import WebcamControlPanel from "./WebcamControlPanel";
import WebcamExit from "./WebcamExit";
import CameraSelect from "./CameraSelect/CameraSelect";

function WebcamTraining(props) {
  const webcamRef = React.useRef(null);
  const mediaRecorderRef = React.useRef(null);
  const [capturing, setCapturing] = React.useState(false);
  const [recordedChunks, setRecordedChunks] = React.useState([]);
  const [uploading, setUploading] = React.useState(false);
  const [uploaded, setUploaded] = React.useState(false);
  const [fullScreen, setFullScreen] = React.useState(false);
  const [videoConstraints, setVideoConstraints] = React.useState(
    AppHelper.aspireVideoConstraints
  );
  const [cameraLoaded, setCameraLoaded] = React.useState(false);

  const [deviceId, setDeviceId] = React.useState(0);
  const [devices, setDevices] = React.useState([]);
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
    AppHelper.LogEvent(
      starttrainingrecording,
      window.location.href.split("?id=")[1]
    );
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
    AppHelper.LogEvent(
      stoptrainingrecording,
      window.location.href.split("?id=")[1]
    );
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, setCapturing]);

  const handleDownload = React.useCallback(() => {
    let videodownload = "videodownload";
    AppHelper.LogEvent(videodownload, window.location.href.split("?id=")[1]);
    if (recordedChunks.length) {
      let fileName =
        window.location.href.split("?id=")[1] + " " + Date().toString();
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
    (mediaDevices) => {
      var newDevices = mediaDevices.filter(({ kind }) => kind === "videoinput");

      setDevices(newDevices);

      var filteredDevices = newDevices.filter(
        ({ label }) =>
          label.includes("USB2.0 Camera") || label.includes("HD USB Camera")
      );
      if (filteredDevices.length === 0) {
        filteredDevices = newDevices;
      }
      switchDeviceId(filteredDevices[0]);
    },
    [setDevices]
  );

  React.useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  function switchDeviceId(device) {
    setDeviceId(device.deviceId);

    var newConstraints = {};
    if (device.label.includes("USB2.0 Camera")) {
      //setVideoConstraints(AppHelper.aspireVideoConstraints);
      newConstraints = AppHelper.aspireVideoConstraints;
    }
    if (device.label.includes("HD USB Camera")) {
      //setVideoConstraints(AppHelper.advanceVideoConstraints);
      newConstraints = AppHelper.advanceVideoConstraints;
    }
    newConstraints.deviceId = device.deviceId;

    setVideoConstraints(newConstraints);
    setCameraLoaded(true);
  }

  return !cameraLoaded ? (
    <></>
  ) : (
    <Fragment>
      <div className={classes.webcamview}>
        <Webcam
          audio={false}
          ref={webcamRef}
          forceScreenshotSourceSize={false}
          videoConstraints={videoConstraints}
          width="100%"
          height="100%"
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
        switchFullScreen={switchFullScreen}
        fullScreen={fullScreen}
        localizationData={props.localizationData}
        selectedLanguage={props.selectedLanguage}

        // selectedItem={props.selectedItem}
      />
      <CameraSelect
        devices={devices}
        switchDeviceId={switchDeviceId}
        deviceId={deviceId}
      />
    </Fragment>
  );
}

export default WebcamTraining;
