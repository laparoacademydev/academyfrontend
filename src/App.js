import axios from "axios";
import React from "react";
import { useState } from "react";

// import GetCourses from "./academycontentstorage/laparoacademy-jsoncontent/courses.json";

export class AppHelper {
  static ApiUrl =
    "https://academylaparomanagementservice.azure-api.net/laparoacademyfunctionapp/";
}

function App() {
  const [courses, setCourses] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const [selectedTraining, setSelectedTraining] = useState(null);
  const [trainingList, setTrainingList] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [playingScenario, setPlayingScenario] = useState(false);
  const [selectedCourseID, setSelectedCourseID] = useState(null);

  React.useEffect(() => {
    if (loaded === false) {
      checkUserActive();
    }
  });

  function getCourses() {
    if (courses === null) {
      axios.get(`${AppHelper.ApiUrl}TestTrigger1`).then((response) => {
        setCourses(response.data);
        setCourseIdAndScenarioList(response.data.courses[0]);
      });
    }
  }

  function checkUserActive() {
    if (courses === null) {
      getCourses();
      setLoaded(true);
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
      scenarioFileNames.push(x.id + ".json");
    });

    console.log(scenarioFileNames);
    console.log(scenarioTypes);
  }

  if (loaded === false) {
    return <h1>Waiting</h1>;
  } else if (courses === null) {
    return <h1>Waiting</h1>;
  } else {
    return <h1>Loaded</h1>;
  }
}

export default App;
