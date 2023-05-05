import { useState } from "react";
import React from "react";
import { AppHelper } from "./../../../App.js";
import { Fragment } from "react";

import survicon from "../../../graphicassets/icons/surveyico_white.svg";
import shopicon from "../../../graphicassets/icons/shopico_white.svg";
import exitusericon from "../../../graphicassets/icons/exituserico_white.svg";
import xicon from "../../../graphicassets/icons/X_icon_white.svg";
import LanguageSelector from "./LanguageSelector.js";
import ActiveUserPanelItem from "./ActiveUserPanelItem";

import HelpPrompt from "./HelpPrompt";
import CurrentScenarioDescription from "./WebcamTrainingUserPanel/CurrentScenarioDescription";

import classes from "./UserPanel.module.css";
import burgericon from "../../../graphicassets/icons/burgico_blue.svg";

function UserPanel(props) {
  const [userPanelActive, setUserPanelActive] = useState(0);
  const [userPanelItems, setUserPanelItems] = useState([]);

  const [scenario, setScenario] = useState(null);

  function FetchScenario(id) {
    fetch(
      "./academycontentstorage/laparoacademy-jsoncontent/" +
        id +
        ".json?v=" +
        AppHelper.ContentVersion,
      {
        headers: {
          "Content-Type": "application/json",

          Accept: "application/json",
        },
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setScenario(myJson);
      })
      .catch((err) => {
        console.log("error recorded " + err);
      });
  }

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
      AppHelper.LogEvent(logout);
    },
    icon: exitusericon,
  };

  function CheckCurrentScenarioDescription() {
    //this updates the CurrentScenarioDescription component with the selected scenario
    var url = window.location.href.split("?id=");
    if (url.length > 1) {
      // whenever we are not in webcamtraining this will reset the scenario to null
      if (userPanelActive) {
        // this checks if the panel is active so that we don't refetch on deactivatoin
        if (scenario === null) {
          // simply checks once again if that scenario is null - and then fetches the content
          FetchScenario(url[1]);
        }
      }
    } else {
      setScenario(null);
    }
  }

  React.useEffect(() => {
    var userpanelitems = [];

    CheckCurrentScenarioDescription();

    if (window.location.pathname === "/") {
      userpanelitems.push(surveyuserpanelitem);
      userpanelitems.push(laparoshoplink);
    }

    // always add this one:
    userpanelitems.push(logoutuserpanelitem);

    setUserPanelItems(userpanelitems);
  }, [userPanelActive, window.location.href]);

  return (
    <Fragment>
      <div
        className={`${classes.usrpnloverlay} ${
          userPanelActive === 0
            ? classes.usrpnloverlayinactive
            : classes.usrpnloverlayactive
        }`}
        onClick={() => {
          if (userPanelActive === 0) {
            setUserPanelActive(1);
          } else if (userPanelActive === 1) {
            setUserPanelActive(0);
          }
        }}
      ></div>
      <div
        className={`${classes.usrpnlfiller} ${
          userPanelActive === 0
            ? classes.usrpnlfillerinactive
            : classes.usrpnlfilleractive
        }`}
      ></div>
      <div
        className={`${classes.usrpnltopfiller} ${
          userPanelActive === 0
            ? classes.usrpnltopfillerinactive
            : classes.usrpnlfilleractive
        }`}
      ></div>
      <div
        className={`${classes.usrpnlheader} ${
          userPanelActive === 0
            ? classes.usrpnlheaderinactive
            : classes.usrpnlheaderactive
        }`}
        onClick={() => {
          if (userPanelActive === 0) {
            setUserPanelActive(1);
          } else if (userPanelActive === 1) {
            setUserPanelActive(0);
          }
        }}
      >
        {/* <img src={usericon} className={classes.usericon} alt="." /> */}
        <div className={classes.usrpnltextinactive}>{props.userEmail}</div>
        <div>
          <img
            src={userPanelActive === 0 ? burgericon : xicon}
            className={classes.usrpnlburgerinactive}
            alt="."
          />
        </div>
      </div>

      <div
        className={`${classes.usrpnldrawer} ${
          userPanelActive === 0
            ? classes.usrpnldrawerinactive
            : classes.usrpnldraweractive
        }`}
      >
        <div className={classes.usrpnldrawerselection}>
          {scenario === null ? (
            <LanguageSelector
              localizationData={props.localizationData}
              selectedLanguage={props.selectedLanguage}
              ChangeLanguage={props.ChangeLanguage}
            ></LanguageSelector>
          ) : (
            <Fragment>
              <CurrentScenarioDescription
                selectedItem={scenario}
                // selectedItem={props.selectedItem}
                selectedLanguage={props.selectedLanguage}
              ></CurrentScenarioDescription>
            </Fragment>
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
                url={props.url}
                userPanelActive={userPanelActive}
                setUserPanelActive={setUserPanelActive}
                selectedLanguage={props.selectedLanguage}
                setSelectedLanguage={props.setSelectedLanguage}
                localizationData={props.localizationData}
                getLocalization={props.getLocalization}
              />
            );
          })}
        </div>
      </div>
    </Fragment>
  );
}

export default UserPanel;
