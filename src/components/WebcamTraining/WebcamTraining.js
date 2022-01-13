import React from "react";
import classes from "./WebcamTraining.module.css";
import axios from "axios";
import Webcam from "react-webcam";
import { AppHelper } from "./../../App.js";
import WebcamControlPanelBox from "./WebcamControlPanelBox";

function WebcamTraining(props) {
  const webcamRef = React.useRef(null);
  const mediaRecorderRef = React.useRef(null);
  const [capturing, setCapturing] = React.useState(false);
  const [recordedChunks, setRecordedChunks] = React.useState([]);
  const [uploading, setUploading] = React.useState(false);
  const [uploaded, setUploaded] = React.useState(false);

  const handleDataAvailable = React.useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStartCaptureClick = React.useCallback(() => {
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
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, setCapturing]);

  const handleDownload = React.useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = "react-webcam-stream-capture.webm";
      a.click();
      window.URL.revokeObjectURL(url);
    }
  }, [recordedChunks]);

  const handleUpload = React.useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      setUploading(true);

      axios
        .post(`${props.url}SendFile`, blob, {
          params: {
            name: props.name,
          },
          headers: {
            "Content-Type": "video/webm",
            Authorization: window.localStorage.getItem("jwt"),
          },
          timeout: 30000,
        })
        .catch(AppHelper.onRequestError)
        .then((response) => {
          setUploaded(true);
          setUploading(false);
        });
    }
  }, [recordedChunks, props.url, props.name]);

  return (
    <div className={classes.webcamscreen}>
      <div className={classes.webcamview}>
        <Webcam audio={false} ref={webcamRef} />
      </div>
      <WebcamControlPanelBox
        capturing={capturing}
        handleStopCaptureClick={handleStopCaptureClick}
        handleStartCaptureClick={handleStartCaptureClick}
        handleDownload={handleDownload}
        uploading={uploading}
        uploaded={uploaded}
        capturing={capturing}
        recordedChunks={recordedChunks}
      />
    </div>
  );
}

export default WebcamTraining;
