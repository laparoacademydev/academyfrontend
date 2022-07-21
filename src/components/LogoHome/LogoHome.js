import classes from "./LogoHome.module.css";
import laparologo from "../../graphicassets/LaparoAcademyLogo.svg";

function LogoHome() {
  return (
    <div className={classes.logohome}>
      <img
        className={classes.logohomeimage}
        src={laparologo}
        alt={"error"}
      ></img>
    </div>
  );
}

export default LogoHome;
