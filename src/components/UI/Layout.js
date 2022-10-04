import { Fragment } from "react";
import Topbar from "./Topbar/Topbar";

function Layout(props) {
  return (
    <Fragment>
      <Topbar
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
        featureTestingMode={props.featureTestingMode}
        selectedItem={props.selectedItem}
        playingScenario={props.playingScenario}
        setPlayingScenario={props.setPlayingScenario}
        setSelectedItem={props.setSelectedItem}
        ReturnToBasic={props.ReturnToBasic}
        ChangeLanguage={props.ChangeLanguage}
      />
    </Fragment>
  );
}

export default Layout;
