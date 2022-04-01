import classes from "./AccessCodeScreen.module.css";
import { AppHelper } from "../../App";
import buttonclasses from "../UI/Button.module.css";

function AccessCodeLogout() {
  return (
    <div
      className={`${buttonclasses.button}  ${classes.accesscodelogoutbtn}`}
      onClick={function () {
        window.localStorage.removeItem("jwt");
        window.location.href = `${AppHelper.LoginUrl}`;
      }}
    >
      <div className={`${classes.accesscodesubmitbtntext}`}>Log Out</div>
    </div>
  );
}

export default AccessCodeLogout;
