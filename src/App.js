import React from "react";
import { useState, Fragment } from "react";
import axios from "axios";

import ScenarioList from "./components/ScenarioList/ScenarioList";
import DisplayedItemContent from "./components/DisplayedItemContent/DisplayedItemContent";
import WebcamTraining from "./components/WebcamTraining/WebcamTraining";
import Layout from "./components/UI/Layout";

import AccessCodeScreen from "./components/AccessCodeScreen/AccessCodeScreen";
import decodeJWT from "jwt-decode";

export class AppHelper {
  static ApiUrl =
    "https://academylaparomanagementservice.azure-api.net/laparoacademyfunctionapp/";
  static storageUrl = "./academycontentstorage/";
  static languages = ["en", "pl"];
  static LoginUrl =
    "https://b2ctenantlaparoacademy.b2clogin.com/b2ctenantlaparoacademy.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_academysignupsignin&client_id=5543e448-b26a-4ec3-955c-3c7e70b24d88&nonce=defaultNonce&redirect_uri=http%3A%2F%2Flocalhost%3A3000&scope=openid&response_type=id_token&prompt=login";
  static AllowAccessCodeOrigin =
    "https://academycontentstorage.z1.web.core.windows.net/";
  static onRequestError(error) {
    if (error.response === undefined || error.response.status === 401) {
      console.log(
        "Request, redirecting to login page, find better solution for this error asap"
      );
      window.localStorage.removeItem("jwt");
      window.location.href = AppHelper.LoginUrl;
    }
  }
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
  const [accessCodeCheck, setAccessCodeCheck] = useState(false);

  React.useEffect(() => {
    var fullIp = window.location.href.split("#id_token=");
    var webToken = fullIp[1];
    if (webToken === null || webToken === undefined) {
      var localToken = window.localStorage.getItem("jwt");
      if (localToken === null || localToken === undefined) {
        window.location.href = `${AppHelper.LoginUrl}`;
        return false;
      }
    } else {
      window.localStorage.setItem("jwt", webToken);
      window.location.href = fullIp[0];
    }
    if (loaded === false) {
      checkUserActive();
    }
  });

  // User Related Functions:
  function checkUserActive() {
    var thisUserEmail = getUserEmail();
    axios
      .get(`${AppHelper.ApiUrl}CheckUserActive`, {
        headers: {
          "Access-Control-Allow-Origin": AppHelper.AllowAccessCodeOrigin,
          "Access-Control-Allow-Headers": "*",
        },
        params: { email: thisUserEmail },
      })
      .then((response) => {
        if (response.data === true) {
          setLoaded(true);
          setUserIsActive(1);
          getCourses();
        } else {
          setAccessCodeCheck(true);
          setLoaded(true);
        }
      })
      .catch((error) => {
        AppHelper.onRequestError(error);
      });
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

  function getUserEmail() {
    return decodeJWT(window.localStorage.getItem("jwt")).emails[0];
  }

  //Access Code Related Functions:
  function sendAccessCode(thisaccesscode) {
    axios
      .get(`${AppHelper.ApiUrl}CheckAccessCode`, {
        headers: {
          "Access-Control-Allow-Origin": AppHelper.AllowAccessCodeOrigin,
          "Access-Control-Allow-Headers": "*",
        },
        params: { accesscode: thisaccesscode },
      })
      .then((response) => {
        if (response.data === "True") {
          activateUser();
          removeAccessCode(thisaccesscode);
        } else {
          console.log("access code not worked");
        }
      });
  }

  function removeAccessCode(thisaccesscode) {
    axios.delete(`${AppHelper.ApiUrl}RemoveAccessCode`, {
      headers: {
        "Access-Control-Allow-Origin": AppHelper.AllowAccessCodeOrigin,
        "Access-Control-Allow-Headers": "*",
      },
      params: { accesscode: thisaccesscode },
    });
  }

  function activateUser() {
    var thisUserEmail = getUserEmail();
    console.log(thisUserEmail);
    axios
      .post(`${AppHelper.ApiUrl}ActivateCreatedUser`, null, {
        headers: {
          "Access-Control-Allow-Origin": AppHelper.AllowAccessCodeOrigin,
          "Access-Control-Allow-Headers": "*",
        },
        params: {
          email: thisUserEmail,
          active: true,
        },
      })
      .then(() => {
        setLoaded(true);
        setAccessCodeCheck(false);
        checkUserActive();
        getCourses();
      });
  }

  // Scenario and Content Related Functions:
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

  function setSelectedCourseItem(selected) {
    setSelectedScenarioList(null);
    setSelectedItem(selected);
  }

  if (loaded === false) {
    return <h1>Waiting Loaded False</h1>;
  } else if (accessCodeCheck === true) {
    return <AccessCodeScreen sendAccessCode={sendAccessCode} />;
  } else if (courses === null) {
    return <h1>Waiting</h1>;
  } else if (selectedItem === null) {
    return (
      <Fragment>
        <Layout
          items={courses}
          setCourseIdAndScenarioList={setCourseIdAndScenarioList}
          selectedCourseID={selectedCourseID}
          userEmail={getUserEmail()}
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
