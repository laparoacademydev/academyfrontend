import React, { useState } from "react";
import ActiveUserPanel from "./ActiveUserPanel";
import InactiveUserPanel from "./InactiveUserPanel";

function UserPanel(props) {
  if (props.userPanelActive === 0) {
    return (
      <InactiveUserPanel
        userEmail={props.userEmail}
        setUserPanelActive={props.setUserPanelActive}
        userPanelActive={props.userPanelActive}
      />
    );
  } else if (props.userPanelActive === 1) {
    return (
      <ActiveUserPanel
        userEmail={props.userEmail}
        setUserPanelActive={props.setUserPanelActive}
        userPanelActive={props.userPanelActive}
        setTrainingList={props.setTrainingList}
        userIsActive={props.userIsActive}
        url={props.url}
        selectedLanguage={props.selectedLanguage}
        setSelectedLanguage={props.setSelectedLanguage}
        localizationData={props.localizationData}
      />
    );
  }
}

export default UserPanel;
