import React from "react";
import { useState, Fragment } from "react";
import axios from "axios";

import ScenarioList from "./components/ScenarioList/ScenarioList";
import DisplayedItemContent from "./components/DisplayedItemContent/DisplayedItemContent";
import WebcamTraining from "./components/WebcamTraining/WebcamTraining";
import Layout from "./components/UI/Layout";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import AccessCodeScreen from "./components/AccessCodeScreen/AccessCodeScreen";
import MobileView from "./components/MobileView/MobileView";

import decodeJWT from "jwt-decode";

import { isMobile } from "react-device-detect";

export class AppHelper {
  static ApiUrl =
    "https://academylaparomanagementservice.azure-api.net/laparoacademyfunctionapp/";
  static storageUrl = "./academycontentstorage/";
  static languages = ["en", "pl"];
  static LoginUrl =
    "https://b2ctenantlaparoacademy.b2clogin.com/b2ctenantlaparoacademy.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_academysignupsignin&client_id=5543e448-b26a-4ec3-955c-3c7e70b24d88&nonce=defaultNonce&redirect_uri=https%3A%2F%2Facademy.laparosimulators.com&scope=openid&response_type=id_token&prompt=login";
  static AllowAccessCodeOrigin = "https://academy.laparosimulators.com";
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
  const [localizationData, setLocalizationData] = useState(null);
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
  const [accessCodeError, setAccessCodeError] = useState(false);

  // this is for development mode - when set to true, bypasses the checking of user and login options
  const [developerMode, setDeveloperMode] = useState(false);

  React.useEffect(() => {
    if (courses === null) {
      getCourses();
    }

    if (developerMode === false) {
      checkToken();
      if (loaded === false) {
        checkUserActive();
        getLocalization();
      }
    } else {
      setLoaded(true);
      setUserIsActive(1);
      if (localizationData === null) {
        getLocalization();
      } else if (localizationData.language !== selectedLanguage) {
        getLocalization();
      }

      // getCourses();
    }
  });

  // Content Related Functions:
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

  function getLocalization() {
    fetch(
      `${AppHelper.storageUrl}laparoacademy-jsoncontent/academy_localization.json`,
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
        extractLocalizationData(myJson, selectedLanguage);
      });
  }

  function extractLocalizationData(myJson, selectedLanguage) {
    var extractedLocalization = {};
    var localizationPages = Object.entries(myJson);

    for (let i = 0; i < localizationPages.length; i++) {
      var localizationPageName = localizationPages[i][0];
      var localizationPageObject = Object.entries(localizationPages[i][1]);

      var extractedLocalizationPage = {};
      for (let a = 0; a < localizationPageObject.length; a++) {
        var localizationPageObjectName = localizationPageObject[a][0];
        var localizationPageObjectText = localizationPageObject[a][1].text;
        var localizationPageObjectTextLanguage = eval(
          "localizationPageObjectText." + selectedLanguage
        );

        extractedLocalizationPage[localizationPageObjectName] =
          localizationPageObjectTextLanguage;
      }
      extractedLocalization[localizationPageName] = extractedLocalizationPage;
    }
    extractedLocalization["language"] = selectedLanguage;
    setLocalizationData(extractedLocalization);
  }

  // User Related Functions:
  function checkToken() {
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
  }

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
          // getLocalization();
          // getCourses();
        } else {
          setAccessCodeCheck(true);
          setLoaded(true);
        }
      })
      .catch((error) => {
        AppHelper.onRequestError(error);
      });
  }

  function getUserEmail() {
    if (developerMode === false) {
      return decodeJWT(window.localStorage.getItem("jwt")).emails[0];
    } else {
      return "devmode@laparosimulators.com";
    }
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
          activateUser(thisaccesscode);
          removeAccessCode(thisaccesscode);
        } else if (response.data === "False") {
          setAccessCodeError(true);
          console.log("access code did not work");
        } else {
          setAccessCodeError(true);
          console.log("access code request did not work at all");
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

  function activateUser(thisaccesscode) {
    var thisUserEmail = getUserEmail();
    axios
      .post(`${AppHelper.ApiUrl}ActivateCreatedUser`, null, {
        headers: {
          "Access-Control-Allow-Origin": AppHelper.AllowAccessCodeOrigin,
          "Access-Control-Allow-Headers": "*",
        },
        params: {
          email: thisUserEmail,
          active: true,
          serialnumber: thisaccesscode,
        },
      })
      .then(() => {
        setLoaded(true);
        setAccessCodeCheck(false);
        checkUserActive();
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

  if (isMobile === true) {
    return <MobileView />;
  } else if (loaded === false) {
    return <LoadingScreen />;
  } else if (accessCodeCheck === true) {
    return (
      <AccessCodeScreen
        sendAccessCode={sendAccessCode}
        accessCodeError={accessCodeError}
      />
    );
  } else if (courses === null) {
    return <LoadingScreen />;
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
          localizationData={localizationData}
          getLocalization={getLocalization}
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
          localizationData={localizationData}
          getLocalization={getLocalization}
        />
        <DisplayedItemContent
          selectedItemContent={selectedItem}
          setPlayingScenario={setPlayingScenario}
          selectedLanguage={selectedLanguage}
          localizationData={localizationData}
        ></DisplayedItemContent>
      </Fragment>
    );
  } else if (playingScenario === true) {
    return (
      <Fragment>
        <WebcamTraining
          name={selectedItem.name.en}
          setPlayingScenario={setPlayingScenario}
          localizationData={localizationData}
          selectedLanguage={selectedLanguage}
        />
      </Fragment>
    );
  }
}
export default App;
