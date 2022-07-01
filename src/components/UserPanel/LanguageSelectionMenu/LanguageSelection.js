import classes from "./LanguageSelection.module.css";
import LanguageSelectionItem from "./LanguageSelectionItem";
import { AppHelper } from "./../../../App.js";

function LanguageSelection(props) {
  return (
    <div className={classes.languageselectionmenu}>
      {AppHelper.languages.map((lang) => {
        return (
          <LanguageSelectionItem
            key={lang}
            lang={lang}
            setSelectedLanguage={props.setSelectedLanguage}
            setUserPanelActive={props.setUserPanelActive}
            getLocalization={props.getLocalization}
            LogUserEvent={props.LogUserEvent}
          />
        );
      })}
    </div>
  );
}

export default LanguageSelection;
