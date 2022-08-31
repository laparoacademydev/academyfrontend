import educlasses from "./EducationSection.module.css";
import classes from "../DisplayedItemContent.module.css";
import { AppHelper } from "../../../App.js";
import ReturnNextPrevNav from "../ReturnNextPrevNav";
import CompletedCheckbox from "../CompletedCheckbox";

function EducationSection(props) {
  let key = 0;

  return (
    <div className={classes.itemcontentcomponent}>
      <ReturnNextPrevNav
        setSelectedItem={props.setSelectedItem}
        localizationData={props.localizationData}
        selectedNextItem={props.selectedNextItem}
        selectedPrevItem={props.selectedPrevItem}
        LogUserEvent={props.LogUserEvent}
      />
      <div className={educlasses.edutitle}>
        {props.selectedItemContent.title.text[props.selectedLanguage]}
      </div>
      <div>
        {props.selectedItemContent.content.map((object) => {
          if (object.type === "paragraph") {
            return (
              <div key={key++} className={educlasses.eduparagraph}>
                {object.text[props.selectedLanguage]}
              </div>
            );
          } else if (object.type === "header") {
            return (
              <div key={key++} className={educlasses.eduheader}>
                {object.text[props.selectedLanguage]}
              </div>
            );
          } else if (object.type === "media") {
            return (
              <div key={key++}>
                <img
                  src={`${AppHelper.storageUrl}laparoacademy-mediacontent/${object.media.url}`}
                  alt={"error"}
                  className={educlasses.scenarioprepimg}
                ></img>
                <div className={educlasses.mediadescription}>
                  {object.media.label[props.selectedLanguage]}
                </div>
              </div>
            );
          } else {
            return <div key={key++}></div>;
          }
        })}
      </div>

      <div className={educlasses.completedbox}>
        <div className={educlasses.checkbox}>
          <CompletedCheckbox
            setUserTrainingHistory={props.setUserTrainingHistory}
            userTrainingHistory={props.userTrainingHistory}
            selectedItemContent={props.selectedItemContent}
            LogUserEvent={props.LogUserEvent}
            RemoveLogScenarioCompleted={props.RemoveLogScenarioCompleted}
          />
        </div>
        <div className={educlasses.completedboxtext}>complete</div>
      </div>

      <div className={educlasses.edufinaldiv}></div>
    </div>
  );
}

export default EducationSection;
