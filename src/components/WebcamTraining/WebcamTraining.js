import React from "react";
import classes from "./WebcamTraining.module.css";
import Webcam from "react-webcam";
import WebcamControlPanelBox from "./WebcamControlPanelBox";
import WebcamExit from "./WebcamExit";
import TrainerSelectBox from "./TrainerSelectBox";

import { useRef } from "react";

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
  const [currentTrainer, setCurrentTrainer] = React.useState(null);

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

  // old code which handled uploading and downloading existing trainings before:
  // const handleUpload = React.useCallback(() => {
  //   if (recordedChunks.length) {
  //     const blob = new Blob(recordedChunks, {
  //       type: "video/webm",
  //     });
  //     setUploading(true);

  //     axios
  //       .post(`${props.url}SendFile`, blob, {
  //         params: {
  //           name: props.name,
  //         },
  //         headers: {
  //           "Content-Type": "video/webm",
  //           Authorization: window.localStorage.getItem("jwt"),
  //         },
  //         timeout: 30000,
  //       })
  //       .catch(AppHelper.onRequestError)
  //       .then((response) => {
  //         setUploaded(true);
  //         setUploading(false);
  //       });
  //   }
  // }, [recordedChunks, props.url, props.name]);

  return (
    <div>
      <div className={classes.webcamscreen}>
        <div
          className={
            currentTrainer === "aspire"
              ? classes.aspirewebcamview
              : classes.advancewebcamview
          }
        >
          {currentTrainer === null ? (
            <TrainerSelectBox
              setVideoConstraints={setVideoConstraints}
              aspireVideoConstraints={aspireVideoConstraints}
              advanceVideoConstraints={advanceVideoConstraints}
              setCurrentTrainer={setCurrentTrainer}
              localizationData={props.localizationData}
              LogUserEvent={props.LogUserEvent}
              selectedItem={props.selectedItem}
            ></TrainerSelectBox>
          ) : (
            <div>
              <Webcam
                audio={false}
                ref={webcamRef}
                forceScreenshotSourceSize={false}
                videoConstraints={videoConstraints}
              />
              <WebcamControlPanelBox
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
              />
            </div>
          )}
        </div>
        <WebcamExit
          setPlayingScenario={props.setPlayingScenario}
          switchFullScreen={switchFullScreen}
          fullScreen={fullScreen}
          localizationData={props.localizationData}
          selectedLanguage={props.selectedLanguage}
        />
      </div>
    </div>
  );
}

export default WebcamTraining;
