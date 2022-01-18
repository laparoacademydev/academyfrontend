import { Fragment } from "react";
import LogoHome from "../LogoHome/LogoHome";
import Courses from "../Sidebar/Courses";
import UserPanel from "../UserPanel/UserPanel";
import Topbar from "../Topbar/Topbar";

function Layout(props) {
  return (
    <Fragment>
      <LogoHome />
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
      />
      <Topbar />
    </Fragment>
  );
}

export default Layout;
