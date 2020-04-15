import React, { useEffect } from "react";
import { Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import MainContainer from "../../conteiners/MainContainer";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import MaskedInput from "react-text-mask";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import { UPDATE_USER } from "../../constants/API";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import DeleteDialog from "./DeletedDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: theme.spacing(14),
    height: theme.spacing(14),
    margin: "10px",
    border: "3px solid #3f51b5"
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
    justifyContent: "flex-start",
  },
  divCol: {
    padding: "12px",
    margin: "4px",
    width: "80%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  divOneRowLeft: {
    padding: "12px",
    margin: "4px",
    width: "90%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "start",
    fontSize: "22px",
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
    // borderBottom: "2px solid grey",
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
  inputTitle: {
    width: "15%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  input: {
    width: "70%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  menu: {
    display: "flex",
    width: "100%",
    backgroundColor: "#3f51b5",
  },
  itemMenuSelected: {
    cursor: "pointer",
    height: "fit-content",
    padding: "10px",
    border: "2px solid white",
    width: "fit-content",
    color: "white",
    "&:hover": {
      background: "#ffffff3b",
    },
  },
  itemMenu: {
    cursor: "pointer",
    height: "fit-content",
    padding: "10px",
    width: "fit-content",
    color: "white",
    "&:hover": {
      background: "#ffffff3b",
    },
  },
  divShow: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "90%",
  },
  divHide: {
    width: "90%",
    display: "none",
  },
}));

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/]}
      placeholderChar={"\u2000"}
      showMask
    />
  );
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ProfileBox(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const [values, setValues] = React.useState("   -   -   ");
  const [tel, setTel] = React.useState(props.user.telephone);
  const [name, setName] = React.useState(props.user.firstName);
  const [lastName, setLastName] = React.useState(props.user.lastName);
  const [avatar, setAvatar] = React.useState(props.user.avatar);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [isValid, setIsValid] = React.useState(true);

  const [validTel, setValidTel] = React.useState(true);
  const [validName, setValidName] = React.useState(true);
  const [validLastName, setValidLastName] = React.useState(true);

  const [userMenu, setUserMenu] = React.useState(true);
  const [accountMenu, setAccountMenu] = React.useState(false);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    setValues(tel);
  }, []);

  function handleResize() {
    if (window.innerWidth <= 620) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }

  const handleChange = (event) => {
    setValues(event.target.value);
    if (event.target.value.match(/\d/g)) {
      if (event.target.value.match(/\d/g).length === 9) {
        setTel(event.target.value.split("-").join(" "));
        setValidTel(true);
        console.log(tel);
      } else {
        setValidTel(false);
      }
    } else {
      setValidTel(true);
    }
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
    setValidName(
      /^[A-ZĄĆĘŁŃÓŚŹŻa-ząćęłńóśźż].[a-ząćęłńóśźż]*$/.test(event.target.value)
    );
  };

  const handleChangeLastName = (event) => {
    setLastName(event.target.value);
    setValidLastName(
      /^[A-ZĄĆĘŁŃÓŚŹŻa-ząćęłńóśźż].[a-ząćęłńóśźż]*$/.test(event.target.value)
    );
  };

  const handleChangeAvatar = (event) => {
    setAvatar(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function saveChanges() {
    if (validLastName && validName && validTel) {
      setIsValid(true);
      await axios
        .put(UPDATE_USER + props.user.id, {
          firstname: name,
          lastname: lastName,
          avatar: avatar,
          telephone: tel,
        })
        .then((res) => {
          localStorage.setItem("user_n", name);
          localStorage.setItem("user_a", avatar);
          setOpenSnack(true);
        });
    } else {
      setIsValid(false);
      setOpenSnack(true);
    }
  }

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

  function handleSelectUserMenu() {
    setUserMenu(true);
    setAccountMenu(false);
  }

  function handleSelectAccountMenu() {
    setUserMenu(false);
    setAccountMenu(true);
  }

  return (
    <div className={classes.root}>
      <MainContainer width="40%" left>
        <div className={classes.menu}>
          <div
            onClick={handleSelectUserMenu}
            className={userMenu ? classes.itemMenuSelected : classes.itemMenu}
          >
            Dane użytkownika
          </div>
          <div
            onClick={handleSelectAccountMenu}
            className={
              accountMenu ? classes.itemMenuSelected : classes.itemMenu
            }
          >
            Ustawienia konta
          </div>
        </div>

        <div className={userMenu ? classes.divShow : classes.divHide}>
          <div className={classes.divOneRowLeft}>Zdjęcie profilowe:</div>

          {isMobile ? (
            <div className={classes.divCol}>
              <Avatar
                alt={props.user.email}
                src={props.user.avatar}
                className={classes.avatar}
              />
              <Button
                variant="contained"
                color="primary"
                style={{ margin: "10px" }}
                onClick={handleClickOpen}
              >
                Zmień avatar
              </Button>
            </div>
          ) : (
            <div className={classes.divRow}>
              <Avatar
                alt={props.user.email}
                src={avatar}
                className={classes.avatar}
              />
              <Button
                variant="contained"
                color="primary"
                style={{ margin: "10px" }}
                onClick={handleClickOpen}
              >
                Zmień avatar
              </Button>
            </div>
          )}

          <div className={classes.divOneRowLeft}>Dane ogólne:</div>

          <div className={classes.divDataCol}>
            <div className={classes.divDataRow}>
              <div className={classes.inputTitle}>
                <Typography variant="h7" color="textPrimary">
                  Imię:
                </Typography>
              </div>
              <div className={classes.input}>
                <Input
                  value={name}
                  error={!validName}
                  onChange={handleChangeName}
                  id="name-input"
                />
                {validName ? null : (
                  <Typography
                    variant="subtitle2"
                    color="error"
                    style={{ fontSize: "12px" }}
                  >
                    Niepoprawny format
                  </Typography>
                )}
              </div>
            </div>

            <div className={classes.divDataRow}>
              <div className={classes.inputTitle}>
                <Typography variant="h7" color="textPrimary">
                  Nazwisko:
                </Typography>
              </div>
              <div className={classes.input}>
                <Input
                  value={lastName}
                  error={!validLastName}
                  onChange={handleChangeLastName}
                  id="name-input"
                />
                {validLastName ? null : (
                  <Typography
                    variant="subtitle2"
                    color="error"
                    style={{ fontSize: "12px" }}
                  >
                    Niepoprawny format
                  </Typography>
                )}
              </div>
            </div>

            <div className={classes.divDataRow}>
              <div className={classes.inputTitle}>
                <Typography variant="h7" color="textPrimary">
                  Email:
                </Typography>
              </div>
              <div className={classes.input}>
                <Input
                  disabled
                  value={props.user.email}
                  // onChange={handleChange}
                  id="name-input"
                />
              </div>
            </div>

            <div className={classes.divDataRow}>
              <div className={classes.inputTitle}>
                <Typography variant="h7" color="textPrimary">
                  Telefon:
                </Typography>
              </div>
              <div className={classes.input}>
                <FormControl>
                  <Input
                    value={values}
                    error={!validTel}
                    onChange={handleChange}
                    name="textmask"
                    id="formatted-text-mask-input"
                    inputComponent={TextMaskCustom}
                  />
                </FormControl>
                {validTel ? null : (
                  <Typography
                    variant="subtitle2"
                    color="error"
                    style={{ fontSize: "12px" }}
                  >
                    Niepoprawny format
                  </Typography>
                )}
              </div>
            </div>
          </div>
          {isMobile ? (
            <div className={classes.divCol}>
              <Button
                onClick={saveChanges}
                variant="contained"
                color="primary"
                style={{ margin: "15px" }}
              >
                Zapisz zmiany
              </Button>
              <DeleteDialog />
            </div>
          ) : (
            <div
              className={classes.divRow}
              style={{ justifyContent: "center" }}
            >
              <Button
                onClick={saveChanges}
                variant="contained"
                color="primary"
                style={{ margin: "15px" }}
              >
                Zapisz zmiany
              </Button>
              <DeleteDialog />
            </div>
          )}
        </div>

        <div className={accountMenu ? classes.divShow : classes.divHide}>
          <Button
            onClick={saveChanges}
            variant="contained"
            color="primary"
            style={{ margin: "15px" }}
          >
            Zapisz zmiany
          </Button>
          <Button
            onClick={saveChanges}
            variant="contained"
            color="primary"
            style={{ margin: "15px" }}
          >
            Zapisz zmiany
          </Button>
          <Button
            onClick={saveChanges}
            variant="contained"
            color="primary"
            style={{ margin: "15px" }}
          >
            Zapisz zmiany
          </Button>
        </div>
      </MainContainer>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Zmień zdjęcie profilowe
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Wklej link do nowego zdjęcia profilowego, a następnie kliknij
            zapisz.
          </DialogContentText>
          <TextField
            autoFocus
            label="Avatar"
            fullWidth
            value={avatar}
            onChange={handleChangeAvatar}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained"
            color="primary"
            style={{ margin: "10px" }}
          >
            Zapisz
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
      >
        {isValid ? (
          <Alert onClose={handleCloseSnack} severity="success">
            Zmiany zostały zapisane!
          </Alert>
        ) : (
          <Alert onClose={handleCloseSnack} severity="error">
            Niepoprawny format pól.
          </Alert>
        )}
      </Snackbar>
    </div>
  );
}
