import classes from "./AccessCodePromptSubmit.module.css";
import React from "react";
import buttonclasses from "../../UI/Button.module.css";

function AccessCodePromptSubmit(props) {
  return (
    <div
      className={classes.accesscode}
      onSubmit={(event) => {
        props.sendAccessCode(props.code.value, (err) => {
          props.setError(err);
        });
        event.preventDefault();
      }}
    >
      <form className={classes.accesscodeform} onChange={props.handleChange}>
        <input className={classes.textinput} type="text"></input>
        <div
          className={`${buttonclasses.button}  ${classes.accesscodesubmitbtn} ${
            props.code === false
              ? classes.accesscodesubmitbtninactive
              : classes.accesscodesubmitbtnactive
          }`}
          onClick={() => {
            props.sendAccessCode(props.code.value, (err) =>
              props.setError(err)
            );
          }}
        >
          <div className={`${classes.accesscodesubmitbtntext}`}>
            {props.localizationData.accesscodeprompt.codebutton}
          </div>
        </div>
      </form>
    </div>
  );
}

export default AccessCodePromptSubmit;
