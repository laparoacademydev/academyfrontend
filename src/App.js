import React from "react";
import { useState, Fragment } from "react";

import ScenarioList from "./components/ScenarioList/ScenarioList";
import DisplayedItemContent from "./components/DisplayedItemContent/DisplayedItemContent";
import WebcamTraining from "./components/WebcamTraining/WebcamTraining";
import Layout from "./components/UI/Layout";
// import TrainingsList from "./components/TrainingsList/TrainingsList";
// import ShowTraining from "./components/ShowTraining/ShowTraining";
// import AccessCodeScreen from "./components/AccessCodeScreen/AccessCodeScreen";

export class AppHelper {
  static ApiUrl =
    "https://academylaparomanagementservice.azure-api.net/laparoacademyfunctionapp/";
  static storageUrl = "./academycontentstorage/";
  static languages = ["en", "pl"];
}

function App() {
  const [courses, setCourses] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [userIsActive, setUserIsActive] = useState(0);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [trainingList, setTrainingList] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [playingScenario, setPlayingScenario] = useState(false);
  const [selectedCourseID, setSelectedCourseID] = useState(null);
  const [selectedScenarioList, setSelectedScenarioList] = useState([]);
  const [userPanelActive, setUserPanelActive] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  React.useEffect(() => {
    if (loaded === false) {
      checkUserActive();
    }
  });

  function checkUserActive() {
    getCourses();
    setLoaded(true);
    setUserIsActive("user is active?");
  }

  function getCourses() {
    if (courses === null) {
      fetch(`${AppHelper.storageUrl}laparoacademy-jsoncontent/courses.json`, {
        headers: {
          "Content-Type": "application/json",

          Accept: "application/json",
        },
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (myJson) {
          setCourses(myJson);
          setCourseIdAndScenarioList(myJson.courses[0]);
        });
    }
  }

  function setCourseIdAndScenarioList(selectedCourse) {
    setSelectedTraining(null);
    setTrainingList(null);
    setSelectedItem(null);
    setPlayingScenario(false);
    setSelectedCourseID(selectedCourse.id);

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
          ".json",
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

  function getUserEmail() {
    return "test@test.com";
  }

  // function requestSelectedTraining(training) {
  //   // this is for managing existing trainings
  // }

  function setSelectedCourseItem(selected) {
    setSelectedScenarioList(null);
    setSelectedItem(selected);
  }

  function requestSetTrainingList() {
    setSelectedTraining(null);
    setSelectedCourseID(null);
    setTrainingList("?");
  }

  function deleteTraining(training) {
    // nothing happens
  }

  if (loaded === false) {
    return <h1>Waiting Loaded False</h1>;
  } else if (userIsActive === 0) {
    return <h1>Waiting Access Code Screen</h1>;
    // <AccessCodeScreen sendAccessCode={sendAccessCode} />;
  } else if (courses === null) {
    return <h1>Waiting</h1>;
    // }
    // else if (selectedTraining !== null) {
    //   return (
    //     <Fragment>
    //       <Layout
    //         items={courses}
    //         setCourseIdAndScenarioList={setCourseIdAndScenarioList}
    //         selectedCourseID={selectedCourseID}
    //         userEmail={getUserEmail()}
    //         setTrainingList={requestSetTrainingList}
    //         userIsActive={userIsActive}
    //         // url={AppHelper.ApiUrl}
    //         userPanelActive={userPanelActive}
    //         setUserPanelActive={setUserPanelActive}
    //         selectedLanguage={selectedLanguage}
    //       />
    //       <ShowTraining training={selectedTraining}></ShowTraining>
    //     </Fragment>
    //   );
    //   // }
    //   // else if (trainingList !== null) {
    //   //   return (
    //   //     <Fragment>
    //   //       <Layout
    //   //         items={courses}
    //   //         setCourseIdAndScenarioList={setCourseIdAndScenarioList}
    //   //         selectedCourseID={selectedCourseID}
    //   //         userEmail={getUserEmail()}
    //   //         setTrainingList={requestSetTrainingList}
    //   //         userIsActive={userIsActive}
    //   //         // url={AppHelper.ApiUrl}
    //   //         userPanelActive={userPanelActive}
    //   //         setUserPanelActive={setUserPanelActive}
    //   //       />
    //   //       <TrainingsList
    //   //         trainingList={trainingList}
    //   //         // setSelectedTraining={requestSelectedTraining}
    //   //         deleteTraining={deleteTraining}
    //   //       ></TrainingsList>
    //   //     </Fragment>
    //   //   );
    // }
  } else if (selectedItem === null) {
    return (
      <Fragment>
        <Layout
          items={courses}
          setCourseIdAndScenarioList={setCourseIdAndScenarioList}
          selectedCourseID={selectedCourseID}
          userEmail={getUserEmail()}
          setTrainingList={requestSetTrainingList}
          userIsActive={userIsActive}
          userPanelActive={userPanelActive}
          setUserPanelActive={setUserPanelActive}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
        />
        <ScenarioList
          selectedScenarioList={selectedScenarioList}
          setSelectedCourseItem={setSelectedCourseItem}
          selectedLanguage={selectedLanguage}
        ></ScenarioList>
      </Fragment>
    );
  } else if (playingScenario === false) {
    return (
      <Fragment>
        <Layout
          items={courses}
          setCourseIdAndScenarioList={setCourseIdAndScenarioList}
          selectedCourseID={selectedCourseID}
          userEmail={getUserEmail()}
          setTrainingList={requestSetTrainingList}
          userIsActive={userIsActive}
          userPanelActive={userPanelActive}
          setUserPanelActive={setUserPanelActive}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
        />
        <DisplayedItemContent
          selectedItemContent={selectedItem}
          setPlayingScenario={setPlayingScenario}
          selectedLanguage={selectedLanguage}
        ></DisplayedItemContent>
      </Fragment>
    );
  } else if (playingScenario === true) {
    return (
      <Fragment>
        <WebcamTraining
          name={selectedItem.name.en}
          setPlayingScenario={setPlayingScenario}
        />
      </Fragment>
    );
  }
}
export default App;
