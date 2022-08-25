import classes from "./Topbar.module.css";
import laparologo from "../../graphicassets/LaparoAcademyLogo.svg";

function TopBarLogo() {
  return (
    <div className={classes.topbarlogo}>
      <img
        className={classes.topbarlogoimage}
        src={laparologo}
        alt={"error"}
      ></img>
    </div>
  );
}

export default TopBarLogo;
