import classes from "./WebcamTraining.module.css";
import buttonclasses from "../UI/Button.module.css";

function WebcamControlPanelBox(props) {
  if (props.capturing === true) {
    return (
      <div className={classes.webcamcontrolpanelbox}>
        <div className={classes.webcamcontrolbuttons}>
          <div
            className={`${buttonclasses.button} ${classes.webcamcontrolstopbtn}`}
            onClick={props.handleStopCaptureClick}
          >
            <div className={buttonclasses.buttontext}>Stop Capture</div>
          </div>
          <div
            className={`${buttonclasses.button} ${classes.webcamcontrolinactivebtn}`}
          >
            <div className={buttonclasses.buttontext}>Download</div>
          </div>
          <div
            className={`${buttonclasses.button} ${classes.webcamcontrolinactivebtn}`}
          >
            <div className={buttonclasses.buttontext}>Upload</div>
          </div>
        </div>
      </div>
    );
  } else if (props.recordedChunks.length > 0) {
    return (
      <div className={classes.webcamcontrolpanelbox}>
        <div className={classes.webcamcontrolbuttons}>
          {props.uploading || props.uploaded ? (
            <div
              className={`${buttonclasses.button} ${classes.webcamcontrolinactivebtn}`}
            >
              <div className={buttonclasses.buttontext}>Start Capture</div>
            </div>
          ) : (
            <div
              className={`${buttonclasses.button} ${classes.webcamcontrolstartbtn}`}
              onClick={props.handleStartCaptureClick}
            >
              <div className={buttonclasses.buttontext}>Start Capture</div>
            </div>
          )}
          <div
            className={`${buttonclasses.button} ${classes.webcamcontroldownloadbtn}`}
            onClick={props.handleDownload}
          >
            <div className={buttonclasses.buttontext}>Download</div>
          </div>
          {props.uploading ? (
            <div
              className={`${buttonclasses.button} ${classes.webcamcontrolinactivebtn}`}
            >
              <div className={buttonclasses.buttontext}>Uploading</div>
            </div>
          ) : props.uploaded ? (
            <div
              className={`${buttonclasses.button} ${classes.webcamcontrolinactivebtn}`}
            >
              <div className={buttonclasses.buttontext}>Uploaded</div>
            </div>
          ) : (
            <div
              className={`${buttonclasses.button} ${classes.webcamcontroluploadbtn}`}
              onClick={props.handleUpload}
            >
              <div className={buttonclasses.buttontext}>Upload</div>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className={classes.webcamcontrolpanelbox}>
        <div className={classes.webcamcontrolbuttons}>
          <div
            className={`${buttonclasses.button} ${classes.webcamcontrolstartbtn}`}
            onClick={props.handleStartCaptureClick}
          >
            <div className={buttonclasses.buttontext}>Start Capture</div>
          </div>
          <div
            className={`${buttonclasses.button} ${classes.webcamcontrolinactivebtn}`}
          >
            <div className={buttonclasses.buttontext}>Download</div>
          </div>
          <div
            className={`${buttonclasses.button} ${classes.webcamcontrolinactivebtn}`}
          >
            <div className={buttonclasses.buttontext}>Upload</div>
          </div>
        </div>
      </div>
    );
  }
}

export default WebcamControlPanelBox;
