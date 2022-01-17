import classes from "./LogoHome.module.css";

function LogoHome() {
  return (
    <div className={classes.logohome}>
      <img
        className={classes.logohomeimage}
        src={`https://storageaccountacadea4e1.blob.core.windows.net/laparoacademy-images/LaparoAcademyLogo.png`}
        alt={"error"}
      ></img>
    </div>
  );
}

export default LogoHome;
