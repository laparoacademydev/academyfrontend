import LeftSidePanel from "./LeftSidePanel/LeftSidePanel";
import { Fragment } from "react";
import { AppHelper } from "../../App";
import MainList from "./MainList/MainList";
import DisplayedItemContent from "./DisplayedItemContent/DisplayedItemContent";
import { useState } from "react";
import React from "react";

function ContentSelection(props) {
  // tells component to render after all is done
  const [contentSelectionListLoaded, setContentSelectionListLoaded] =
    useState(false);

  const [displayContentItem, setDisplayContentItem] = useState(false);

  // displays a particular ScenarioList that was selected in the LeftSidePanel:
  const [selectedScenarioList, setSelectedScenarioList] = useState([]);

  const [selectedCourseID, setSelectedCourseID] = useState(null);

  const [selectedItemContent, setSelectedItemContent] = useState(
    AppHelper.DefaultFreeTraining
  );

  React.useEffect(() => {
    // console.log("ContentSelection useEffect");
    // console.log(props);

    if (selectedCourseID === null && displayContentItem === false) {
      RenderScenarioList(props.courses.courses[0]);
    }

    //
    //when all above are done - contentSelectionListLoaded to display this component
    if (selectedCourseID !== null && selectedScenarioList.length !== 0) {
      setContentSelectionListLoaded(true);
    }
  }, [
    contentSelectionListLoaded,
    selectedItemContent,
    selectedScenarioList,
    selectedCourseID,
  ]);

  //functions:

  function RenderScenarioList(selectedCourse) {
    // console.log("RenderScenarioList in contentselection fired");

    // props.setSelectedItemContent(AppHelper.DefaultFreeTraining);
    props.setwebCamTrainingActive(false);
    setSelectedCourseID(selectedCourse.id);
    var courseselected = "courseselected";
    AppHelper.LogEvent(courseselected, selectedCourse.id);

    let scenarioFileNames = [];
    let scenarioTypes = [];
    selectedCourse.content.forEach((x) => {
      scenarioTypes.push(x.type);

      scenarioFileNames.push(x.id);
    });
    var responseJsonData = [];

    scenarioFileNames.forEach((filenamejson) => {
      fetch(
        "./academycontentstorage/laparoacademy-jsoncontent/" +
          filenamejson +
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
          responseJsonData.push(myJson);
          if (responseJsonData.length === scenarioFileNames.length) {
            let responseSelectedData = [];
            for (let i = 0; i < responseJsonData.length; i++) {
              for (let z = 0; z < responseJsonData.length; z++) {
                if (selectedCourse.content[i].id === responseJsonData[z].id) {
                  responseSelectedData.push({
                    type: scenarioTypes[i],
                    scenario: responseJsonData[z],
                  });
                  z = 100;
                  responseJsonData.splice(z, 1);
                }
              }
            }

            for (let i = 0; i < responseSelectedData.length; i++) {
              if (responseSelectedData[i].scenario.isVR === true) {
                responseSelectedData.splice(i, 1);
                i--;
              }
            }

            setSelectedScenarioList(responseSelectedData);
          }
        })
        .catch((err) => {
          console.log("error recorded " + err);
        });
    });
  }

  // JSX components:
  function RenderMainList() {
    return (
      <MainList
        selectedScenarioList={selectedScenarioList}
        setSelectedItemContent={setSelectedItemContent}
        selectedLanguage={props.selectedLanguage}
        userTrainingHistory={props.userTrainingHistory}
        courses={props.courses}
        selectedCourseID={selectedCourseID}
        setDisplayContentItem={setDisplayContentItem}
      ></MainList>
    );
  }

  function RenderDisplayedItemContent() {
    return (
      <DisplayedItemContent
        setSelectedItemContent={setSelectedItemContent}
        selectedItemContent={selectedItemContent}
        setwebCamTrainingActive={props.setwebCamTrainingActive}
        selectedLanguage={props.selectedLanguage}
        localizationData={props.localizationData}
        setUserTrainingHistory={props.setUserTrainingHistory}
        userTrainingHistory={props.userTrainingHistory}
        RemoveLogScenarioCompleted={props.RemoveLogScenarioCompleted}
        setDisplayContentItem={setDisplayContentItem}
        selectedScenarioList={selectedScenarioList}
      ></DisplayedItemContent>
    );
  }

  function RenderLeftSidePanel() {
    return (
      <LeftSidePanel
        courses={props.courses}
        RenderScenarioList={RenderScenarioList}
        selectedCourseID={selectedCourseID}
        selectedLanguage={props.selectedLanguage}
        localizationData={props.localizationData}
        StartScenarioFreeTraining={props.StartScenarioFreeTraining}
        setDisplayContentItem={setDisplayContentItem}
      ></LeftSidePanel>
    );
  }

  if (contentSelectionListLoaded === false) {
    return <></>; //loading
  } else if (contentSelectionListLoaded === true) {
    return (
      <Fragment>
        <RenderLeftSidePanel></RenderLeftSidePanel>
        {displayContentItem === true ? (
          <RenderDisplayedItemContent></RenderDisplayedItemContent>
        ) : (
          <RenderMainList></RenderMainList>
        )}
      </Fragment>
    );
  }
}

export default ContentSelection;
