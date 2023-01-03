import { Fragment } from "react";
import ScreenHeightWidthTester from "../devTools/ScreenHeightWidthTester";
//
import classes from "./Layout.module.css";
import UserPanel from "./UserPanel/UserPanel";

//
import { Outlet, Link } from "react-router-dom";
import React from "react";
import { useState } from "react";
import laparologo from "../../graphicassets/LaparoAcademyLogo.svg";

function Layout(props) {
  //this useState variable is only here so that when options are clicked, the useState refreshes and checkifSelected moves greenline to relevant part. Without this the state for the entire component doesn't refresh.
  const [emptyVar, setEmptyVar] = useState(true);

  function ShowScreenHeightWidthTester() {
    return (
      <Fragment>
        {props.featureTestingMode ? (
          <ScreenHeightWidthTester></ScreenHeightWidthTester>
        ) : (
          <div></div>
        )}
      </Fragment>
    );
  }

  function ShowLogo() {
    return (
      <div onClick={props.ReturnToBasic} className={classes.topbarlogo}>
        <img
          className={classes.topbarlogoimage}
          src={laparologo}
          alt={"error"}
        ></img>
      </div>
    );
  }

  function changeEmptyVar(emptyVar) {
    setEmptyVar(!emptyVar);
  }

  function CheckIfSelected(b) {
    if (window.location.pathname === b) {
      return true;
    } else {
      return false;
    }
  }

  function ShowTopBarSelection() {
    return (
      <Fragment>
        <div className={classes.topbarselection}>
          <Link
            to="/"
            onClick={() => changeEmptyVar(emptyVar)}
            className={classes.topbarselectionoption}
          >
            <div className={classes.topbarselectionlink}>Courses</div>
            <div
              className={
                CheckIfSelected("/") ? classes.greenline : classes.nogreenline
              }
            ></div>
          </Link>

          {/* <Link
            to="/about"
            onClick={() => changeEmptyVar(emptyVar)}
            className={classes.topbarselectionoption}
          >
            <div className={classes.topbarselectionlink}>About</div>
            <div
              className={
                CheckIfSelected("/about")
                  ? classes.greenline
                  : classes.nogreenline
              }
            ></div>
          </Link> */}
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <ShowScreenHeightWidthTester />
      <div className={classes.topbar}>
        <ShowLogo />
        <ShowTopBarSelection />
      </div>

      <UserPanel
        userEmail={props.userEmail}
        setTrainingList={props.setTrainingList}
        userIsActive={props.userIsActive}
        url={props.url}
        userPanelActive={props.userPanelActive}
        setUserPanelActive={props.setUserPanelActive}
        selectedLanguage={props.selectedLanguage}
        setSelectedLanguage={props.setSelectedLanguage}
        localizationData={props.localizationData}
        getLocalization={props.getLocalization}
        webCamTrainingActive={props.webCamTrainingActive}
        devices={props.devices}
        switchDeviceId={props.switchDeviceId}
        deviceId={props.deviceId}
        // selectedItem={props.selectedItem}
        setwebCamTrainingActive={props.setwebCamTrainingActive}
        // setSelectedItem={props.setSelectedItem}
        ChangeLanguage={props.ChangeLanguage}
      />
      <Outlet />
    </Fragment>
  );
}

export default Layout;
