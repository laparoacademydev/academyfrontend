import React, { useState, useEffect } from "react";
import classes from "./WebcamTimerPill.module.css";
import recordico from "../../graphicassets/icons/record_ico.svg";
import downloadico from "../../graphicassets/icons/downloadico.svg";

function WebcamTimerPill(props) {
  const [seconds, setSeconds] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [hours, setHours] = useState("00");

  const secondsToTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / (60 * 60));

    const divisorForMinutes = timeInSeconds % (60 * 60);
    const minutes = Math.floor(divisorForMinutes / 60);

    const divisorForSeconds = divisorForMinutes % 60;
    const seconds = Math.ceil(divisorForSeconds);

    setSeconds(seconds < 10 ? `0${seconds}` : seconds);
    setMinutes(minutes < 10 ? `0${minutes}` : minutes);
    setHours(hours < 10 ? `0${hours}` : hours);
  };

  function AskStopCounter() {
    if (props.capturing !== true) {
      props.setIsActive(!props.isActive);
    }
  }

  useEffect(() => {
    let interval = null;
    if (props.isActive) {
      interval = setInterval(() => {
        secondsToTime(props.timeInSeconds);
        AskStopCounter();
        props.setTimeInSeconds((timeInSeconds) => timeInSeconds + 1);
      }, 1000);
    } else if (!props.isActive && props.timeInSeconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [props.isActive, props.timeInSeconds]);

  function handleDownload() {
    props.handleDownload();
    props.setTimeInSeconds(0);
    secondsToTime(0);
  }

  return (
    <div className={classes.webcamtimer}>
      {props.capturing ? (
        <></>
      ) : (
        <div
          className={classes.webcamhandledownload}
          onClick={handleDownload}
        ></div>
      )}
      {props.capturing ? (
        <div className={classes.downloadbut}>recording</div>
      ) : (
        <div className={classes.downloadbut}>download</div>
      )}
      {props.capturing ? (
        <div>
          <div className={classes.webcamtimerrecordico}>
            <img src={recordico} alt="." />
          </div>
        </div>
      ) : (
        <div>
          <div>
            <img src={downloadico} alt="." />
          </div>
        </div>
      )}

      <div className={classes.webcamtimertimer}>
        {hours}:{minutes}:{seconds}
      </div>
    </div>
  );
}

export default WebcamTimerPill;
