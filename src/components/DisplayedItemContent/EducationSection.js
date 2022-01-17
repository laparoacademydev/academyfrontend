import classes from "./DisplayedItemContent.module.css";
import { AppHelper } from "./../../App.js";

function EducationSection(props) {
  let key = 0;

  return (
    <div className={classes.itemcontentcomponent}>
      <div className={classes.edutitle}>
        {props.selectedItemContent.title.en}
      </div>
      <div>
        {props.selectedItemContent.content.map((object) => {
          if (object.type === "paragraph") {
            return (
              <div key={key++} className={classes.eduparagraph}>
                {object.text.en}
              </div>
            );
          } else if (object.type === "header") {
            return (
              <div key={key++} className={classes.eduheader}>
                {object.text.en}
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
                  {object.media[0].label.en}
                </div>
              </div>
            );
          } else {
            return <div key={key++}></div>;
          }
        })}
      </div>
    </div>
  );
}

export default EducationSection;
