import React from "react";
import { useState, Fragment } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { isMobile } from "react-device-detect";
import decodeJWT from "jwt-decode";

import AboutPage from "./components/AboutPage/AboutPage";
import Layout from "./components/UI/Layout";
import WebcamTraining from "./components/WebcamTraining/WebcamTraining";
import LoadingScreen from "./components/MiscScreens/LoadingScreen/LoadingScreen";
import AccessCodeScreen from "./components/MiscScreens/AccessCodeScreen/AccessCodeScreen";
import MobileView from "./components/MiscScreens/MobileView/MobileView";
import ContentSelection from "./components/ContentSelection/ContentSelection";

export class AppHelper {
  static developerMode = false;
  static ApiUrl =
    "https://academylaparomanagementservice.azure-api.net/laparoacademyfunctionapp/";
  static storageUrl = "./academycontentstorage/";
  static languages = ["en", "pl"];
  static LoginUrl =
    "https://b2ctenantlaparoacademy.b2clogin.com/b2ctenantlaparoacademy.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_academysignupsignin&client_id=5543e448-b26a-4ec3-955c-3c7e70b24d88&nonce=defaultNonce&redirect_uri=https%3A%2F%2Facademy.laparosimulators.com&scope=openid&response_type=id_token&prompt=login";
  static AllowAccessCodeOrigin = "https://academy.laparosimulators.com";
  static LocalizationVersion = 7;
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

    var thisUserEmail = AppHelper.GetUserEmail();

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
  // test

  // load user:
  const [tokenConfirmed, setTokenConfirmed] = useState(false);
  const [userIsActive, setUserIsActive] = useState(0);
  const [accessCodeCheck, setAccessCodeCheck] = useState(false);
  const [accessCodeError, setAccessCodeError] = useState(false);
  const [featureTestingMode, setFeatureTestingMode] = useState(null);
  const [userConfirmed, setUserConfirmed] = useState(false);
  const [userActivityHistory, setUserActivityHistory] = useState(null);
  const [userTrainingHistory, setUserTrainingHistory] = useState([]);
  const [userLoaded, setUserLoaded] = useState(false); //concludes loading user
  // loadContent
  const [localizationData, setLocalizationData] = useState(null);
  const [courses, setCourses] = useState(null);
  const [contentLoaded, setContentLoaded] = useState(false); //concludes loading content

  // after content is loaded and user is loaded - loaded renders App:
  const [loaded, setLoaded] = useState(false); //concludes loading

  const [selectedLanguage, setSelectedLanguage] = useState("en");

  //Keeping these here because they're important?
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
        getLocalization();
      }
    }
  }, [
    loaded,
    tokenConfirmed,
    userIsActive,
    accessCodeCheck,
    courses,
    localizationData,
    selectedLanguage,
    featureTestingMode,
    userActivityHistory,
    userTrainingHistory,
    userLoaded,
    contentLoaded,
  ]);

  // loadUser Functions:
  function loadUser() {
    // console.log("loadUser");
   
    if (AppHelper.developerMode === true && userConfirmed === false) {
      // check if devMode
      setTokenConfirmed(true);
      setUserIsActive(1);
      if (featureTestingMode === null) {
        setFeatureTestingMode(true);
      }
      setUserConfirmed(true);
    }

    if (AppHelper.developerMode === false && userConfirmed === false) {
      //confirm User (if not devmode)
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
        // console.log("setUserConfirmed");
        setUserConfirmed(true);
      }
    }

    //if user confirmed - acquire and extract individual training history
    if (userConfirmed === true && userActivityHistory === null) {
      AcquireUserHistory();
    }

    if (userActivityHistory !== null && userTrainingHistory.length === 0) {
      extractUserTrainingHistory(userActivityHistory);
    }



    // if training history acquired and user confirmed - setUserLoaded(true)
    if (
      userActivityHistory !== null &&
      userConfirmed === true &&
      contentLoaded === false
    ) {
      setUserLoaded(true);
    }
  }

  function checkToken() {
    // console.log("checkToken");
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
    // console.log('checking if user is active');
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
        setUserIsActive(1);
      //   console.log("checkUserActive;setUserIsActive(1);")
      } else {
        setAccessCodeCheck(true);
     //    console.log("checkUserActive;setAccessCodeCheck(true);");
      }
    } catch (error) {
      AppHelper.onRequestError(error);
     //  console.log("checkUserActive;AppHelper.onRequestError(error);");
    }
  };

  const checkTesterUser = async () => {
    // console.log('checkTesterUser');
    // this checks if our user is 'tester:true' in our database - should we be showing newest, untested features?
    var thisUserEmail = AppHelper.GetUserEmail();
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
        setAccessCodeCheck(false);
        checkUserActive();
        var activateduser = "activateduser";
        AppHelper.LogEvent(activateduser);
      });
  }

  const AcquireUserHistory = async () => {
    // Acquire all existing User activity (done once at every login)
    // console.log("AcquireUserHistory");
   
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
      // console.log("setUserActivityHistory");
      
      setUserActivityHistory(response.data);
    } catch (error) {
      AppHelper.onRequestError(error);
    }
  };

  function extractUserTrainingHistory(userActivityHistory) {
    // console.log("extractUserTrainingHistory");
    
    //takes all activity history for user and parses out only the 'scenariocompleted' logs - creates a local history of completed scenarios.
    let activityhistory = [];
    for (let i = 0; i < userActivityHistory.length; i++) {
      if (userActivityHistory[i].event === "scenariocompleted") {
        activityhistory.push(userActivityHistory[i].component);
      }
    }
    setUserTrainingHistory(activityhistory);
  }

  // loadContent Functions:
  function loadContent() {
    // console.log("loadContent();");
    
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
    // console.log("getLocalization");
    
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
    // console.log("extractLocalizationData");
    
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

  function ChangeLanguage(lang) {
    setSelectedLanguage(lang.toString());
    getLocalization();
    let selectedlanguage = lang.toString();
    AppHelper.LogEvent("languageselected", selectedlanguage);
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
  //   console.log("getCourses");
   
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

  function ReturnToBasic() {
    // returns the user to the start - first basic skills course (on click of main logo in app)
    // setCourseIdAndScenarioList(courses.courses[0]);
    // place function here for activating/deactivating
  }

  function StartScenarioFreeTraining() {
    setwebCamTrainingActive(true);
    var scenariostart = "scenariostart";
    AppHelper.LogEvent(scenariostart, "scenariofree");
  }

  // Render JSX components:
  function RenderMainTrainingSelection() {
    return (
      <Fragment>
        <ContentSelection
          selectedLanguage={selectedLanguage}
          userTrainingHistory={userTrainingHistory}
          setwebCamTrainingActive={setwebCamTrainingActive}
          localizationData={localizationData}
          setUserTrainingHistory={setUserTrainingHistory}
          StartScenarioFreeTraining={StartScenarioFreeTraining}
          courses={courses}
        ></ContentSelection>
      </Fragment>
    );
  }

  function RenderWebcamTraining() {
    return (
      <Fragment>
        <WebcamTraining
          localizationData={localizationData}
          selectedLanguage={selectedLanguage}
          userIsActive={userIsActive}
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
  } else if (accessCodeCheck === true) {
    return (
      <AccessCodeScreen
        sendAccessCode={sendAccessCode}
        accessCodeError={accessCodeError}
      />
    );
  } else if (loaded === false) {
    return <LoadingScreen />;
  } else {
    return (
      <Fragment>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Layout
                  userEmail={AppHelper.GetUserEmail()}
                  userIsActive={userIsActive}
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
              {/* <Route path="*" element={<NoPage />} /> */}
            </Route>
          </Routes>
        </BrowserRouter>
      </Fragment>
    );
  }
}
export default App;
