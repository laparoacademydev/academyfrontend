import React from "react";
import classes from "./ScreenHeightWidthTester.module.css";
import { useState, useEffect } from "react";

function ScreenHeightWidthTester() {
  const { height, width } = useWindowDimensions();

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

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

  return (
    <div className={classes.box}>
      <div>
        <div className={classes.text}>
          {height}x{width}
        </div>
      </div>
    </div>
  );
}

export default ScreenHeightWidthTester;
