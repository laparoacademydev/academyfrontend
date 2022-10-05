import { useState } from "react";
import React from "react";
import { AppHelper } from "./../../../App.js";
import { Fragment } from "react";

import survicon from "../../../graphicassets/icons/surveyico_white.svg";
import shopicon from "../../../graphicassets/icons/shopico_white.svg";
import exitusericon from "../../../graphicassets/icons/exituserico_white.svg";
import xicon from "../../../graphicassets/icons/X_icon_white.svg";
import usericon from "../../../graphicassets/icons/userico_white.svg";

import LanguageSelector from "./LanguageSelector.js";
import ActiveUserPanelItem from "./ActiveUserPanelItem";

import HelpPrompt from "./HelpPrompt";
import CurrentScenarioDescription from "./WebcamTrainingUserPanel/CurrentScenarioDescription";

import classes from "./UserPanel.module.css";
import burgericon from "../../../graphicassets/icons/burgico_blue.svg";

function UserPanel(props) {
  const [userPanelItems, setUserPanelItems] = useState([]);

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

  React.useEffect(() => {
    var userpanelitems = [];
    if (props.playingScenario === false) {
      userpanelitems.push(surveyuserpanelitem);
      userpanelitems.push(laparoshoplink);
      userpanelitems.push(logoutuserpanelitem);
    }

    setUserPanelItems(userpanelitems);
  }, [props.playingScenario]);

  return (
    <Fragment>
      <div
        className={`${classes.usrpnloverlay} ${
          props.userPanelActive === 0
            ? classes.usrpnloverlayinactive
            : classes.usrpnloverlayactive
        }`}
        onClick={() => {
          if (props.userPanelActive === 0) {
            props.setUserPanelActive(1);
          } else if (props.userPanelActive === 1) {
            props.setUserPanelActive(0);
          }
        }}
      ></div>
      <div
        className={`${classes.usrpnlfiller} ${
          props.userPanelActive === 0
            ? classes.usrpnlfillerinactive
            : classes.usrpnlfilleractive
        }`}
      ></div>
      <div
        className={`${classes.usrpnltopfiller} ${
          props.userPanelActive === 0
            ? classes.usrpnltopfillerinactive
            : classes.usrpnlfilleractive
        }`}
      ></div>
      <div
        className={`${classes.usrpnlheader} ${
          props.userPanelActive === 0
            ? classes.usrpnlheaderinactive
            : classes.usrpnlheaderactive
        }`}
        onClick={() => {
          if (props.userPanelActive === 0) {
            props.setUserPanelActive(1);
          } else if (props.userPanelActive === 1) {
            props.setUserPanelActive(0);
          }
        }}
      >
        {/* <img src={usericon} className={classes.usericon} alt="." /> */}
        <div className={classes.usrpnltextinactive}>{props.userEmail}</div>
        <div>
          <img
            src={props.userPanelActive === 0 ? burgericon : xicon}
            className={classes.usrpnlburgerinactive}
            alt="."
          />
        </div>
      </div>

      <div
        className={`${classes.usrpnldrawer} ${
          props.userPanelActive === 0
            ? classes.usrpnldrawerinactive
            : classes.usrpnldraweractive
        }`}
      >
        <div className={classes.usrpnldrawerselection}>
          {props.playingScenario ? (
            <Fragment>
              <CurrentScenarioDescription
                selectedItem={props.selectedItem}
                selectedLanguage={props.selectedLanguage}
              ></CurrentScenarioDescription>
            </Fragment>
          ) : (
            <LanguageSelector
              localizationData={props.localizationData}
              selectedLanguage={props.selectedLanguage}
              LogUserEvent={props.LogUserEvent}
              ChangeLanguage={props.ChangeLanguage}
            ></LanguageSelector>
          )}
          <HelpPrompt localizationData={props.localizationData}></HelpPrompt>

          {userPanelItems.map((item) => {
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

export default UserPanel;
