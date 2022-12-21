import { Fragment } from "react";
import ScreenHeightWidthTester from "../devTools/ScreenHeightWidthTester";
//
import classes from "./Layout.module.css";
import UserPanel from "./UserPanel/UserPanel";

//
import { Outlet, Link } from "react-router-dom";

import laparologo from "../../graphicassets/LaparoAcademyLogo.svg";

function Layout(props) {
  function ShowScreenHeightWidthTester() {
    return (
      <Fragment>
        {props.featureTestingMode ? (
          <ScreenHeightWidthTester
          // selectedItem={props.selectedItem}
          ></ScreenHeightWidthTester>
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

  function changeSelectionOption(a) {
    props.setTopBarSelectionOption(a);
  }

  function CheckIfSelected(b) {
    if (props.topBarSelectionOption === b) {
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
            onClick={() => changeSelectionOption(0)}
            className={classes.topbarselectionoption}
            to="/"
          >
            <div className={classes.topbarselectionlink}>Train</div>
            <div
              className={
                CheckIfSelected(0) ? classes.greenline : classes.nogreenline
              }
            ></div>
          </Link>

          <Link
            onClick={() => changeSelectionOption(1)}
            className={classes.topbarselectionoption}
            to="/about"
          >
            <div className={classes.topbarselectionlink} to="/about">
              About
            </div>
            <div
              className={
                CheckIfSelected(1) ? classes.greenline : classes.nogreenline
              }
            ></div>
          </Link>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <ShowScreenHeightWidthTester />
      <div className={classes.topbar}>
        <ShowLogo />
        {/* <ShowTopBarSelection /> */}
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
