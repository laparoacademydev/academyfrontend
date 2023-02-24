import classes from "./ContentSection.module.css";
import React from "react";
import { AppHelper } from "../../../../App.js";
import CompletedCheckbox from "../CompletedCheckbox";

function ContentSection(props) {
  let key = 0;

  function RenderEduIcon() {
    return (
      <svg
        width="16"
        height="12"
        viewBox="0 0 16 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.33341 6.78667V9.45333L8.00008 12L12.6667 9.45333V6.78667L8.00008 9.33333L3.33341 6.78667ZM8.00008 0L0.666748 4L8.00008 8L14.0001 4.72667V9.33333H15.3334V4L8.00008 0Z"
          fill="#00619D"
        />
      </svg>
    );
  }

  function RenderEduHeaderBox() {
    return (
      <div
        className={classes.edutitlebox}
        style={{
          backgroundImage: `url(${AppHelper.storageUrl +
            `laparoacademy-mediacontent/edu_placeholder.png`})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className={classes.edutoptitlebox}>
          <div className={classes.edutoptitleboxtext}>
            {<RenderEduIcon></RenderEduIcon>}{" "}
            {props.localizationData.scenariodescription.edusec}
          </div>
        </div>
        <div className={classes.edutitle}>
          {props.selectedItemContent.title.text[props.selectedLanguage]}
        </div>
      </div>
    );
  }

  return (
    <div className={classes.itemcontentcomponent}>
      <RenderEduHeaderBox></RenderEduHeaderBox>
      <div>
        {props.selectedItemContent.content.map((object) => {
          if (object.type === "paragraph") {
            return (
              <div key={key++} className={classes.eduparagraph}>
                {object.text[props.selectedLanguage]}
              </div>
            );
          } else if (object.type === "header") {
            return (
              <div key={key++} className={classes.eduheader}>
                {object.text[props.selectedLanguage]}
              </div>
            );
          } else if (object.type === "media") {
            return (
              <div key={key++}>
                <img
                  src={`${AppHelper.storageUrl}laparoacademy-mediacontent/${object.media.url}`}
                  alt={"error"}
                  className={classes.scenarioprepimg}
                ></img>
                <div className={classes.mediadescription}>
                  {object.media.label[props.selectedLanguage]}
                </div>
              </div>
            );
          } else {
            return <div key={key++}></div>;
          }
        })}
      </div>

      <div className={classes.completedbox}>
        <div className={classes.checkbox}>
          <CompletedCheckbox
            setUserTrainingHistory={props.setUserTrainingHistory}
            userTrainingHistory={props.userTrainingHistory}
            selectedItemContent={props.selectedItemContent}
            LogUserEvent={props.LogUserEvent}
          />
        </div>
        <div className={classes.completedboxtext}>complete</div>
      </div>

      <div className={classes.edufinaldiv}></div>
    </div>
  );
}

export default ContentSection;
