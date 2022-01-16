import React, { useState, Fragment } from "react";
import classes from "./UserPanel.module.css";
import axios from "axios";
import { AppHelper } from "./../../App.js";
import xicon from "../../graphicassets/icons/X_icon_white.svg";
import usericon from "../../graphicassets/icons/userico_white.svg";
import exitusericon from "../../graphicassets/icons/exituserico_white.svg";
import addusericon from "../../graphicassets/icons/addusercode_ico.svg";
import listicon from "../../graphicassets/icons/listico_white.svg";
import ActiveUserPanelItem from "./ActiveUserPanelItem";
import shopicon from "../../graphicassets/icons/shopico_white.svg";

function ActiveUserPanel(props) {
  var userpanelitems = [
    // {
    //   text: "Saved Training List",
    //   onclick: function () {
    //     props.setTrainingList();
    //     props.setUserPanelActive(0);
    //   },
    //   icon: listicon,
    // },
  ];

  const adduseruserpanelitem = {
    text: "Add User",
    onclick: function () {
      axios
        .get(
          `${props.url}GenerateAccessCode?email=${props.userEmail}`,
          AppHelper.getHeaders()
        )
        .catch(AppHelper.onRequestError)
        .then((response) => {
          // navigator.clipboard.writeText(response.data);
          setCode(response.data);
          alert("copy this text: " + response.data);
        });
    },
    icon: addusericon,
  };

  if (props.userIsActive === 2) {
    userpanelitems.push(adduseruserpanelitem);
  }

  const laparoshoplink = {
    text: "Laparo Shop",
    onclick: function () {
      window.open("https://laparosimulators.com/");
    },
    icon: shopicon,
  };

  userpanelitems.push(laparoshoplink);

  const logoutuserpanelitem = {
    text: "Log Out",
    onclick: function () {
      window.localStorage.removeItem("jwt");
      window.location.href = AppHelper.LoginUrl;
    },
    icon: exitusericon,
  };

  // userpanelitems.push(logoutuserpanelitem);

  const languageselection = {
    text: "Language",
    onclick: function () {
      console.log("clicked!");
    },
    icon: shopicon,
  };

  // userpanelitems.push(languageselection);

  const [code, setCode] = useState("Generate Access code");

  return (
    <Fragment>
      <div className={classes.overlay}></div>
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
                code={code}
              />
            );
          })}
        </div>
      </div>
    </Fragment>
  );
}

export default ActiveUserPanel;
