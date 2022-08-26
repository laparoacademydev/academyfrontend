import React, { useState, Fragment } from "react";
import classes from "./UserPanel.module.css";
import { AppHelper } from "./../../App.js";
import xicon from "../../graphicassets/icons/X_icon_white.svg";
import usericon from "../../graphicassets/icons/userico_white.svg";
import exitusericon from "../../graphicassets/icons/exituserico_white.svg";
import ActiveUserPanelItem from "./ActiveUserPanelItem";
import shopicon from "../../graphicassets/icons/shopico_white.svg";
import langicon from "../../graphicassets/icons/langico_white.svg";
import survicon from "../../graphicassets/icons/surveyico_white.svg";
import CameraSelect from "./WebcamTrainingUserPanel/CameraSelect";
import CurrentScenarioDescription from "./WebcamTrainingUserPanel/CurrentScenarioDescription";
import lapico from "../../graphicassets/icons/freestart_ico.svg";

function ActiveUserPanel(props) {
  const [activeLanguageMenu, setActiveLanguageMenu] = useState(false);

  var userpanelitems = [];

  const surveyuserpanelitem = {
    text: props.localizationData.userpanel.survey,
    onclick: function () {
      window.open("https://forms.gle/kVVPMKuYSm23ZLDm6");
    },
    icon: survicon,
  };

  const laparoshoplink = {
    text: props.localizationData.userpanel.visitlaparo,
    onclick: function () {
      window.open("https://laparosimulators.com/");
    },
    icon: shopicon,
  };

  const logoutuserpanelitem = {
    text: props.localizationData.userpanel.logout,
    onclick: function () {
      window.localStorage.removeItem("jwt");
      window.location.href = `${AppHelper.LoginUrl}`;
      var logout = "logout";
      props.LogUserEvent(logout);
    },
    icon: exitusericon,
  };

  const languageselection = {
    text: props.localizationData.userpanel.languageselect,
    onclick: function () {
      activeLanguageMenu
        ? setActiveLanguageMenu(false)
        : setActiveLanguageMenu(true);
    },
    icon: langicon,
  };

  const scenariofree = {
    text: props.localizationData.userpanel.startscenariofree,
    onclick: function () {
      props.setUserPanelActive(0);
      props.setPlayingScenario(true);
      var scenariostart = "scenariostart";
      props.LogUserEvent(scenariostart, "scenariofree");
      props.setSelectedItem(AppHelper.DefaultFreeTraining);
    },
    icon: lapico,
  };

  if (props.playingScenario === false) {
    userpanelitems.push(scenariofree);
    userpanelitems.push(surveyuserpanelitem);
    userpanelitems.push(languageselection);
    userpanelitems.push(laparoshoplink);
    userpanelitems.push(logoutuserpanelitem);
  }

  return (
    <Fragment>
      <div
        className={classes.overlay}
        onClick={() => {
          if (props.userPanelActive === 0) {
            props.setUserPanelActive(1);
          } else if (props.userPanelActive === 1) {
            props.setUserPanelActive(0);
          }
        }}
      ></div>
      <div className={classes.userpanel}>
        <div>
          <img src={usericon} className={classes.usericon} alt="." />
          <div className={classes.userpaneltext}>{props.userEmail}</div>
          <img
            src={xicon}
            className={classes.userpanel_xico}
            alt="."
            onClick={() => {
              if (props.userPanelActive === 0) {
                props.setUserPanelActive(1);
              } else if (props.userPanelActive === 1) {
                props.setUserPanelActive(0);
              }
            }}
          />
        </div>

        <div className={classes.userpanelselection}>
          {props.playingScenario ? (
            <Fragment>
              <CameraSelect
                devices={props.devices}
                switchDeviceId={props.switchDeviceId}
                deviceId={props.deviceId}
              ></CameraSelect>
              <CurrentScenarioDescription
                selectedItem={props.selectedItem}
                selectedLanguage={props.selectedLanguage}
              ></CurrentScenarioDescription>
            </Fragment>
          ) : (
            <div></div>
          )}
          {userpanelitems.map((item) => {
            return (
              <ActiveUserPanelItem
                key={item.text}
                text={item.text}
                classes={item.classes}
                onclick={item.onclick}
                icon={item.icon}
                setTrainingList={props.setTrainingList}
                userIsActive={props.userIsActive}
                url={props.url}
                userPanelActive={props.userPanelActive}
                setUserPanelActive={props.setUserPanelActive}
                activeLanguageMenu={activeLanguageMenu}
                setActiveLanguageMenu={setActiveLanguageMenu}
                selectedLanguage={props.selectedLanguage}
                setSelectedLanguage={props.setSelectedLanguage}
                localizationData={props.localizationData}
                getLocalization={props.getLocalization}
                LogUserEvent={props.LogUserEvent}
                setPlayingScenario={props.setPlayingScenario}
                // selectedItem={props.selectedItem}
              />
            );
          })}
        </div>
      </div>
    </Fragment>
  );
}

export default ActiveUserPanel;
