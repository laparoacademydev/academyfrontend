import classes from "./CameraSelect.module.css";
import React from "react";
import { useState } from "react";

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

  const convertDeviceLabel = (label) => {
    if (label.includes("HD USB Camera")) {
      return "Advance Camera";
    } else if (label.includes("USB2.0 Camera")) {
      return "Aspire Camera";
    } else {
      return label;
    }
  };

  return (
    <div className={classes.cameraselector}>
      <div className={classes.cameraselectoritemheader}>Select Camera</div>
      <div className={`${classes.cameraselectordropdown}`}>
        <div className={classes.cameraselectordropdowntxt}>
          {convertDeviceLabel(currentDevice.label)}
        </div>
        {props.devices.map((device) => {
          if (device.kind === "videoinput") {
            return (
              <div className={classes.webcamselectdropdown} key={device.label}>
                <a
                  onClick={() => {
                    props.switchDeviceId(device);
                  }}
                >
                  {convertDeviceLabel(device.label)}
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
