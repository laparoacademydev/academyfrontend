import classes from "./UserPanel.module.css";
import WebcamTraining from "../WebcamTraining/WebcamTraining";
import React from "react";

const defaultcamera = {
  deviceId: "none",
  groupId: "none",
  kind: "videoinput",
  label: "Select Camera",
};

function CameraSelect(props) {
  const [currentDevice, setCurrentDevice] = React.useState(defaultcamera);

  React.useEffect(() => {
    for (let i = 0; i < props.devices.length; i++) {
      if (props.deviceId === props.devices[i].deviceId) {
        setCurrentDevice(props.devices[i]);
      }
    }
  }, [props.deviceId]);

  return (
    <div className={classes.cameraselectoritem}>
      <div className={classes.cameraselectoritemheader}>Select Camera</div>
      <div className={`${classes.cameraselectordropdown}`}>
        <div className={classes.cameraselectordropdowntxt}>
          {currentDevice.label}
        </div>
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

export default CameraSelect;
