import React, { Fragment, useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { isMobile } from "react-device-detect";
import decodeJWT from "jwt-decode";

import AboutPage from "./components/AboutPage/AboutPage";
import Layout from "./components/UI/Layout";
import WebcamTraining from "./components/WebcamTraining/WebcamTraining";
import LoadingScreen from "./components/MiscScreens/LoadingScreen/LoadingScreen";
import MobileView from "./components/MiscScreens/MobileView/MobileView";
import DisplayedContentSelection from "./components/ContentSelection/DisplayedContentSelection";
import AccessCodePrompt from "./components/MiscScreens/AccessCodePrompt/AccessCodePrompt";

export class AppHelper {
  static developerMode = false;
  static ApiUrl =
    "https://academylaparomanagementservice.azure-api.net/laparoacademyfunctionapp/";
  static storageUrl = "./academycontentstorage/";
  static languages = ["en", "pl"];
  static LoginUrl =
    "https://b2ctenantlaparoacademy.b2clogin.com/b2ctenantlaparoacademy.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_academysignupsignin&client_id=5543e448-b26a-4ec3-955c-3c7e70b24d88&nonce=defaultNonce&redirect_uri=https%3A%2F%2Facademy.laparosimulators.com&scope=openid&response_type=id_token&prompt=login";
  static AllowAccessCodeOrigin = "https://academy.laparosimulators.com";
  static LocalizationVersion = 9;
  static ContentVersion = 3;
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
  static LogEvent(event, component) {
    // logs a user event to the eventlogcontainer of the eventlog DB in azure - pairs this with user email. This function is found anywhere where we log events.
    // types of events: login, logout, activateduser, languageselected
    // events with components: courseselected, scenarioselected, eduselected, scenariostart, advanceselect, aspireselect, starttrainingrecording, stoptrainingrecording, videodownload, endtraining
    // special event with component (this gets added, but also removed if user unclicks): scenariocompleted, languageselected

    const thisUserEmail = AppHelper.GetUserEmail();
    const headers = {
      "Access-Control-Allow-Origin": AppHelper.AllowAccessCodeOrigin,
      "Access-Control-Allow-Headers": "*",
    };
    const params = {
      email: thisUserEmail,
      date: Date(),
      event: event,
      component: component || "none",
    };

    axios.post(`${AppHelper.ApiUrl}LogUserEvent`, null, { headers, params });
  }
  static TesterConsoleLog(output) {
    if (featureTestingMode === true) {
      console.log(output);
    }
  }
  static GetUserEmail() {
    // this simply checks for the user email and returns it - if in devmode sets up a local email address
    if (AppHelper.developerMode === false) {
      return decodeJWT(window.localStorage.getItem("jwt")).emails[0];
    } else {
      return "devmode@laparosimulators.com";
    }
  }
  static RemoveLogScenarioCompleted(component) {
    var thisUserEmail = AppHelper.GetUserEmail();
    var event = "scenariocompleted";

    axios.delete(`${AppHelper.ApiUrl}RemoveLogScenarioCompleted`, {
      headers: {
        "Access-Control-Allow-Origin": AppHelper.AllowAccessCodeOrigin,
        "Access-Control-Allow-Headers": "*",
      },
      params: { email: thisUserEmail, event: event, component: component },
    });
  }
}

function App() {
  // load user:
  const [tokenConfirmed, setTokenConfirmed] = useState(false);
  const [featureTestingMode, setFeatureTestingMode] = useState(null);
  const [accessCodePrompt, setAccessCodePrompt] = useState(null);
  const [accessCodeError, setAccessCodeError] = useState(false);
  const [userConfirmed, setUserConfirmed] = useState(false);
  const [firstLoginDate, setFirstLoginDate] = useState(null);
  const [userActivityHistory, setUserActivityHistory] = useState(null);
  const [userTrainingHistory, setUserTrainingHistory] = useState([]);
  const [userLoaded, setUserLoaded] = useState(false); //concludes loading user
  // loadContent
  const [localizationData, setLocalizationData] = useState(null);
  const [courses, setCourses] = useState(null);
  const [contentLoaded, setContentLoaded] = useState(false); //concludes loading content
  // after content is loaded and user is loaded - loaded true tells render App:
  const [loaded, setLoaded] = useState(false); //concludes loading
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [webCamTrainingActive, setwebCamTrainingActive] = useState(false); // use this to activate/deactivate WebcamTraining

  React.useEffect(() => {
    if (userLoaded === false) {
      loadUser();
    }

    if (userLoaded === true && contentLoaded === false) {
      loadContent();
    }

    if (userLoaded === true && contentLoaded === true) {
      setLoaded(true);
    }

    if (loaded === true) {
      if (localizationData.language !== selectedLanguage) {
        AppHelper.TesterConsoleLog("getLocalization");
        getLocalization();
      }
    }
  }, [
    loaded,
    tokenConfirmed,
    accessCodePrompt,
    accessCodeError,
    courses,
    localizationData,
    selectedLanguage,
    featureTestingMode,
    userActivityHistory,
    userTrainingHistory,
    userLoaded,
    contentLoaded,
    userConfirmed,
  ]);

  // loadUser Functions:
  function loadUser() {
    if (AppHelper.developerMode === true && userConfirmed === false) {
      // check if devMode
      setAccessCodePrompt(true);
      setTokenConfirmed(true);
      if (featureTestingMode === null) {
        setFeatureTestingMode(true);
      }
      setUserConfirmed(true);
      // setAccessCodePrompt(false);
    }

    if (!AppHelper.developerMode && !userConfirmed) {
      //confirm User (if not devmode)
      if (!tokenConfirmed) {
        AppHelper.TesterConsoleLog("checkToken");
        checkToken();
      }

      if (tokenConfirmed && accessCodePrompt === null) {
        AppHelper.TesterConsoleLog("checkUserActive");
        checkUserActive();
      }

      if (featureTestingMode === null && accessCodePrompt !== null) {
        AppHelper.TesterConsoleLog("checkTesterUser");
        checkTesterUser();
      }

      if (tokenConfirmed && featureTestingMode !== null) {
        AppHelper.TesterConsoleLog("setUserConfirmed");
        setUserConfirmed(true);
      }
    }

    //if user confirmed - acquire and extract individual training history
    if (userConfirmed && userActivityHistory === null) {
      AppHelper.TesterConsoleLog("AcquireUserHistory");
      AcquireUserHistory();
    }

    if (userActivityHistory !== null && userTrainingHistory.length === 0) {
      AppHelper.TesterConsoleLog("extractUserTrainingHistory");
      extractUserTrainingHistory(userActivityHistory);
    }

    // if training history acquired and user confirmed - setUserLoaded(true)
    if (userActivityHistory !== null && userConfirmed && !contentLoaded) {
      AppHelper.TesterConsoleLog("setUserLoaded(true)");
      setUserLoaded(true);
    }
  }

  function checkToken() {
    AppHelper.TesterConsoleLog("checkToken");

    // this takes the token present in the browser and bounces user back to login screen if anything is wrong
    const fullIp = window.location.href.split("#id_token=");
    const webToken = fullIp[1];
    const localToken = window.localStorage.getItem("jwt");

    if (webToken === null || webToken === undefined) {
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
    AppHelper.TesterConsoleLog("checking if user is active");

    //this checks if our user is 'active' in our database - the user is active only after providing the serial number on device.
    //If user is not active, bounces to access code check screen.
    var thisUserEmail = AppHelper.GetUserEmail();
    try {
      let response = await axios.get(`${AppHelper.ApiUrl}CheckUserActive`, {
        headers: {
          "Access-Control-Allow-Origin": AppHelper.AllowAccessCodeOrigin,
          "Access-Control-Allow-Headers": "*",
        },
        params: { email: thisUserEmail },
      });

      if (response.data === true) {
        setAccessCodePrompt(false);
      } else if (response.data === false) {
        setAccessCodePrompt(true);
      } else {
        setAccessCodePrompt(true);
      }
    } catch (error) {
      AppHelper.onRequestError(error);
    }
  };

  const checkTesterUser = async () => {
    AppHelper.TesterConsoleLog("checkTesterUser");

    // this checks if our user is 'tester:true' in our database - should we be showing newest, untested features?
    const thisUserEmail = AppHelper.GetUserEmail();
    const headers = {
      "Access-Control-Allow-Origin": AppHelper.AllowAccessCodeOrigin,
      "Access-Control-Allow-Headers": "*",
    };
    const params = { email: thisUserEmail };

    try {
      const response = await axios.get(`${AppHelper.ApiUrl}CheckTesterUser`, {
        headers,
        params,
      });

      setFeatureTestingMode(response.data === true);
      AppHelper.TesterConsoleLog(
        response.data ? "tester mode active - logged in as tester user" : ""
      );
    } catch (error) {
      AppHelper.onRequestError(error);
    }
  };

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

  function activateUser(thisaccesscode) {
    AppHelper.TesterConsoleLog("activateUser");

    // this is used to activate the user - adds the user to the table containing 'active users'
    var thisUserEmail = AppHelper.GetUserEmail();
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
        // setLoaded(true);
        setAccessCodePrompt(false);
        checkUserActive();
        var activateduser = "activateduser";
        AppHelper.LogEvent(activateduser);
      });
  }

  const AcquireUserHistory = async () => {
    // Acquire all existing User activity (done once at every login)
    AppHelper.TesterConsoleLog("AcquireUserHistory");

    var thisUserEmail = AppHelper.GetUserEmail();

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
      AppHelper.TesterConsoleLog("setUserActivityHistory");

      setUserActivityHistory(response.data);
    } catch (error) {
      AppHelper.onRequestError(error);
    }
  };

  function extractUserTrainingHistory(userActivityHistory) {
    AppHelper.TesterConsoleLog("extractUserTrainingHistory");

    //takes all activity history for user and parses out only the 'scenariocompleted' logs - creates a local history of completed scenarios.
    let activityhistory = [];
    for (let i = 0; i < userActivityHistory.length; i++) {
      if (userActivityHistory[i].event === "scenariocompleted") {
        activityhistory.push(userActivityHistory[i].component);
      }
    }

    // this finds the first occurence of a 'login' event and notes it down.
    const firstloginevent = userActivityHistory.find(
      ({ event }) => event === "login"
    );
    setFirstLoginDate(firstloginevent.date);
    AppHelper.TesterConsoleLog(firstloginevent);
    AppHelper.TesterConsoleLog("setUserTrainingHistory");
    setUserTrainingHistory(activityhistory);
  }

  // loadContent Functions:
  function loadContent() {
    AppHelper.TesterConsoleLog("loadContent");

    if (localizationData === null) {
      getLocalization();
    }

    if (MostRecentLanguage() !== selectedLanguage && courses === null) {
      // check if previous language setting was different
      ChangeLanguage(MostRecentLanguage());
    }

    if (courses === null && localizationData !== null) {
      getCourses();
    }
    if (courses !== null && localizationData !== null) {
      setContentLoaded(true);
    }
  }

  function getLocalization() {
    AppHelper.TesterConsoleLog("getLocalization");

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

  function extractLocalizationData(myJson, selectedLanguage) {
    AppHelper.TesterConsoleLog("extractLocalizationData");

    // this parses out all localization for selected language:
    var extractedLocalization = {};
    var localizationPages = Object.entries(myJson);

    localizationPages.forEach((localizationPage) => {
      const localizationPageName = localizationPage[0];
      const localizationPageObject = Object.entries(localizationPage[1]);

      const extractedLocalizationPage = {};
      localizationPageObject.forEach((localizationPageObjectName) => {
        const localizationPageObjectText = localizationPageObjectName[1].text;
        const localizationPageObjectTextLanguage =
          localizationPageObjectText[selectedLanguage];

        extractedLocalizationPage[localizationPageObjectName] =
          localizationPageObjectTextLanguage;
      });
      extractedLocalization[localizationPageName] = extractedLocalizationPage;
    });
    extractedLocalization["language"] = selectedLanguage;
    setLocalizationData(extractedLocalization);
  }

  function ChangeLanguage(lang) {
    setSelectedLanguage(lang.toString());
    getLocalization();
    AppHelper.LogEvent("languageselected", lang.toString());
  }

  function MostRecentLanguage() {
    // array of all languageselected objects in the entire activity history:
    let alllangevents = [];
    for (var i = 0; i < userActivityHistory.length; i++) {
      if (userActivityHistory[i].event === "languageselected") {
        alllangevents.push(userActivityHistory[i]);
      }
    }

    if (alllangevents.length === 0) {
      return "en";
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
    return mostRecentObject.component;
  }

  function getCourses() {
    AppHelper.TesterConsoleLog("getCourses");

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
        });
    }
  }

  // Content Related Functions:
  function extractCourseData(myJson) {
    // takes in our json course data and creates an array which containes courses, id's and names:
    const extractedCourses = { courses: [] };

    myJson.courses.forEach((course) => {
      const courseArray = course.content.filter(
        (content) => content.simulators.Academy === true
      );
      if (courseArray.length !== 0) {
        const currentCourse = {
          content: courseArray,
          id: course.id,
          name: course.name,
        };

        extractedCourses.courses.push(currentCourse);
      }
    });

    return extractedCourses;
  }

  function ReturnToBasic() {
    // returns the user to the start - first basic skills course (on click of main logo in app)
    // setCourseIdAndScenarioList(courses.courses[0]);
    // place function here for activating/deactivating
  }

  function StartScenarioFreeTraining() {
    setwebCamTrainingActive(true);
    AppHelper.LogEvent("scenariostart", "scenariofree");
  }

  // Render JSX components:
  function RenderMainTrainingSelection() {
    return (
      <Fragment>
        <DisplayedContentSelection
          selectedLanguage={selectedLanguage}
          userTrainingHistory={userTrainingHistory}
          setwebCamTrainingActive={setwebCamTrainingActive}
          localizationData={localizationData}
          setUserTrainingHistory={setUserTrainingHistory}
          StartScenarioFreeTraining={StartScenarioFreeTraining}
          courses={courses}
        ></DisplayedContentSelection>
      </Fragment>
    );
  }

  function RenderWebcamTraining() {
    return (
      <Fragment>
        <WebcamTraining
          localizationData={localizationData}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          getLocalization={getLocalization}
          developerMode={AppHelper.developerMode}
          featureTestingMode={featureTestingMode}
          ReturnToBasic={ReturnToBasic}
          ChangeLanguage={ChangeLanguage}
        />
      </Fragment>
    );
  }

  if (isMobile === true) {
    return <MobileView />;
  } else if (loaded === false) {
    return <LoadingScreen />;
  } else {
    return (
      <Fragment>
        {accessCodePrompt ? (
          <AccessCodePrompt
            sendAccessCode={sendAccessCode}
            accessCodeError={accessCodeError}
            setAccessCodePrompt={setAccessCodePrompt}
            accessCodePrompt={accessCodePrompt}
            firstLoginDate={firstLoginDate}
            localizationData={localizationData}
          ></AccessCodePrompt>
        ) : (
          ""
        )}
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Layout
                  userEmail={AppHelper.GetUserEmail()}
                  selectedLanguage={selectedLanguage}
                  setSelectedLanguage={setSelectedLanguage}
                  localizationData={localizationData}
                  getLocalization={getLocalization}
                  developerMode={AppHelper.developerMode}
                  featureTestingMode={featureTestingMode}
                  webCamTrainingActive={webCamTrainingActive}
                  setwebCamTrainingActive={setwebCamTrainingActive}
                  ReturnToBasic={ReturnToBasic}
                  StartScenarioFreeTraining={StartScenarioFreeTraining}
                  ChangeLanguage={ChangeLanguage}
                />
              }
            >
              <Route index element={<RenderMainTrainingSelection />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="webcamtraining" element={<RenderWebcamTraining />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Fragment>
    );
  }
}
export default App;
