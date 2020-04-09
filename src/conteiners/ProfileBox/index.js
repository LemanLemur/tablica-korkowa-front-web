import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import MainContainer from "../MainContainer";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  paper: {
    padding: "12px",
    margin: "12px",
    width: "60%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "0px solid grey",
    borderTop: "4px solid #3f51b5",
    boxShadow: "-1px 3px 10px 1px rgba(0,0,0,0.25)",
  },
  divRow: {
    padding: "12px",
    margin: "4px",
    width: "80%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  divOneRowLeft: {
    padding: "12px",
    margin: "4px",
    width: "60%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "start",
    fontSize: "32px",
    fontFamily: "'Fredericka the Great', cursive",
    color: "#3f51b5",
    borderBottom: "2px solid #3f51b5",
  },
  divDataRow: {
    padding: "4px",
    margin: "4px",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "2px solid grey",
  },
  divDataCol: {
    padding: "4px",
    margin: "4px",
    width: "60%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "start",
  },
  name: {
    fontSize: "32px",
    fontFamily: "'Fredericka the Great', cursive",
  },
}));

export default function ProfileBox(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MainContainer width="60%" left>
        <div className={classes.divRow}>
          <Avatar
            alt={props.user.email}
            src={props.user.avatar}
            className={classes.avatar}
          />
          <Typography variant="h5" color="primary">
            {props.user.firstName} {props.user.lastName}
          </Typography>
        </div>

        <div className={classes.divOneRowLeft}>Dane profilu:</div>

        <div className={classes.divDataCol}>
          <div className={classes.divDataRow}>
            <Typography variant="h7" color="textPrimary">
              Imię:
            </Typography>
            <Typography variant="h6" color="primary">
              {props.user.firstName}
            </Typography>
          </div>
          <div className={classes.divDataRow}>
            <Typography variant="h7" color="textPrimary">
              Nazwisko:
            </Typography>
            <Typography variant="h6" color="primary">
              {props.user.lastName}
            </Typography>
          </div>
          <div className={classes.divDataRow}>
            <Typography variant="h7" color="textPrimary">
              E-mail:
            </Typography>
            <Typography variant="h6" color="primary">
              {props.user.email}
            </Typography>
          </div>
          <div className={classes.divDataRow}>
            <Typography variant="h7" color="textPrimary">
              Telefon:
            </Typography>
            <Typography variant="h6" color="primary">
              {props.user.telephone}
            </Typography>
          </div>
        </div>
      </MainContainer>
    </div>
  );
}
