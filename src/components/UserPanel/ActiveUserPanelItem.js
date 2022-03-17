import classes from "./UserPanel.module.css";
import LanguageSelection from "./LanguageSelectionMenu/LanguageSelection";

function ActiveUserPanelItem(props) {
  return (
    <div className={classes.activeuserpanelitem} onClick={props.onclick}>
      <img src={props.icon} className={classes.optionicons} alt="." />
      <div className={classes.activeuserpanelitemtext}>{props.text}</div>
      {props.activeLanguageMenu &&
      props.text === props.localizationData.userpanel.languageselect ? (
        <LanguageSelection
          setSelectedLanguage={props.setSelectedLanguage}
          setUserPanelActive={props.setUserPanelActive}
          getLocalization={props.getLocalization}
        />
      ) : (
        <div />
      )}
    </div>
  );
}

export default ActiveUserPanelItem;
