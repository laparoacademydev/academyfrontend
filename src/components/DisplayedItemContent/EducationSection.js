import classes from "./DisplayedItemContent.module.css";

function EducationSection(props) {
  let key = 0;
  return (
    <div className={classes.itemcontentcomponent}>
      <div className={classes.eduheader}>
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
          }
          //    else if (object.type === "media") {
          //   return;
          //   //  <div key={key++}>media!</div>;
          // }
          else {
            return <div key={key++}></div>;
          }
        })}
      </div>
    </div>
  );
}

export default EducationSection;
