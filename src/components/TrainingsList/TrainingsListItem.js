import classes from "./TrainingsList.module.css";
import buttonclasses from "../UI/Button.module.css"

function TrainingsListItem(props) {
  var date = new Date(parseInt(props.training.date));
  var showDate =
    date.getDate() +
    "." +
    date.getMonth() +
    "." +
    date.getFullYear() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes();

  return (
    <div onClick={() => props.setSelectedTraining(props.training)} className={classes.traininglistitem}>
      <div >
        <div className={classes.traininglistitemheader}>
          {props.training.name} 
        </div>
        <div className={classes.traininglistitemdate}>{showDate}</div>
      </div>
      <div className={`${buttonclasses.button} ${classes.traininglistitemdeletebtn}`} onClick={() => props.deleteTraining(props.training)}>
        <div className={buttonclasses.buttontext}>Delete Video</div>
      </div>
    </div>
  );
}

export default TrainingsListItem;
