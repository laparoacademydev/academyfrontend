import React, { Fragment } from "react";
import classes from "./UserPanel.module.css";
import burgericon from "../../graphicassets/icons/burgico_blue.svg";

function InactiveUserPanel(props) {
  return (
    <Fragment>
      <div
        className={classes.inactiveuserpanel}
        onClick={() => {
          if (props.userPanelActive === 0) {
            props.setUserPanelActive(1);
          } else if (props.userPanelActive === 1) {
            props.setUserPanelActive(0);
          }
        }}
      >
        <div className={classes.inactiveuserpaneltext}>{props.userEmail}</div>
        <img
          src={burgericon}
          className={classes.inactiveuserpanel_burger}
          alt="."
        />
      </div>
    </Fragment>
  );
}

export default InactiveUserPanel;
