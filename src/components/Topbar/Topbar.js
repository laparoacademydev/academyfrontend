import classes from "./Topbar.module.css";
import TopbarItem from "./TopbarItem.js";
import LogoHome from "../LogoHome/LogoHome";
import ScreenHeightWidthTester from "../devTools/ScreenHeightWidthTester";
import UserPanel from "../UserPanel/UserPanel";
import { Fragment } from "react";

function Topbar(props) {
  return (
    <Fragment>
      <LogoHome />
      {props.featureTestingMode ? (
        <ScreenHeightWidthTester
          selectedItem={props.selectedItem}
        ></ScreenHeightWidthTester>
      ) : (
        <div></div>
      )}
      <div className={classes.topbar}>
        <TopbarItem />
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
      />
    </Fragment>
  );
}

export default Topbar;
