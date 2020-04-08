import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import LogInDialog from "../components/LogInDialog";
import { useSelector, useDispatch } from "react-redux";
import { CLOSE_LOG_IN_MSG } from "../constants/actionTypes";
import UserMenu from "../components/UserMenu";
import { Link } from "react-router-dom";
import "./index.css";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { returnErrorMsg } from "../functions/returnErrorMessage";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    fontSize: "32px",
    fontFamily: "'Fredericka the Great', cursive",
    cursor: "pointer",
    textDecoration: "none",
    color: "white",
    [theme.breakpoints.down("xs")]: {
      fontSize: "22px"
    }
  },
  text: {
    flexGrow: 1,
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  },
  userDiv: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  }
}));

export default function Header() {
  const classes = useStyles();
  const [isLogged, setIsLogged] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const auth = useSelector(state => state.auth);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("uid")) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }

    if (auth.showMessage && !auth.error && auth.error !== null) {
      setOpenSnack(true);
    } else {
      setOpenSnack(false);
    }
  }, [auth]);

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleCloseSnack = () => {
    dispatch({ type: CLOSE_LOG_IN_MSG });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Link to="/" className={classes.title}>
            Tablica Korkowa
          </Link>
          {isLogged ? (
            <div className={classes.userDiv}>
              <Typography variant="h7" className={classes.text}>
                Witaj {user.firstName}!
              </Typography>
              <UserMenu />
            </div>
          ) : (
            <LogInDialog />
          )}
        </Toolbar>
      </AppBar>
      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
      >
        <Alert onClose={handleCloseSnack} severity="success">
          {returnErrorMsg(auth.alertMessage)}
        </Alert>
      </Snackbar>
    </div>
  );
}
