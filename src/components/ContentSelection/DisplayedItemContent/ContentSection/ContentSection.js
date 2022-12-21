import classes from "./ContentSection.module.css";

import { AppHelper } from "../../../../App.js";
import CompletedCheckbox from "../CompletedCheckbox";

function ContentSection(props) {
  let key = 0;

  return (
    <div className={classes.itemcontentcomponent}>
      <div className={classes.edutitle}>
        {props.selectedItemContent.title.text[props.selectedLanguage]}
      </div>
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
            RemoveLogScenarioCompleted={props.RemoveLogScenarioCompleted}
          />
        </div>
        <div className={classes.completedboxtext}>complete</div>
      </div>

      <div className={classes.edufinaldiv}></div>
    </div>
  );
}

export default ContentSection;
