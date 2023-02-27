import React from "react";
import classes from "./LoadingScreen.module.css";

function LoadingScreen(props) {
  return (
    <div className={classes.loadingscreenbackground}>
      <div className={classes.spin}></div>
      <div className={classes.loadingscreentext}>Please wait ... </div>
      <div className={classes.loadingmsg}>{props.loadingScreenMsg}</div>
    </div>
  );
}

export default LoadingScreen;
