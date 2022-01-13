import React from "react";
import { useState } from "react";

import GetCourses from "./academycontentstorage/laparoacademy-jsoncontent/courses.json";

function App() {
  const [courses, setCourses] = useState(null);
  const [loaded, setLoaded] = useState(false);

  React.useEffect(() => {
    if (loaded === false) {
      checkUserActive();
    }
  });

  function checkUserActive() {
    if (courses === null) {
      setCourses(GetCourses);
      setLoaded(true);
    }
  }

  console.log(courses);

  if (loaded === false) {
    return <h1>Waiting</h1>;
  } else if (courses === null) {
    return <h1>Waiting</h1>;
  } else {
    return <h1>Loaded</h1>;
  }
}

export default App;
