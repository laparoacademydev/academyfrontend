import classes from "./UserPanel.module.css";
import LanguageSelection from "./LanguageSelectionMenu/LanguageSelection";

function ActiveUserPanelItem(props) {
  var languagePrompt = eval(
    "props.localizationData.userpanel.languageselect.text." +
      props.selectedLanguage
  );
  console.log(languagePrompt);
  return (
    <div className={classes.activeuserpanelitem} onClick={props.onclick}>
      <img src={props.icon} className={classes.optionicons} alt="." />
      <div className={classes.activeuserpanelitemtext}>{props.text}</div>
      {props.activeLanguageMenu && props.text === languagePrompt ? (
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
