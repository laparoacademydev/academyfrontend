import classes from "./DisplayedItemContent.module.css";
import { AppHelper } from "./../../App.js";

function EducationSection(props) {
  let key = 0;

  return (
    <div className={classes.itemcontentcomponent}>
      <div className={classes.edutitle}>
        {eval("props.selectedItemContent.title." + props.selectedLanguage)}
      </div>
      <div>
        {props.selectedItemContent.content.map((object) => {
          if (object.type === "paragraph") {
            return (
              <div key={key++} className={classes.eduparagraph}>
                {eval("object.text." + props.selectedLanguage)}
              </div>
            );
          } else if (object.type === "header") {
            return (
              <div key={key++} className={classes.eduheader}>
                {eval("object.text." + props.selectedLanguage)}
              </div>
            );
          } else if (object.type === "media") {
            return (
              <div key={key++}>
                <img
                  src={`${AppHelper.storageUrl}laparoacademy-mediacontent/${object.media[0].url}`}
                  alt={"error"}
                  className={classes.scenarioprepimg}
                ></img>
                <div className={classes.mediadescription}>
                  {eval("object.media[0].label." + props.selectedLanguage)}
                </div>
              </div>
            );
          } else {
            return <div key={key++}></div>;
          }
        })}
      </div>
      <div className={classes.edufinaldiv}></div>
    </div>
  );
}

export default EducationSection;
