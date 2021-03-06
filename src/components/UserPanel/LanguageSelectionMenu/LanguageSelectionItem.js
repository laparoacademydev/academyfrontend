import classes from "./LanguageSelection.module.css";
import { AppHelper } from "../../../App";

function LanguageSelectionItem(props) {
  return (
    <div
      className={classes.languageselectionmenuitem}
      onClick={() => {
        props.setUserPanelActive(0);
        props.setSelectedLanguage(props.lang.toString());
        props.getLocalization();
        let selectedlanguage = props.lang.toString();
        props.LogUserEvent("languageselected", selectedlanguage);
      }}
    >
      <div className={classes.languageflag}>
        <img
          src={`${AppHelper.storageUrl}uicontentextra/languageflags/${props.lang}.png`}
          alt="."
        ></img>
      </div>
    </div>
  );
}

export default LanguageSelectionItem;
