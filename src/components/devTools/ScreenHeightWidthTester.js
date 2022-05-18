import React from "react";
import classes from "./ScreenHeightWidthTester.module.css";
import { useState, useEffect } from "react";

function ScreenHeightWidthTester(props) {
  // current scenario selected:
  const [currentscenarioid, setCurrentscenarioid] = useState(checkScenarioId());

  useEffect(() => {
    setCurrentscenarioid(checkScenarioId());
  }, [props.selectedItem]);

  function checkScenarioId() {
    let a = "main";
    if (props.selectedItem === null) {
      return a;
    } else {
      a = props.selectedItem.id;
      return a;
    }
  }
  // window dimensions:
  const { height, width } = useWindowDimensions();

  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    );

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
  }

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  return (
    <div className={classes.box}>
      <div className={classes.text}>
        h:{height}px w:{width}px
      </div>
      <div className={classes.textscenario}>{currentscenarioid}</div>
    </div>
  );
}

export default ScreenHeightWidthTester;
