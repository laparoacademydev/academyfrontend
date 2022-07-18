import React, { useState, useEffect } from "react";

import classes from "./WebcamTraining.module.css";

import recordico from "../../graphicassets/icons/record_ico.svg";
import downloadico from "../../graphicassets/icons/downloadico.svg";

function WebcamTimerPill(props) {
  const [seconds, setSeconds] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [hours, setHours] = useState("00");

  function secondsToTime(timeInSeconds) {
    let hours = Math.floor(timeInSeconds / (60 * 60));

    let divisor_for_minutes = timeInSeconds % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    if (seconds < 10) {
      setSeconds(`0${seconds}`);
    } else {
      setSeconds(seconds);
    }

    if (minutes < 10) {
      setMinutes(`0${minutes}`);
    } else {
      setMinutes(minutes);
    }

    if (hours < 10) {
      setHours(`0${hours}`);
    } else {
      setHours(hours);
    }
  }

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
