import React from "react";
import { Typography, Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DELETE_USER } from "../../constants/API";
import { LOG_OUT, ACCOUNT_DELETE_SUCCESS } from "../../constants/actionTypes";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "../../firebase";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  dialog: {
    width: "60%",
    minWidth: "315px",
  },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }  

export default function DeleteDialog(props) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [openSnack, setOpenSnack] = React.useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleDelete() {
      
    firebase.delete().then(function() {
         axios.delete(DELETE_USER+user.id);
         dispatch({ type: LOG_OUT });
         dispatch({ type: ACCOUNT_DELETE_SUCCESS });
         localStorage.removeItem('uid');
         localStorage.removeItem("user_n");
         history.push("/");
      }).catch(function(error) {
        setOpenSnack(true);
      });
  }

  return (
    <div className={classes.root}>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        color="secondary"
        style={{ margin: "15px" }}
      >
        Usuń konto
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Usówanie konta</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography>
              Czy na pewno chcesz <b style={{color: "red"}}>usunąć</b> konto?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained"
            color="primary"
            style={{ margin: "10px" }}
          >
            Anuluj
          </Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            color="secondary"
            style={{ margin: "10px" }}
          >
            Usuń konto
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
      >
          <Alert onClose={handleCloseSnack} severity="error">
            Coś poszło nie tak.
          </Alert>
      </Snackbar>
    </div>
  );
}
