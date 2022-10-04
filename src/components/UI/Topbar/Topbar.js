import classes from "./Topbar.module.css";
import TopBarLogo from "./TopBarLogo";
import ScreenHeightWidthTester from "../../devTools/ScreenHeightWidthTester";
import UserPanel from "../UserPanel/UserPanel";
import { Fragment } from "react";

function Topbar(props) {
  return (
    <Fragment>
      {/* <LogoHome /> */}
      {props.featureTestingMode ? (
        <ScreenHeightWidthTester
          selectedItem={props.selectedItem}
        ></ScreenHeightWidthTester>
      ) : (
        <div></div>
      )}
      <div className={classes.topbar}>
        <TopBarLogo ReturnToBasic={props.ReturnToBasic}></TopBarLogo>
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
    </Fragment>
  );
}

export default Topbar;
