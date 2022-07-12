import classes from "./WebcamTraining.module.css";
import fullscrico from "../../graphicassets/icons/fullscreen_ico.svg";
import startrecordico from "../../graphicassets/icons/startrecord_ico.svg";
import stoprecordico from "../../graphicassets/icons/stoprec_ico.svg";
import buttonclasses from "../UI/Button.module.css";

function WebcamControlPill(props) {
  // if (props.capturing === true) {
  //   return (
  //     <div className={classes.webcamcontrolpanelbox}>
  //       <div className={classes.webcamcontrolbuttons}>
  //         <div
  //           className={`${buttonclasses.button} ${classes.webcamcontrolstopbtn}`}
  //           onClick={props.handleStopCaptureClick}
  //         >
  //           <div className={buttonclasses.buttontext}>
  //             {props.localizationData.webcamtraining.stopcapture}
  //           </div>
  //         </div>
  //         <div
  //           className={`${buttonclasses.button} ${classes.webcamcontrolinactivebtn}`}
  //         >
  //           <div className={buttonclasses.buttontext}>
  //             {props.localizationData.webcamtraining.download}
  //           </div>
  //         </div>
  //         <div
  //           className={`${buttonclasses.button} ${classes.webcamcontrolfullscreenbtn}`}
  //         >
  //           <div
  //             className={buttonclasses.buttontext}
  //             onClick={props.switchFullScreen}
  //           >
  //             {props.fullScreen ? "Exit" : "Enter"} Fullscreen
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // } else if (props.recordedChunks.length > 0) {
  //   return (
  //     <div className={classes.webcamcontrolpanelbox}>
  //       <div className={classes.webcamcontrolbuttons}>
  //         {props.uploading || props.uploaded ? (
  //           <div
  //             className={`${buttonclasses.button} ${classes.webcamcontrolinactivebtn}`}
  //           >
  //             <div className={buttonclasses.buttontext}>
  //               {props.localizationData.webcamtraining.startcapture}
  //             </div>
  //           </div>
  //         ) : (
  //           <div
  //             className={`${buttonclasses.button} ${classes.webcamcontrolstartbtn}`}
  //             onClick={props.handleStartCaptureClick}
  //           >
  //             <div className={buttonclasses.buttontext}>
  //               {props.localizationData.webcamtraining.startcapture}
  //             </div>
  //           </div>
  //         )}
  //         <div
  //           className={`${buttonclasses.button} ${classes.webcamcontroldownloadbtn}`}
  //           onClick={props.handleDownload}
  //         >
  //           <div className={buttonclasses.buttontext}>
  //             {props.localizationData.webcamtraining.download}
  //           </div>
  //         </div>
  //         <div
  //           className={`${buttonclasses.button} ${classes.webcamcontrolfullscreenbtn}`}
  //         >
  //           <div
  //             className={buttonclasses.buttontext}
  //             onClick={props.switchFullScreen}
  //           >
  //             {props.fullScreen ? "Exit" : "Enter"} Fullscreen
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // } else {
  //   return (
  //     <div className={classes.webcamcontrolpanelbox}>
  //       <div className={classes.webcamcontrolbuttons}>
  //         <div
  //           className={`${buttonclasses.button} ${classes.webcamcontrolstartbtn}`}
  //           onClick={props.handleStartCaptureClick}
  //         >
  //           <div className={buttonclasses.buttontext}>
  //             {props.localizationData.webcamtraining.startcapture}
  //           </div>
  //         </div>
  //         <div
  //           className={`${buttonclasses.button} ${classes.webcamcontrolinactivebtn}`}
  //         >
  //           <div className={buttonclasses.buttontext}>
  //             {props.localizationData.webcamtraining.download}
  //           </div>
  //         </div>
  //         <div
  //           className={`${buttonclasses.button} ${classes.webcamcontrolfullscreenbtn}`}
  //         >
  //           <div
  //             className={buttonclasses.buttontext}
  //             onClick={props.switchFullScreen}
  //           >
  //             {props.fullScreen ? "Exit" : "Enter"} Fullscreen
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  function handleRecording() {
    if (props.capturing === true) {
      return props.handleStopCaptureClick;
    } else if (props.capturing === false) {
      return props.handleStartCaptureClick;
    }
  }

  return (
    <div className={classes.webcamplayer}>
      <div className={classes.webcambuttonrecord} onClick={handleRecording()}>
        <div className={classes.webcamrecordico}>
          {props.capturing ? (
            <img src={stoprecordico} alt="." />
          ) : (
            <img src={startrecordico} alt="." />
          )}
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
