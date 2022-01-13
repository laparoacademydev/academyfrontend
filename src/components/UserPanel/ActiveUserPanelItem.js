import classes from "./UserPanel.module.css";

function ActiveUserPanelItem(props) {
  return (
    <div className={classes.activeuserpanelitem} onClick={props.onclick}>
      <img src={props.icon} className={classes.optionicons} alt="." />
      <div className={classes.activeuserpanelitemtext}>{props.text}</div>
    </div>
  );
}

export default ActiveUserPanelItem;
