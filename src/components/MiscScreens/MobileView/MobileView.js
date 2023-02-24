import React from "react";
import classes from "./MobileView.module.css";

function MobileView() {
  return (
    <div className={classes.background}>
      <img
        className={classes.logohomeimage}
        src={`https://storageaccountacadea4e1.blob.core.windows.net/laparoacademy-images/LaparoAcademyLogo.png`}
        alt={"error"}
      ></img>
      <div className={classes.text}>
        Sorry, Laparo Academy is not available on mobile or tablet devices.
      </div>
    </div>
  );
}

export default MobileView;
