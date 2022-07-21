import classes from "./LogoHome.module.css";
import laparologo from "../../graphicassets/LaparoAcademyLogo.svg";

function LogoHome(props) {
  return (
    <div
      className={classes.logohome}
      onClick={() => props.setCourseIdAndScenarioList(props.items.courses[0])}
    >
      <img
        className={classes.logohomeimage}
        src={laparologo}
        alt={"error"}
      ></img>
    </div>
  );
}

export default LogoHome;
