import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import firebase from "../../firebase";
import {
  LOG_IN,
  LOAD_USER,
  LOG_IN_ERROR,
  CLOSE_LOG_IN_MSG,
  LOG_IN_SUCCESS,
} from "../../constants/actionTypes";
import axios from "axios";
import { LAST_LOG_UPDATE_URL, GET_USER_BY_AID_URL } from "../../constants/API";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { returnErrorMsg } from "../../functions/returnErrorMessage";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content",
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
  textFieldArea: {
    margin: "12px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  divClick: {
    cursor: "pointer",
  },
  link: {
    fontSize: "13px",
    textAlign: "justify",
    marginRight: "5px",
    marginBottom: "5px",
  },
  col: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    borderColor: "white",
    color: "white",
  }
}));

export default function LogInDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isMobile, setIsMobile] = React.useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
  }, []);

  function handleResize() {
    if (window.innerWidth <= 500) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }

  useEffect(() => {
    if (auth.authUser != null) {
      setLoading(false);
      setOpen(false);
    } else if (auth.showMessage) {
      setLoading(false);
    }

    if (auth.showMessage && auth.error) {
      setOpenSnack(true);
    } else {
      setOpenSnack(false);
    }
  }, [auth.error, auth.showMessage, auth.authUser]);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogIn();
    }
  };

  async function handleLogIn() {
    setLoading(true);
    try {
      await firebase.login(email, password).then((res) => {
        dispatch({ type: LOG_IN, payload: res.user });
        localStorage.setItem("uid", res.user.uid);
        axios.get(GET_USER_BY_AID_URL + res.user.uid).then((res) => {
          localStorage.setItem("user_n", res.data[0].firstName);
          localStorage.setItem("user_a", res.data[0].avatar);
          localStorage.setItem("user_id", res.data[0].id);
          dispatch({ type: LOAD_USER, payload: res.data[0] });
          axios.put(LAST_LOG_UPDATE_URL + res.data[0].id);
          dispatch({ type: LOG_IN_SUCCESS });
        });
      });
    } catch (error) {
      dispatch({ type: LOG_IN_ERROR, payload: error });
    }
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleCloseSnack = () => {
    dispatch({ type: CLOSE_LOG_IN_MSG });
  };

  return (
    <React.Fragment>
      <Button variant="outlined" className={classes.button} onClick={handleClickOpen}>
        Zaloguj
      </Button>
      <Dialog
        fullWidth={true}
        maxWidth="xs"
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Logowanie</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <dir style={{ textAlign: "justify", marginLeft: "0px" }}>
              Witaj w Tablica Korkowa, zaloguj się aby uzyskać więcej
              możliwości!
            </dir>
          </DialogContentText>

          {loading ? (
            <center>
              <CircularProgress />
            </center>
          ) : (
            <div className={classes.textFieldArea}>
              <TextField
                onChange={handleChangeEmail}
                id="standard-basic"
                label="Email"
                value={email}
              />
              <TextField
                onChange={handleChangePassword}
                id="standard-basic"
                label="Hasło"
                value={password}
                type="password"
                onKeyDown={(e) => handleKeyDown(e)}
              />
            </div>
          )}
        </DialogContent>
        {isMobile ? (
          <DialogActions className={classes.col}>
            <div className={classes.link} style={{marginRight: "0px"}}>
              Nie masz jeszcze konta? Kliknij 
              <Link
                onClick={handleClose}
                to="/sign-up"
                style={{ textDecoration: "none", color: "#eb3b5a" }}
              >
               , tutaj
              </Link>
              .
            </div>
            <center style={{marginLeft: "0px"}}>
              <Button
                variant="outlined"
                onClick={handleClose}
                color="secondary"
                style={{ margin: "5px" }}
              >
                Anuluj
              </Button>
              <Button
                variant="contained"
                onClick={handleLogIn}
                color="primary"
                style={{ margin: "5px" }}
              >
                Zaloguj
              </Button>
            </center>
          </DialogActions>
        ) : (
          <DialogActions>
            <div className={classes.link}>
              Nie masz jeszcze konta? Kliknij 
              <Link
                onClick={handleClose}
                to="/sign-up"
                style={{ textDecoration: "none", color: "#eb3b5a" }}
              >
               , tutaj
              </Link>
              .
            </div>
            <Button variant="outlined" onClick={handleClose} color="secondary">
              Anuluj
            </Button>
            <Button variant="contained" onClick={handleLogIn} color="primary">
              Zaloguj
            </Button>
          </DialogActions>
        )}
        <Snackbar
          open={openSnack}
          autoHideDuration={6000}
          onClose={handleCloseSnack}
        >
          <Alert onClose={handleCloseSnack} severity="error">
            {returnErrorMsg(auth.alertMessage)}
          </Alert>
        </Snackbar>
      </Dialog>
    </React.Fragment>
  );
}
