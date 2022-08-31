import classes from "./Topbar.module.css";
import laparologo from "../../graphicassets/LaparoAcademyLogo.svg";

function TopBarLogo(props) {
  return (
    <div onClick={props.ReturnToBasic} className={classes.topbarlogo}>
      <img
        className={classes.topbarlogoimage}
        src={laparologo}
        alt={"error"}
      ></img>
    </div>
  );
}

export default TopBarLogo;
