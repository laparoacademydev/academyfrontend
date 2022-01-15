import axios from "axios";
import React from "react";
import { useState } from "react";

// import GetCourses from "./academycontentstorage/laparoacademy-jsoncontent/courses.json";

// export class AppHelper {
//   static ApiUrl =
//     "https://academylaparomanagementservice.azure-api.net/laparoacademyfunctionapp/";
// }

function App() {
  const [courses, setCourses] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const [selectedTraining, setSelectedTraining] = useState(null);
  const [trainingList, setTrainingList] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [playingScenario, setPlayingScenario] = useState(false);
  const [selectedCourseID, setSelectedCourseID] = useState(null);
  const [selectedScenarioList, setSelectedScenarioList] = useState(null);

  React.useEffect(() => {
    if (loaded === false) {
      checkUserActive();
    }
  });

  function checkUserActive() {
    if (courses === null) {
      getCourses();
      setLoaded(true);
    }
  }

  function getCourses() {
    if (courses === null) {
      fetch("./academycontentstorage/laparoacademy-jsoncontent/courses.json", {
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

    // if (courses === null) {
    //   axios.get(`${AppHelper.ApiUrl}TestTriggerGetCourses`).then((response) => {
    //     setCourses(response.data);
    //     // console.log(response.data);
    //     setCourseIdAndScenarioList(response.data.courses[0]);
    //   });
    // }
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
      scenarioFileNames.push(x.id + ".json");
    });

    var responseJsonData = [];
    scenarioFileNames.forEach((filenamejson) => {
      fetch(
        "./academycontentstorage/laparoacademy-jsoncontent/" + filenamejson,
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
            console.log("done loading!");
            let responseSelectedData = [];
            for (let i = 0; i < responseJsonData.length; i++) {
              responseSelectedData.push({
                type: scenarioTypes[i],
                scenario: responseJsonData[i],
              });
            }
            console.log(responseSelectedData);
            setSelectedScenarioList(responseSelectedData);
          }
        });
    });
  }

  // console.log(scenarioFileNames);
  // console.log(scenarioTypes.length);

  if (loaded === false) {
    return <h1>Waiting</h1>;
  } else if (courses === null) {
    return <h1>Waiting</h1>;
  } else {
    return <h1>Loaded</h1>;
  }
}

export default App;
