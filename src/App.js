import React from "react";
import { useState, Fragment } from "react";
import axios from "axios";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutPage from "./components/AboutPage/AboutPage";

import WebcamTraining from "./components/WebcamTraining/WebcamTraining";
import Layout from "./components/UI/Layout";
import LoadingScreen from "./components/MiscScreens/LoadingScreen/LoadingScreen";

import AccessCodeScreen from "./components/MiscScreens/AccessCodeScreen/AccessCodeScreen";
import MobileView from "./components/MiscScreens/MobileView/MobileView";

import decodeJWT from "jwt-decode";

import { isMobile } from "react-device-detect";

import TrainingSelection from "./components/TrainingSelection/TrainingSelection";

export class AppHelper {
  static developerMode = false;
  static ApiUrl =
    "https://academylaparomanagementservice.azure-api.net/laparoacademyfunctionapp/";
  static storageUrl = "./academycontentstorage/";
  static languages = ["en", "pl"];
  static LoginUrl =
    "https://b2ctenantlaparoacademy.b2clogin.com/b2ctenantlaparoacademy.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_academysignupsignin&client_id=5543e448-b26a-4ec3-955c-3c7e70b24d88&nonce=defaultNonce&redirect_uri=https%3A%2F%2Facademy.laparosimulators.com&scope=openid&response_type=id_token&prompt=login";
  static AllowAccessCodeOrigin = "https://academy.laparosimulators.com";
  static LocalizationVersion = 3;
  static ContentVersion = 2;
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
  static DefaultFreeTraining = {
    id: "FreeTraining",
    cameraConfig: {
      Apex: {},
      Analytic: {},
      Advance: {},
    },
    trocarsConfig: {
      Apex: {},
      Analytic: {},
      Advance: {},
    },
    tableConfig: {
      Apex: {},
      Analytic: {},
      Advance: {},
    },
    isFreeTraining: true,
    evalConfig: {
      manual: {
        categories: [
          {
            params: [
              {
                name: "time",
              },
            ],
            name: "time",
          },
          {
            params: [
              {
                name: "clamps",
              },
              {
                name: "distance",
              },
            ],
            name: "economy",
          },
          {
            params: [
              {
                name: "symmetryDistance",
              },
              {
                name: "symmetryClamps",
              },
            ],
            name: "bimanual",
          },
          {
            params: [
              {
                name: "acceleration",
              },
              {
                name: "jolt",
              },
              {
                name: "clampSpeed",
              },
              {
                name: "handOscillation",
              },
            ],
            name: "smoothness",
          },
          {
            params: [
              {
                name: "velocityHigh",
              },
              {
                name: "velocityLowOneHand",
              },
              {
                name: "velocityLowTwoHand",
              },
            ],
            name: "activity",
          },
          {
            params: [
              {
                name: "distanceOutOfVis",
              },
              {
                name: "clampsOutOfVis",
              },
            ],
            name: "visibility",
          },
        ],
      },
    },
    vrConfig: {},
    isVR: false,
    name: {
      en: "Free Training",
      pl: "Dowolny Trening",
      es: "Capacitación gratuita",
      "zh-cn": "免费培训",
      ja: "無料トレーニング",
      hu: "Ingyenes képzés",
    },
    skills: {},
    description: {},
    instructions: {},
    preparation: {},
  };
  static aspireVideoConstraints = {
    width: 1280,
    height: 720,
  };

  static advanceVideoConstraints = {
    width: 1920,
    height: 1080,
  };
}

function App() {
  //TEST Mode - activated when logged in with an account that has "tester:true" in the Azure All Users DB.
  const [featureTestingMode, setFeatureTestingMode] = useState(null);

  const [loaded, setLoaded] = useState(false);
  const [loadingScreenMsg, setLoadingScreenMsg] = useState("");

  const [tokenConfirmed, setTokenConfirmed] = useState(false);
  const [userIsActive, setUserIsActive] = useState(0);
  const [accessCodeCheck, setAccessCodeCheck] = useState(false);
  const [accessCodeError, setAccessCodeError] = useState(false);

  const [userActivityHistory, setUserActivityHistory] = useState(null);
  const [userTrainingHistory, setUserTrainingHistory] = useState([]);

  const [localizationData, setLocalizationData] = useState(null);
  const [courses, setCourses] = useState(null);
  const [selectedCourseID, setSelectedCourseID] = useState(null);
  const [selectedScenarioList, setSelectedScenarioList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(
    AppHelper.DefaultFreeTraining
  );

  const [selectedNextItem, setSelectedNextItem] = useState(null);
  const [selectedPrevItem, setSelectedPrevItem] = useState(null);

  const [playingScenario, setPlayingScenario] = useState(false);
  const [userPanelActive, setUserPanelActive] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const [selectedTraining, setSelectedTraining] = useState(null);
  const [trainingList, setTrainingList] = useState(null);

  const [topBarSelectionOption, setTopBarSelectionOption] = useState(0);

  // confirm user
  const [userConfirmed, setUserConfirmed] = useState(false);

  React.useEffect(() => {
    if (AppHelper.developerMode === true && userConfirmed === false) {
      setDevMode();
    }

    if (AppHelper.developerMode === false && userConfirmed === false) {
      confirmUser();
    }

    if (userConfirmed === true && loaded === false) {
      loadAcademy();
    }

    if (loaded === true) {
      if (localizationData.language !== selectedLanguage) {
        getLocalization();
      }
    }

    initializeAcademyMsg();

    if (selectedItem !== null) {
      selectedNextPrev(selectedItem.id, selectedScenarioList);
    }
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

  function confirmUser() {
    if (tokenConfirmed === false) {
      checkToken();
    }

    if (tokenConfirmed === true && userIsActive === 0) {
      checkUserActive();
    }

    if (userIsActive === 1 && featureTestingMode === null) {
      checkTesterUser();
    }

    if (tokenConfirmed === true && userIsActive === 1) {
      setUserConfirmed(true);
    }
  }

  function setDevMode() {
    setTokenConfirmed(true);
    setUserIsActive(1);
    if (featureTestingMode === null) {
      setFeatureTestingMode(true);
    }
    setUserConfirmed(true);
  }

  // Loading Initializing Functions:

  function loadAcademy() {
    if (localizationData === null && userIsActive === 1) {
      getLocalization();
    }
    if (courses === null && localizationData !== null) {
      getCourses();
    }
    // if (featureTestingMode === true) {
    if (courses !== null && userActivityHistory === null) {
      AcquireUserHistory();
    }
    if (userActivityHistory !== null) {
      extractUserTrainingHistory(userActivityHistory);
    }
    // }
  }

  function initializeAcademyMsg() {
    // initialize goes through all the conditions while adjusting loading screen message. If everything is confirmed sets loaded to true.
    if (tokenConfirmed === true) {
      setLoadingScreenMsg("user token confirmed...");
      if (userIsActive === 1) {
        setLoadingScreenMsg("user verified...");
        if (featureTestingMode !== null) {
          setLoadingScreenMsg("checked if user is tester...");
          if (userConfirmed === true) {
            setLoadingScreenMsg("user confirmed");
            if (localizationData !== null) {
              setLoadingScreenMsg("localization data downloaded...");
              if (courses !== null) {
                setLoadingScreenMsg("courses loaded...");
                if (userActivityHistory !== null) {
                  setLoadingScreenMsg("user activity history loaded...");
                  if (loaded === false) {
                    setLoadingScreenMsg("");
                    setLoaded(true);
                    LogUserEvent("login");
                    if (loaded === true) {
                      CheckLanguage();
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  // User Loading Functions:
  function checkToken() {
    // this takes the token present in the browser and bounces user back to login screen if anything is wrong
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
    //this checks if our user is 'active' in our database - the user is active only after providing the serial number on device.
    //If user is not active, bounces to access code check screen.
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
    // this simply checks for the user email and returns it - if in devmode sets up a local email address
    if (AppHelper.developerMode === false) {
      return decodeJWT(window.localStorage.getItem("jwt")).emails[0];
    } else {
      return "devmode@laparosimulators.com";
    }
  }

  function activateUser(thisaccesscode) {
    // this is used to activate the user - adds the user to the table containing 'active users'
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

  // Content Related Functions:
  function getCourses() {
    // fetches all courses from json. upon success sets the course data and displays the first course:
    if (courses === null) {
      fetch(
        `${AppHelper.storageUrl}laparoacademy-jsoncontent/courses.json?v=${AppHelper.ContentVersion}`,
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
          setCourses(extractCourseData(myJson));
          setCourseIdAndScenarioList(extractCourseData(myJson).courses[0]);
        });
    }
  }

  function getLocalization() {
    //this fetches the localization data and then sends it over to be parsed out for selected language:
    fetch(
      `${AppHelper.storageUrl}laparoacademy-jsoncontent/academy_localization.json?v=${AppHelper.LocalizationVersion}`,
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
    // takes in our json course data and creates an array which containes courses, id's and names:
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
    // this parses out all localization for selected language:
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

  function setCourseIdAndScenarioList(selectedCourse) {
    // takes in the selected course and then fetches each json file for each actual scenario or edu section. remixes response json files into array so that entire list of scenarios can be viewed.
    setSelectedTraining(null);
    setTrainingList(null);
    setSelectedItem(AppHelper.DefaultFreeTraining);
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

  function selectedNextPrev(id, selectedScenarioList) {
    // used to track the next and prev scenario for next-prev component buttons to work as intended:
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

  // User Progress Tracking:
  function extractUserTrainingHistory(userActivityHistory) {
    //takes all activity history for user and parses out only the 'scenariocompleted' logs - creates a local history of completed scenarios.
    let activityhistory = [];
    for (let i = 0; i < userActivityHistory.length; i++) {
      if (userActivityHistory[i].event === "scenariocompleted") {
        activityhistory.push(userActivityHistory[i].component);
      }
    }
    setUserTrainingHistory(activityhistory);
  }

  function RemoveLogScenarioCompleted(component) {
    //Remove the 'scenariocompleted' event from the user history:
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

  const AcquireUserHistory = async () => {
    // Acquire all existing User activity (done once at every login)
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

  //Access Code Related Functions:
  function sendAccessCode(code) {
    // sends accesscode and then activates user while removing access code from table DB (destroys it)
    axios
      .get(`${AppHelper.ApiUrl}CheckAccessCode`, {
        headers: {
          "Access-Control-Allow-Origin": AppHelper.AllowAccessCodeOrigin,
          "Access-Control-Allow-Headers": "*",
        },
        params: { accesscode: code },
      })
      .then((response) => {
        if (response.data === "True") {
          activateUser(code);
          removeAccessCode(code);
        } else if (response.data === "False") {
          setAccessCodeError(true);
          console.log("access code did not work");
        } else {
          setAccessCodeError(true);
          console.log("access code request did not work at all");
        }
      });
  }

  function removeAccessCode(code) {
    // removes the access code from the list in DB:
    axios.delete(`${AppHelper.ApiUrl}RemoveAccessCode`, {
      headers: {
        "Access-Control-Allow-Origin": AppHelper.AllowAccessCodeOrigin,
        "Access-Control-Allow-Headers": "*",
      },
      params: { accesscode: code },
    });
  }

  // API log call:
  function LogUserEvent(event, component) {
    // logs a user event to the eventlogcontainer of the eventlog DB in azure - pairs this with user email. This function is found anywhere where we log events.

    // types of events: login, logout, activateduser, languageselected
    // events with components: courseselected, scenarioselected, eduselected, scenariostart, advanceselect, aspireselect, starttrainingrecording, stoptrainingrecording, videodownload, endtraining
    // special event with component (this gets added, but also removed if user unclicks): scenariocompleted, languageselected

    var thisUserEmail = getUserEmail();

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
  }

  function CheckLanguage() {
    // array of all languageselected objects in the entire activity history:
    let alllangevents = [];
    for (var i = 0; i < userActivityHistory.length; i++) {
      if (userActivityHistory[i].event === "languageselected") {
        alllangevents.push(userActivityHistory[i]);
      }
    }
    // calculation of which language selected object has the latest date:
    var mostRecentDate = new Date(
      Math.max.apply(
        null,
        alllangevents.map((e) => {
          return new Date(e.date);
        })
      )
    );
    // recall of the entire most recent date object:
    var mostRecentObject = alllangevents.filter((e) => {
      var d = new Date(e.date);
      return d.getTime() === mostRecentDate.getTime();
    })[0];

    //assign the exact language which was the latest to be applied:

    if (mostRecentObject.component !== undefined) {
      setSelectedLanguage(mostRecentObject.component);
    }
  }

  function ReturnToBasic() {
    // returns the user to the start - first basic skills course (on click of main logo in app)

    setCourseIdAndScenarioList(courses.courses[0]);
  }

  function StartScenarioFreeTraining() {
    setUserPanelActive(0);
    setPlayingScenario(true);
    var scenariostart = "scenariostart";
    LogUserEvent(scenariostart, "scenariofree");
    setSelectedItem(AppHelper.DefaultFreeTraining);
  }

  function ChangeLanguage(lang) {
    setUserPanelActive(0);
    setSelectedLanguage(lang.toString());
    getLocalization();
    let selectedlanguage = lang.toString();
    LogUserEvent("languageselected", selectedlanguage);
  }

  function ShowMainTrainingSelection() {
    return (
      <Fragment>
        {playingScenario ? (
          <WebcamTraining
            name={selectedItem.name.en}
            setPlayingScenario={setPlayingScenario}
            localizationData={localizationData}
            selectedLanguage={selectedLanguage}
            LogUserEvent={LogUserEvent}
            selectedItem={selectedItem}
            items={courses}
            setCourseIdAndScenarioList={setCourseIdAndScenarioList}
            selectedCourseID={selectedCourseID}
            userEmail={getUserEmail()}
            userIsActive={userIsActive}
            userPanelActive={userPanelActive}
            setUserPanelActive={setUserPanelActive}
            setSelectedLanguage={setSelectedLanguage}
            getLocalization={getLocalization}
            developerMode={AppHelper.developerMode}
            featureTestingMode={featureTestingMode}
            playingScenario={playingScenario}
            ReturnToBasic={ReturnToBasic}
            ChangeLanguage={ChangeLanguage}
          />
        ) : (
          <TrainingSelection
            selectedScenarioList={selectedScenarioList}
            setSelectedItem={setSelectedItem}
            selectedLanguage={selectedLanguage}
            LogUserEvent={LogUserEvent}
            userTrainingHistory={userTrainingHistory}
            selectedItemContent={selectedItem}
            setPlayingScenario={setPlayingScenario}
            localizationData={localizationData}
            selectedNextItem={selectedNextItem}
            selectedPrevItem={selectedPrevItem}
            setUserTrainingHistory={setUserTrainingHistory}
            featureTestingMode={featureTestingMode}
            RemoveLogScenarioCompleted={RemoveLogScenarioCompleted}
            setCourseIdAndScenarioList={setCourseIdAndScenarioList}
            selectedCourseID={selectedCourseID}
            StartScenarioFreeTraining={StartScenarioFreeTraining}
            selectedItem={selectedItem}
            items={courses}
          ></TrainingSelection>
        )}
      </Fragment>
    );
  }

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
  } else {
    return (
      <Fragment>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
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
                  developerMode={AppHelper.developerMode}
                  featureTestingMode={featureTestingMode}
                  LogUserEvent={LogUserEvent}
                  selectedItem={selectedItem}
                  playingScenario={playingScenario}
                  setPlayingScenario={setPlayingScenario}
                  setSelectedItem={setSelectedItem}
                  ReturnToBasic={ReturnToBasic}
                  StartScenarioFreeTraining={StartScenarioFreeTraining}
                  ChangeLanguage={ChangeLanguage}
                  topBarSelectionOption={topBarSelectionOption}
                  setTopBarSelectionOption={setTopBarSelectionOption}
                />
              }
            >
              <Route index element={<ShowMainTrainingSelection />} />
              <Route path="about" element={<AboutPage />} />
              {/* <Route path="*" element={<NoPage />} /> */}
            </Route>
          </Routes>
        </BrowserRouter>
      </Fragment>
    );
  }
}
export default App;
