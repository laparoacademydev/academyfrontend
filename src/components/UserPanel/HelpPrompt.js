import classes from "./HelpPrompt.module.css";
import questico from "../../graphicassets/icons/question_ico.svg";

function HelpPrompt(props) {
  console.log(props.localizationData.userpanel.needhelp);
  console.log(props.localizationData.userpanel.contactus);
  return (
    <div className={classes.helpprompt}>
      <div className={classes.needhelptext}>
        <img src={questico}></img>
        {props.localizationData.userpanel.needhelp}
      </div>
      <div className={classes.contactustext}>
        {props.localizationData.userpanel.contactus}
      </div>
    </div>
  );
}

export default HelpPrompt;
