import React from "react";
import { useState, Fragment } from "react";

import ScenarioList from "./components/ScenarioList/ScenarioList";
import DisplayedItemContent from "./components/DisplayedItemContent/DisplayedItemContent";
import WebcamTraining from "./components/WebcamTraining/WebcamTraining";
import TrainingsList from "./components/TrainingsList/TrainingsList";
import ShowTraining from "./components/ShowTraining/ShowTraining";
import AccessCodeScreen from "./components/AccessCodeScreen/AccessCodeScreen";
// import decodeJWT from "jwt-decode";
import Layout from "./components/UI/Layout";

// import GetCourses from "./academycontentstorage/laparoacademy-jsoncontent/courses.json";

export class AppHelper {
  static ApiUrl =
    "https://academylaparomanagementservice.azure-api.net/laparoacademyfunctionapp/";
  static storageUrl = "./academycontentstorage/";
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
  const [selectedLanguage, setSelectedLanguage] = useState("pl");

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
          // console.log(response);
          return response.json();
        })
        .then(function (myJson) {
          // console.log(myJson);
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
      // console.log(x.id);
      scenarioFileNames.push(x.id);
    });
    // console.log(selectedCourse.content[0].id);
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

  // console.log(scenarioFileNames);
  // console.log(scenarioTypes.length);

  if (loaded === false) {
    return <h1>Waiting Loaded False</h1>;
  } else if (userIsActive === 0) {
    return <h1>Waiting Access Code Screen</h1>;
    // <AccessCodeScreen sendAccessCode={sendAccessCode} />;
  } else if (courses === null) {
    return <h1>Waiting</h1>;
  } else if (selectedTraining !== null) {
    return (
      <Fragment>
        <Layout
          items={courses}
          setCourseIdAndScenarioList={setCourseIdAndScenarioList}
          selectedCourseID={selectedCourseID}
          userEmail={getUserEmail()}
          setTrainingList={requestSetTrainingList}
          userIsActive={userIsActive}
          // url={AppHelper.ApiUrl}
          userPanelActive={userPanelActive}
          setUserPanelActive={setUserPanelActive}
          selectedLanguage={selectedLanguage}
        />
        <ShowTraining training={selectedTraining}></ShowTraining>
      </Fragment>
    );
    // }
    // else if (trainingList !== null) {
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
    //       />
    //       <TrainingsList
    //         trainingList={trainingList}
    //         // setSelectedTraining={requestSelectedTraining}
    //         deleteTraining={deleteTraining}
    //       ></TrainingsList>
    //     </Fragment>
    //   );
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
          // url={AppHelper.ApiUrl}
          userPanelActive={userPanelActive}
          setUserPanelActive={setUserPanelActive}
          selectedLanguage={selectedLanguage}
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
          // url={AppHelper.ApiUrl}
          userPanelActive={userPanelActive}
          setUserPanelActive={setUserPanelActive}
          selectedLanguage={selectedLanguage}
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
        {/* <Layout
          items={courses}
          setCourseIdAndScenarioList={setCourseIdAndScenarioList}
          selectedCourseID={selectedCourseID}
          userEmail={getUserEmail()}
          setTrainingList={requestSetTrainingList}
          userIsActive={userIsActive}
          // url={AppHelper.ApiUrl}
          userPanelActive={userPanelActive}
          setUserPanelActive={setUserPanelActive}
        /> */}
        <WebcamTraining
          // url={AppHelper.ApiUrl}
          name={selectedItem.name.en}
          setPlayingScenario={setPlayingScenario}
        />
      </Fragment>
    );
  }
}

export default App;
