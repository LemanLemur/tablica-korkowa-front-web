import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MaskedInput from "react-text-mask";
import { Button } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import PropTypes from "prop-types";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import firebase from "../../firebase";
import { POST_REGISTER_USER } from "../../constants/API";
import axios from "axios";
import {
  LOG_IN,
  SIGN_UP_ERROR,
  CLOSE_LOG_IN_MSG,
  SIGN_UP_SUCCESS,
} from "../../constants/actionTypes";
import { useSelector, useDispatch } from "react-redux";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { returnErrorMsg } from "../../functions/returnErrorMessage";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "20px",
    marginTop: "50px",
    width: "800px",
    [theme.breakpoints.down(800)]: {
      width: "500px",
    },
    [theme.breakpoints.down(550)]: {
      width: "300px",
    },
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
    alignItems: "flex-start",
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

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

export default function RegisterForm() {
  const classes = useStyles();
  const [isMobile, setIsMobile] = React.useState(false);
  const [values, setValues] = React.useState("");
  const [validName, setValidName] = React.useState(true);
  const [validTel, setValidTel] = React.useState(true);
  const [validSurname, setValidSurname] = React.useState(true);
  const [validMail, setValidMail] = React.useState(true);
  const [validPassword, setValidPassword] = React.useState(true);
  const [valid, setValid] = React.useState(true);
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [mail, setMail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [rePass, setRePass] = React.useState("");
  const [avatar, setAvatar] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  let history = useHistory();

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
  }, []);

  useEffect(() => {
    if (auth.authUser != null) {
      setOpen(false);
      setOpen(false);
    } else if (auth.showMessage) {
      setOpen(false);
    }

    if (auth.showMessage && auth.error) {
      setOpenSnack(true);
    } else {
      setOpenSnack(false);
    }
  }, [auth.error, auth.showMessage, auth.authUser]);

  function handleResize() {
    if (window.innerWidth <= 800) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }

  const handleChange = (event) => {
    setValues(event.target.value);
    if (event.target.value.match(/\d/g)) {
      if (event.target.value.match(/\d/g).length === 9) {
        setValues(event.target.value.split("-").join(" "));
        setValidTel(true);
      } else {
        setValidTel(false);
      }
    } else {
      setValidTel(true);
    }
    console.log(values);
    console.log(validTel);
  };

  const handleChangeName = (event) => {
    if (event.target.value.length <= 30) {
      setName(event.target.value);
      setValidName(
        /^[A-ZĄĆĘŁŃÓŚŹŻa-ząćęłńóśźż].[a-ząćęłńóśźż]*$/.test(event.target.value)
      );
    }
  };

  const handleChangeSurname = (event) => {
    if (event.target.value.length <= 30) {
      setSurname(event.target.value);
      setValidSurname(
        /^[A-ZĄĆĘŁŃÓŚŹŻa-ząćęłńóśźż].[a-ząćęłńóśźż]*$/.test(event.target.value)
      );
    }
  };

  const handleChangeMail = (event) => {
    setMail(event.target.value);
    setValidMail(
      /^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+\.[A-Za-z]+$/.test(event.target.value)
    );
  };

  const handleChangePass = (event) => {
    setPass(event.target.value);
    if (event.target.value.length < 6) {
      setValidPassword(false);
    }
    setValidPassword(rePass === event.target.value);
  };

  const handleChangeRePass = (event) => {
    setRePass(event.target.value);
    setValidPassword(pass === event.target.value);
  };

  const handleChangeAvatar = (event) => {
    setAvatar(event.target.value);
  };

  async function handleOnClick() {
    if (
      validName &&
      validSurname &&
      validMail &&
      validPassword &&
      name !== "" &&
      surname !== "" &&
      pass !== "" &&
      mail !== ""
    ) {
      setOpen(true);
      setValid(true);
      var tel;
      if (validTel) {
        tel = values.split("-").join(" ");
      } else {
        tel = "";
      }
      try {
        await firebase.register(mail, pass).then((res) => {
          var UID = res.uid;
          dispatch({ type: LOG_IN, payload: res });
          localStorage.setItem("uid", UID);
          axios
            .post(POST_REGISTER_USER, {
              accountID: UID,
              firstname: name,
              lastname: surname,
              email: mail,
              avatar: avatar,
              telephone: tel,
            })
            .then((res) => {
              localStorage.setItem("user_n", name);
              localStorage.setItem("user_a", avatar);
              localStorage.setItem("user_id", res.data.id);
              dispatch({ type: SIGN_UP_SUCCESS });
              setOpen(false);
              history.push("/");
              window.location.reload();
            });
        });
      } catch (error) {
        console.log(error); // <== TESTY

        dispatch({ type: SIGN_UP_ERROR, payload: error });
      }
    } else {
      setValid(false);
      setOpen(false);
    }
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleCloseSnack = () => {
    dispatch({ type: CLOSE_LOG_IN_MSG });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleOnClick();
    }
  };

  return (
    <div className={classes.root} onKeyDown={(e) => handleKeyDown(e)}>
      <div className={classes.paper}>
        <div className={classes.row}>
          <div className={classes.col}>
            <div className={classes.text}>Uzupełnij formularz</div>
            <div className={classes.inputs}>
              <TextField
                style={{ margin: "10px" }}
                fullWidth
                required
                id="standard-required"
                label="Imię"
                value={name}
                onChange={handleChangeName}
              />
              {!validName ? (
                <Typography
                  variant="subtitle2"
                  color="error"
                  style={{ fontSize: "12px" }}
                >
                  Pole zawiera niedozwolone znaki
                </Typography>
              ) : null}
              <TextField
                style={{ margin: "10px" }}
                fullWidth
                required
                id="standard-required"
                label="Nazwisko"
                value={surname}
                onChange={handleChangeSurname}
              />
              {!validSurname ? (
                <Typography
                  variant="subtitle2"
                  color="error"
                  style={{ fontSize: "12px" }}
                >
                  Pole zawiera niedozwolone znaki
                </Typography>
              ) : null}
              <TextField
                style={{ margin: "10px" }}
                fullWidth
                required
                id="standard-required"
                label="Email"
                value={mail}
                onChange={handleChangeMail}
              />
              {!validMail ? (
                <Typography
                  variant="subtitle2"
                  color="error"
                  style={{ fontSize: "12px" }}
                >
                  Nieprawidłowy format adresu e-mail
                </Typography>
              ) : null}
              <TextField
                type="password"
                style={{ margin: "10px" }}
                fullWidth
                required
                id="standard-required"
                label="Hasło"
                value={pass}
                onChange={handleChangePass}
                helperText="Hasło musi posiadać co najmniej 6 znaków"
              />
              {!validPassword ? (
                <Typography
                  variant="subtitle2"
                  color="error"
                  style={{ fontSize: "12px" }}
                >
                  Oba hasła muszą być takie same
                </Typography>
              ) : null}
              <TextField
                type="password"
                style={{ margin: "10px" }}
                fullWidth
                required
                id="standard-required"
                label="Powtórz hasło"
                value={rePass}
                onChange={handleChangeRePass}
              />
              {!validPassword ? (
                <Typography
                  variant="subtitle2"
                  color="error"
                  style={{ fontSize: "12px" }}
                >
                  Oba hasła muszą być takie same
                </Typography>
              ) : null}
              <FormControl fullWidth>
                <InputLabel htmlFor="formatted-text-mask-input">
                  Telefon
                </InputLabel>
                <Input
                  value={values}
                  onChange={handleChange}
                  name="textmask"
                  id="formatted-text-mask-input"
                  inputComponent={TextMaskCustom}
                />
              </FormControl>
              <TextField
                style={{ margin: "10px" }}
                fullWidth
                id="standard-required"
                label="Avatar"
                helperText="Link do zdjęcia"
                value={avatar}
                onChange={handleChangeAvatar}
              />
            </div>
            <div className={classes.row}>
              {!valid ? (
                <Typography
                  variant="subtitle2"
                  color="error"
                  style={{ fontSize: "12px", margin: "16px" }}
                >
                  Uzupełnij wszystkie wymagane pola!
                </Typography>
              ) : null}
              <Button
                onClick={handleOnClick}
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Rejestruj
              </Button>
            </div>
          </div>
          <Snackbar
            open={openSnack}
            autoHideDuration={6000}
            onClose={handleCloseSnack}
          >
            <Alert onClose={handleCloseSnack} severity="error">
              {returnErrorMsg(auth.alertMessage)}
            </Alert>
          </Snackbar>
          {isMobile ? null : (
            <div className={classes.logo}>
              <div className={classes.title}>Tablica korkowa</div>
            </div>
          )}
        </div>
      </div>

      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="secondary" />
      </Backdrop>
    </div>
  );
}
