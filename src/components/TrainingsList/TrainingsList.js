import React from "react";
import classes from "./TrainingsList.module.css";
import TrainingsListItem from "./TrainingsListItem";

function TrainingsList(props) {
  return (
    <div className={classes.traininglist}>
      {props.trainingList.map((training) => (
        <TrainingsListItem
          key={training}
          training={training}
          setSelectedTraining={props.setSelectedTraining}
          deleteTraining={props.deleteTraining}
        ></TrainingsListItem>
      ))}
    </div>
  );
}
export default TrainingsList;
