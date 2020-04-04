import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center"
  }
}));

export default function Variants() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <Skeleton variant="text" />
        <Skeleton variant="circle" width={90} height={90} />
        <Skeleton variant="rect" width={300} height={158} />
      </div>
    </div>
  );
}
