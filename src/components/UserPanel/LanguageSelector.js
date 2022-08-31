import classes from "./LanguageSelector.module.css";
import { AppHelper } from "../../App";

function LanguageSelector(props) {
  function CurrentLanguageLabel(x) {
    var z = `${props.localizationData.userpanel[x]} (${x.toUpperCase()})`;
    return z;
  }

  return (
    <div className={classes.languageselectoritem}>
      <div className={classes.languageselectorheader}>
        {props.localizationData.userpanel.languageselect}
      </div>
      <div className={classes.languageselectordropdown}>
        <img
          className={classes.languageflag}
          src={`${AppHelper.storageUrl}uicontentextra/languageflags/${props.selectedLanguage}.png`}
          alt="."
        ></img>

        <div className={classes.languageselectordropdowntxt}>
          {CurrentLanguageLabel(props.selectedLanguage)}
        </div>
        {AppHelper.languages.map((lang) => {
          return (
            <div
              onClick={() => props.ChangeLanguage(lang)}
              key={lang}
              className={classes.languageselectdropdown}
            >
              <a>{CurrentLanguageLabel(lang)}</a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LanguageSelector;
