import classes from "./UserPanel.module.css";
import LanguageSelection from "./LanguageSelectionMenu/LanguageSelection";

function ActiveUserPanelItem(props) {
  return (
    <div className={classes.activeuserpanelitem} onClick={props.onclick}>
      <img src={props.icon} className={classes.optionicons} alt="." />
      <div className={classes.activeuserpanelitemtext}>{props.text}</div>
      {props.activeLanguageMenu && props.text === "Language" ? (
        <LanguageSelection
          setSelectedLanguage={props.setSelectedLanguage}
          setUserPanelActive={props.setUserPanelActive}
        />
      ) : (
        <div />
      )}
    </div>
  );
}

export default ActiveUserPanelItem;
