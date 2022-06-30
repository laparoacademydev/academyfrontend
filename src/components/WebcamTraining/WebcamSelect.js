import React from "react";
import exiticon from "../../graphicassets/icons/backarrow_blue.svg";
import classes from "./WebcamTraining.module.css";

function WebcamSelect(props) {
  return (
    <div>
      <div className={`${classes.webcamselect}`}>
        <div className={classes.buttontxt}>Camera</div>
        {props.devices.map((device) => {
          if (device.kind === "videoinput") {
            return (
              <div className={classes.webcamselectdropdown}>
                <a
                  onClick={() => {
                    props.switchDeviceId(device);
                  }}
                >
                  {device.label}
                </a>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default WebcamSelect;
