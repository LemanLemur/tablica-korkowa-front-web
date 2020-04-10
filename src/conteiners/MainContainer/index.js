import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "20px",
    marginTop: "50px",
    width: "80%",
    // [theme.breakpoints.down(800)]: {
    //   width: "500px",
    // },
    // [theme.breakpoints.down(550)]: {
    //   width: "300px",
    // },
  },
  paper: {
    margin: "12px",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "0px solid grey",
    borderTop: "6px solid #3f51b5",
    boxShadow: "-1px 3px 10px 1px rgba(0,0,0,0.25)",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "initial",
    justifyContent: "flex-end",
    width: "100%",
    height: "100%",
    position: "relative",
  },
  col: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  inputs: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    marginLeft: "15px",
  },
  logo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    height: "100%",
    backgroundColor: "#3f51b5",
  },
  title: {
    fontSize: "32px",
    fontFamily: "'Fredericka the Great', cursive",
    color: "white",
    [theme.breakpoints.down("xs")]: {
      fontSize: "22px",
    },
  },
  text: {
    fontSize: "26px",
    padding: "10px",
  },
  button: {
    alignSelf: "flex-end",
    margin: "10px",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function MainContainer(props) {
  const classes = useStyles();
  const [isMobile, setIsMobile] = React.useState(false);
  const [divideLogo, setDivideLogo] = React.useState(false);
  const [Width, setWidth] = React.useState({
    width: "100%",
    alignItems: "flex-end",
  });

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    if (props.width !== "undefined") {
      setWidth({ width: props.width, alignItems: "flex-end" });
    }
    console.log(Width);
  }, []);

  function handleResize() {
    if (window.innerWidth >= 1080) {
      setDivideLogo(false);
    } else if (window.innerWidth <= 800) {
      setDivideLogo(true);
      setIsMobile(true);
    } else {
      setDivideLogo(true);
      setIsMobile(false);
    }
  }

  return (
    <div className={classes.root} onKeyDown={props.onKeyDown}>
      <div className={classes.paper}>
        {props.left ? (
          <div className={classes.row}>
            {isMobile ? null : (
              <div className={classes.col} style={Width}>
                <div className={classes.logo}>
                  {divideLogo ? (
                    <div className={classes.col}>
                      <div className={classes.title}>Tablica</div>
                      <div className={classes.title}>korkowa</div>
                    </div>
                  ) : (
                    <div className={classes.title}>Tablica korkowa</div>
                  )}
                </div>
              </div>
            )}
            <div className={classes.col}>{props.children}</div>
          </div>
        ) : (
          <div className={classes.row}>
            <div className={classes.col}>{props.children}</div>
            {isMobile ? null : (
              <div className={classes.col} style={Width}>
                <div className={classes.logo}>
                  <div className={classes.title}>Tablica korkowa</div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
