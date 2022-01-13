import classes from "./Topbar.module.css";
import TopbarItem from "./TopbarItem.js";

function Topbar(props) {
  return (
    <div className={classes.topbar}>
      <TopbarItem />
    </div>
  );
}

export default Topbar;
