import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "10px"
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
    borderRadius: "4px",
    boxShadow: "-1px 3px 10px 1px rgba(0,0,0,0.25)",
  },
});

export default function HomeCard() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.paper}>

      </div>
    </div>
  );
}
