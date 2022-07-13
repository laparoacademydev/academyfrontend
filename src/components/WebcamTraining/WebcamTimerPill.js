import React, { useState, useEffect } from "react";

import classes from "./WebcamTraining.module.css";

import recordico from "../../graphicassets/icons/record_ico.svg";

function WebcamTimerPill(props) {
  const [timeInSeconds, setTimeInSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const [seconds, setSeconds] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [hours, setHours] = useState("00");

  //  function toggle() {
  //    setIsActive(!isActive);
  //  }

  // function reset() {
  //   setTimeInSeconds(0);
  //   setIsActive(false);
  // }

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

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        secondsToTime(timeInSeconds);
        setTimeInSeconds((timeInSeconds) => timeInSeconds + 1);
      }, 1000);
    } else if (!isActive && timeInSeconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timeInSeconds]);

  return (
    <div className={classes.webcamtimer}>
      <div className={classes.webcamtimerrecordico}>
        <img src={recordico} alt="." />
      </div>
      <div className={classes.webcamtimertimer}>
        {hours}:{minutes}:{seconds}
      </div>
    </div>
  );
}

export default WebcamTimerPill;
