import { Fragment } from "react";
import LogoHome from "../LogoHome/LogoHome";
import Courses from "../Sidebar/Courses";
import UserPanel from "../UserPanel/UserPanel";
import Topbar from "../Topbar/Topbar";
import ScreenHeightWidthTester from "../devTools/ScreenHeightWidthTester";

function Layout(props) {
  return (
    <Fragment>
      <LogoHome />
      {props.developerMode ? (
        <ScreenHeightWidthTester></ScreenHeightWidthTester>
      ) : (
        <div></div>
      )}

      <Courses
        items={props.items}
        setCourseIdAndScenarioList={props.setCourseIdAndScenarioList}
        selectedCourseID={props.selectedCourseID}
        selectedLanguage={props.selectedLanguage}
      />
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
      />
      <Topbar />
    </Fragment>
  );
}

export default Layout;
