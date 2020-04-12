import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import RoomIcon from "@material-ui/icons/Room";
import PersonIcon from "@material-ui/icons/Person";
import GroupIcon from "@material-ui/icons/Group";
import timeConverter from "../../functions/timeConverter";
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "20px",
    marginRight: "20px",
    width: "450px",
    [theme.breakpoints.down("600")]: {
      width: "350px",
      marginBottom: "0px",
    },
    cursor: "pointer",
    height: "135px",
    marginBottom: "15px",
  },
  paper: {
    padding: "8px",
    margin: "10px",
    width: "100%",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "0px solid grey",
    borderTop: "4px solid #3f51b5",
    boxShadow: "-1px 3px 10px 1px rgba(0,0,0,0.25)",
    background: "#fff",
    minWidth: "450px",
    maxWidth: "450px"
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "initial",
    justifyContent: "space-between",
    width: "100%",
    position: "relative",
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
    border: "3px solid #3f51b5",
    borderRadius: "inhereit",
    [theme.breakpoints.down("600")]: {
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
  },avatarIsHit: {
    border: "3px solid #3f51b5",
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
    [theme.breakpoints.down("600")]: {
      position: "relative",
      height: theme.spacing(2),
    },
  },
  price: {
    alignSelf: "flex-start",
    color: "#20bf6b",
    fontSize: "16px",
    margin: "5px",
    width: "85px",
  },
  priceFloatRight: {
    float: "right",
  },
  type: {
    position: "absolute",
    right: 0,
    top: -15
  },
  level: {
    color: "grey"
  },
  isHit: {
    borderImage: "linear-gradient(to right, #3f51b5, #8a5195) 30 30 100%;", /* Standard syntax (must be last) */
    borderTopWidth: "4px",
    borderStyle: "solid",
    backgroundColor: "#fff6cb",
    borderBottom:"0",
    borderLeft:"0",
    borderRight:"0"
    
  },

}));


export default function HomeCard(props) {
  function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const classes = useStyles();
  
  return (
   

    <div className={classes.root} key ={props.id}> 
    {console.log(props.id)}
    <Link to = {{
      pathname:'/cardPage',
      ID: props.id,
      userID: props.userID
    }}
  >
        
                <div className={`${props.isHit ? classes.isHit : ""} ${classes.paper} `}>

        <div className={classes.row} >
          {//<i className="fas fa-users"></i>
          }
          <Avatar alt="avatar" src={props.avatar} className={`${classes.avatar} ${props.isHit ? classes.avatarIsHit : ""}`} />
          <div className={classes.col}>
            <div className={classes.row}>
              <div className={classes.name}>
                <b>{props.tittle.length >=60 ? Capitalize(props.tittle.toString().substring(0,60) + "...") : Capitalize(props.tittle)}</b>
                <div style={{ clear: "both" }}></div>
                <i style={{ color: "darkgrey" }}>{props.level}</i>
              </div>
              <div className="price-tag">
                <b className={classes.priceFloatRight}>{props.price} zł</b>
              </div>
              
            </div>
            <div className={classes.row}>
              <div className={classes.locRow}>
                <RoomIcon color="primary" className={classes.icon} />
                {props.city}
                {props.type === 0 ? (
                <PersonIcon
                  color="action"
                  className={`${classes.icon} ${classes.type}`}
                />
              ) : (
                <GroupIcon
                  color="action"
                  className={`${classes.icon} ${classes.type}`}
                />
              )}
              </div>
              <div className={classes.endDate}>
                <i className={classes.priceFloatRight}>
                  {timeConverter(props.endTime, true, true, true, true, true)}{" "}
                </i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
    </div>

  );
}
