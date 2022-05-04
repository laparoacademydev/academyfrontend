import React from "react";
import { useState, Fragment } from "react";
import axios from "axios";
import ReactGa from "react-ga";

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
    if (error.response === undefined) {
      console.log("error?");
    } else if (error.response.status === 401) {
      console.log(
        "Request, redirecting to login page, find better solution for this error asap"
      );
      window.localStorage.removeItem("jwt");
      window.location.href = AppHelper.LoginUrl;
    }
  }
}

function App() {
  //DEV Mode - for using localhost:3000 previews, keep false for all production builds:
  const [developerMode, setDeveloperMode] = useState(false);
  //TEST Mode - activated when logged in with an account that has "tester:true" in the Azure All Users DB.
  const [featureTestingMode, setFeatureTestingMode] = useState(null);

  const [loaded, setLoaded] = useState(false);
  const [loadingScreenMsg, setLoadingScreenMsg] = useState("");

  const [tokenConfirmed, setTokenConfirmed] = useState(false);
  const [userIsActive, setUserIsActive] = useState(0);
  const [accessCodeCheck, setAccessCodeCheck] = useState(false);
  const [accessCodeError, setAccessCodeError] = useState(false);

  // Acquire and store all user activity here at the beginning and update this everytime a checkbox is checked:
  const [userActivityHistory, setUserActivityHistory] = useState(null);
  const [userTrainingHistory, setUserTrainingHistory] = useState([]);

  const [courses, setCourses] = useState(null);
  const [localizationData, setLocalizationData] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCourseID, setSelectedCourseID] = useState(null);
  const [selectedScenarioList, setSelectedScenarioList] = useState([]);
  const [selectedNextItem, setSelectedNextItem] = useState(null);
  const [selectedPrevItem, setSelectedPrevItem] = useState(null);

  const [playingScenario, setPlayingScenario] = useState(false);
  const [userPanelActive, setUserPanelActive] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const [selectedTraining, setSelectedTraining] = useState(null);
  const [trainingList, setTrainingList] = useState(null);

  React.useEffect(() => {
    if (developerMode === true) {
      setTokenConfirmed(true);
      setUserIsActive(1);
      if (featureTestingMode === null) {
        setFeatureTestingMode(true);
      }
    }

    if (loaded === false) {
      loadAcademy();
    }

    if (loaded === true) {
      if (localizationData.language !== selectedLanguage) {
        getLocalization();
      }
    }

    initializeAcademy();

    if (selectedItem !== null) {
      selectedNextPrev(selectedItem.id, selectedScenarioList);
    }

    // ReactGa.initialize("G-WBREGFZ6J3");
    // ReactGa.pageview("/");
  }, [
    loaded,
    tokenConfirmed,
    userIsActive,
    accessCodeCheck,
    courses,
    localizationData,
    selectedItem,
    selectedLanguage,
    featureTestingMode,
    userActivityHistory,
  ]);

  // Loading Initializing Functions:
  function loadAcademy() {
    if (tokenConfirmed === false && developerMode === false) {
      checkToken();
    }
    if (userIsActive === 0 && tokenConfirmed === true) {
      checkUserActive();
    }
    if (localizationData === null && userIsActive === 1) {
      getLocalization();
    }
    if (courses === null && localizationData !== null) {
      getCourses();
    }
    if (courses !== null && featureTestingMode === null) {
      checkTesterUser();
    }
    if (featureTestingMode !== null && userActivityHistory === null) {
      AcquireUserHistory();
    }
    if (userActivityHistory !== null) {
      extractUserTrainingHistory(userActivityHistory);
    }
  }

  function initializeAcademy() {
    if (tokenConfirmed === true) {
      setLoadingScreenMsg("user token confirmed...");
      if (userIsActive === 1) {
        setLoadingScreenMsg("user verified...");
        if (localizationData !== null) {
          setLoadingScreenMsg("localization data downloaded...");
          if (courses !== null) {
            setLoadingScreenMsg("courses loaded...");
            if (userActivityHistory !== null) {
              setLoadingScreenMsg("user activity history loaded...");
              if (featureTestingMode !== null) {
                setLoadingScreenMsg("checked if user is tester...");
                if (loaded === false) {
                  setLoadingScreenMsg("");
                  setLoaded(true);
                  LogUserEvent("login");
                }
              }
            }
          }
        }
      }
    }
  }

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
          setCourses(extractCourseData(myJson));
          setCourseIdAndScenarioList(extractCourseData(myJson).courses[0]);
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

  function extractCourseData(myJson) {
    var extractedCourses = { courses };
    extractedCourses.courses = [];

    for (let i = 0; i < myJson.courses.length; i++) {
      var courseArray = [];
      for (let x = 0; x < myJson.courses[i].content.length; x++) {
        if (myJson.courses[i].content[x].simulators.Academy === true) {
          courseArray.push(myJson.courses[i].content[x]);
        }
      }
      if (courseArray.length !== 0) {
        var currentCourse = {
          content: courseArray,
          id: myJson.courses[i].id,
          name: myJson.courses[i].name,
        };

        extractedCourses.courses.push(currentCourse);
      }
    }
    return extractedCourses;
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
        var localizationPageObjectTextLanguage =
          localizationPageObjectText[selectedLanguage];

        extractedLocalizationPage[localizationPageObjectName] =
          localizationPageObjectTextLanguage;
      }
      extractedLocalization[localizationPageName] = extractedLocalizationPage;
    }
    extractedLocalization["language"] = selectedLanguage;
    setLocalizationData(extractedLocalization);
  }

  function extractUserTrainingHistory(userActivityHistory) {
    let activityhistory = [];
    for (let i = 0; i < userActivityHistory.length; i++) {
      if (userActivityHistory[i].event === "scenariocompleted") {
        activityhistory.push(userActivityHistory[i].component);
      }
    }
    setUserTrainingHistory(activityhistory);
  }

  function setCourseIdAndScenarioList(selectedCourse) {
    setSelectedTraining(null);
    setTrainingList(null);
    setSelectedItem(null);
    setPlayingScenario(false);
    setSelectedCourseID(selectedCourse.id);
    var courseselected = "courseselected";
    LogUserEvent(courseselected, selectedCourse.id);

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

  function selectedNextPrev(id, selectedScenarioList) {
    var scenarioListArrayNextPosition;
    var scenarioListArrayPrevPosition;

    for (let i = 0; i < selectedScenarioList.length; i++) {
      if (id === selectedScenarioList[i].scenario.id) {
        scenarioListArrayNextPosition = i + 1;
        scenarioListArrayPrevPosition = i - 1;

        if (i - 1 >= 0) {
          setSelectedPrevItem(
            selectedScenarioList[scenarioListArrayPrevPosition].scenario
          );
        } else {
          setSelectedPrevItem(null);
        }

        if (i + 1 <= selectedScenarioList.length - 1) {
          setSelectedNextItem(
            selectedScenarioList[scenarioListArrayNextPosition].scenario
          );
        } else {
          setSelectedNextItem(null);
        }
      }
    }
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
      } else {
        setTokenConfirmed(true);
      }
    } else {
      window.localStorage.setItem("jwt", webToken);
      window.location.href = fullIp[0];
      setTokenConfirmed(true);
    }
  }

  const checkUserActive = async () => {
    // this checks if our user is 'active' in our database - did he put in his serial number?
    var thisUserEmail = getUserEmail();
    try {
      let response = await axios.get(`${AppHelper.ApiUrl}CheckUserActive`, {
        headers: {
          "Access-Control-Allow-Origin": AppHelper.AllowAccessCodeOrigin,
          "Access-Control-Allow-Headers": "*",
        },
        params: { email: thisUserEmail },
      });

      if (response.data === true) {
        setUserIsActive(1);
      } else {
        setAccessCodeCheck(true);
      }
    } catch (error) {
      AppHelper.onRequestError(error);
    }
  };

  const checkTesterUser = async () => {
    // this checks if our user is 'tester:true' in our database - should we be showing newest, untested features?
    var thisUserEmail = getUserEmail();
    try {
      let response = await axios.get(`${AppHelper.ApiUrl}CheckTesterUser`, {
        headers: {
          "Access-Control-Allow-Origin": AppHelper.AllowAccessCodeOrigin,
          "Access-Control-Allow-Headers": "*",
        },
        params: { email: thisUserEmail },
      });

      if (response.data === true) {
        setFeatureTestingMode(true);
        console.log("tester mode active - logged in as tester user");
      } else {
        setFeatureTestingMode(false);
      }
    } catch (error) {
      AppHelper.onRequestError(error);
    }
  };

  function getUserEmail() {
    if (developerMode === false) {
      return decodeJWT(window.localStorage.getItem("jwt")).emails[0];
    } else {
      return "devmode@laparosimulators.com";
    }
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
        var activateduser = "activateduser";
        LogUserEvent(activateduser);
      });
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

  // API log call:
  function LogUserEvent(event, component) {
    var thisUserEmail = getUserEmail();
    // types of events: login, logout, activateduser
    // events with components: courseselected, scenarioselected, eduselected, scenariostart, advanceselect, aspireselect, starttrainingrecording, stoptrainingrecording, videodownload, scenariocompleted,

    if (component === null || component === undefined) {
      component = "none";
    }

    axios.post(`${AppHelper.ApiUrl}LogUserEvent`, null, {
      headers: {
        "Access-Control-Allow-Origin": AppHelper.AllowAccessCodeOrigin,
        "Access-Control-Allow-Headers": "*",
      },
      params: {
        email: thisUserEmail,
        date: Date(),
        event: event,
        component: component,
      },
    });

    //Add Event to local User ActivityHistory
  }

  //Remove the 'scenariocompleted' event from the user history:
  function RemoveLogScenarioCompleted(component) {
    var thisUserEmail = getUserEmail();
    var event = "scenariocompleted";

    axios.delete(`${AppHelper.ApiUrl}RemoveLogScenarioCompleted`, {
      headers: {
        "Access-Control-Allow-Origin": AppHelper.AllowAccessCodeOrigin,
        "Access-Control-Allow-Headers": "*",
      },
      params: { email: thisUserEmail, event: event, component: component },
    });
  }

  // Acquire all existing User activity (done once at every login)
  const AcquireUserHistory = async () => {
    var thisUserEmail = getUserEmail();

    try {
      let response = await axios.get(`${AppHelper.ApiUrl}UserActivityHistory`, {
        headers: {
          "Access-Control-Allow-Origin": AppHelper.AllowAccessCodeOrigin,
          "Access-Control-Allow-Headers": "*",
        },
        params: {
          email: thisUserEmail,
        },
      });
      setUserActivityHistory(response.data);
    } catch (error) {
      AppHelper.onRequestError(error);
    }
  };

  if (isMobile === true) {
    return <MobileView />;
  } else if (accessCodeCheck === true) {
    return (
      <AccessCodeScreen
        sendAccessCode={sendAccessCode}
        accessCodeError={accessCodeError}
      />
    );
  } else if (loaded === false) {
    return <LoadingScreen loadingScreenMsg={loadingScreenMsg} />;
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
          developerMode={developerMode}
          featureTestingMode={featureTestingMode}
          LogUserEvent={LogUserEvent}
          selectedItem={selectedItem}
        />
        {selectedItem === null ? (
          <ScenarioList
            selectedScenarioList={selectedScenarioList}
            setSelectedItem={setSelectedItem}
            selectedLanguage={selectedLanguage}
            LogUserEvent={LogUserEvent}
          ></ScenarioList>
        ) : (
          <DisplayedItemContent
            selectedItemContent={selectedItem}
            setPlayingScenario={setPlayingScenario}
            selectedLanguage={selectedLanguage}
            localizationData={localizationData}
            setSelectedItem={setSelectedItem}
            selectedNextItem={selectedNextItem}
            selectedPrevItem={selectedPrevItem}
            LogUserEvent={LogUserEvent}
            setUserTrainingHistory={setUserTrainingHistory}
            userTrainingHistory={userTrainingHistory}
            featureTestingMode={featureTestingMode}
            RemoveLogScenarioCompleted={RemoveLogScenarioCompleted}
          ></DisplayedItemContent>
        )}
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <WebcamTraining
          name={selectedItem.name.en}
          setPlayingScenario={setPlayingScenario}
          localizationData={localizationData}
          selectedLanguage={selectedLanguage}
          LogUserEvent={LogUserEvent}
          selectedItem={selectedItem}
        />
      </Fragment>
    );
  }
}
export default App;
