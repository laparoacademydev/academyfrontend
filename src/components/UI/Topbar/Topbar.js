import classes from "./Topbar.module.css";
import TopBarLogo from "./TopBarLogo";
import UserPanel from "../UserPanel/UserPanel";
import { Fragment } from "react";
import TopBarSelection from "./TopBarSelection";

function Topbar(props) {
  return (
    <Fragment>
      <div className={classes.topbar}>
        <TopBarLogo ReturnToBasic={props.ReturnToBasic} />
        <TopBarSelection />
      </div>
      {/* <UserPanel
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
      /> */}
    </Fragment>
  );
}

export default Topbar;
