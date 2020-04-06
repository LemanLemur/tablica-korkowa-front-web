import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import RoomIcon from "@material-ui/icons/Room";
import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "20px",
    marginRight: "20px",
    width: "400px",
    [theme.breakpoints.down('xs')]: {
      width: "290px",
    },
    cursor: "pointer",
    height: "135px",
    marginBottom: "15px"
  },
  paper: {
    padding: "12px",
    margin: "12px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "0px solid grey",
    borderTop: "4px solid #3f51b5",
    boxShadow: "-1px 3px 10px 1px rgba(0,0,0,0.25)",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "initial",
    justifyContent: "space-between",
    width: "100%",
    position: "relative"
  },
  locRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    color: "#1976d2",
  },
  col: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  },
  avatar: {
    margin: "5px",
    width: theme.spacing(12),
    height: theme.spacing(12),
    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
  },
  name: {
    alignSelf: "flex-start",
    margin: "5px",
  },
  icon: {
    marginLeft: "5px",
    marginRight: "5px",
  },
  endDate: {
    width: "100%",
    margin: "5px",
    fontSize: "12px",
    color: "#eb3b5a",
    alignSelf: "flex-end",
  },
  price: {
    alignSelf: "flex-start",
    color: "#20bf6b",
    fontSize: "16px",
    margin: "5px",
    width: "85px"
  },
  priceFloatRight: {
    float:"right"
  },
  type: {
    position: "absolute",
    right: 0,
    top: -15
  }

}));

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec','Lipiec','Sierpnień','Wrzesień','Październik','Listopad','Grudzień'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  //var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min;// + ':' + sec ;
  return time;
}

export default function HomeCard(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.paper}>
        <div className={classes.row}><i class="fas fa-users"></i>
          <Avatar
            alt="avatar"
            src={props.avatar}
            className={classes.avatar}
          />
          
          <div className={classes.col}>
            <div className={classes.row}>
              <div className={classes.name}>
                <b>{props.subject}</b> <i>{props.level}</i>
              </div>
              <div className={classes.price}>
                <b className={classes.priceFloatRight}>{props.price} zł</b>
              </div>
              {
              props.type === 0 ?
              <PersonIcon color="action" className={`${classes.icon} ${classes.type}`} />
              :
              <GroupIcon color="action" className={`${classes.icon} ${classes.type}`} />
        }
            </div>
            <div className={classes.row}>
              <div className={classes.locRow}>
                <RoomIcon color="primary" className={classes.icon} />
                {props.city}
              </div>
              <div className={classes.endDate}>
                <i className={classes.priceFloatRight}>{timeConverter(props.endTime)} </i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
