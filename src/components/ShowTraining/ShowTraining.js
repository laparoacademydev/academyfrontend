import React from "react";
import classes from "./ShowTraining.module.css";

function ShowTraining(props) {
  return (
    <div className={classes.showtraining}>
      <video width="850" height="640" controls>
        <source src={props.training.url} type="video/webm" />
      </video>
    </div>
  );
}
export default ShowTraining;
