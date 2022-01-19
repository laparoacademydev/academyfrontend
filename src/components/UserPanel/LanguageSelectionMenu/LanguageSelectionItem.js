import classes from "./LanguageSelection.module.css";
import { AppHelper } from "../../../App";

function LanguageSelectionItem(props) {
  return (
    <div
      className={classes.languageselectionmenuitem}
      onClick={() => {
        props.setUserPanelActive(0);
        props.setSelectedLanguage(props.lang.toString());
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
