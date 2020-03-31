import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import firebase from "../firebase";
import { useDispatch } from "react-redux";
import { LOG_IN } from "../constants/actionTypes";
import { Typography, Link } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content"
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120
  },
  formControlLabel: {
    marginTop: theme.spacing(1)
  },
  textFieldArea: {
    margin: "12px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  divClick:{
    cursor: "pointer"
  }
}));

export default function MaxWidthDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useDispatch();

  const handleChangeEmail = e => {
    setEmail(e.target.value);
  };

  const handleChangePassword = e => {
    setPassword(e.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleLogIn() {
    setOpen(false);
    await firebase.login(email, password).then(res => {
      dispatch({ type: LOG_IN, payload: res.user });
      console.log(res.user);
      localStorage.setItem("uid", res.user.uid);
      window.location.reload();
    });
  }

  const handleOpenSignIn = () => {
    setOpen(false);
  };
  
  return (
    <React.Fragment>
      <Typography color="textSecondary" variant="caption">
            Nie masz konta? Kliknij{" "}
          </Typography>
          <Typography color="secondary" variant="caption" onClick={handleClickOpen}>
            <div className={classes.divClick}>tutaj.</div>
          </Typography>
      <Dialog
        fullWidth={true}
        maxWidth="xs"
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Rejestracja</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Witaj w Tablica Korkowa, zaloguj się aby uzyskać więcej możliwości!
          </DialogContentText>
          <div className={classes.textFieldArea}>
            <TextField
              onChange={handleChangeEmail}
              id="standard-basic"
              label="Email"
            />
            <TextField
              onChange={handleChangePassword}
              id="standard-basic"
              label="Hasło"
              type="password"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Typography color="textSecondary" variant="caption">
            Nie masz konta? Kliknij{" "}
          </Typography>
          <Typography color="secondary" variant="caption" onClick={handleOpenSignIn}>
            <div className={classes.divClick}>tutaj.</div>
          </Typography>
          <Button variant="outlined" onClick={handleClose} color="secondary">
            Anuluj
          </Button>
          <Button variant="contained" onClick={handleLogIn} color="primary">
            Zaloguj
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
