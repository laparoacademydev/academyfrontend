import { Fragment } from "react";
import ScreenHeightWidthTester from "../devTools/ScreenHeightWidthTester";
//
import classes from "./Layout.module.css";
import UserPanel from "./UserPanel/UserPanel";

//
import { Outlet, Link } from "react-router-dom";
// import classes from "./NavBar.module.css";

import laparologo from "../../graphicassets/LaparoAcademyLogo.svg";

function Layout(props) {
  function ShowScreenHeightWidthTester() {
    return (
      <Fragment>
        {props.featureTestingMode ? (
          <ScreenHeightWidthTester
            selectedItem={props.selectedItem}
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

  function ShowTopBarSelection() {
    return (
      <Fragment>
        {/* <div className={classes.topbarselection}>
          <div>
            <Link to="/">Train</Link>
          </div>
          <div>
            <Link to="/about">About</Link>
          </div>
        </div> */}
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
        LogUserEvent={props.LogUserEvent}
        playingScenario={props.playingScenario}
        devices={props.devices}
        switchDeviceId={props.switchDeviceId}
        deviceId={props.deviceId}
        selectedItem={props.selectedItem}
        setPlayingScenario={props.setPlayingScenario}
        setSelectedItem={props.setSelectedItem}
        ChangeLanguage={props.ChangeLanguage}
      />
      <Outlet />
    </Fragment>
  );
}

export default Layout;
