import React, { useEffect } from "react";
import { Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import MainContainer from "../MainContainer";
import Input from "@material-ui/core/Input";

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
}));

export default function ProfileBox(props) {
  const classes = useStyles();
  const [isMobile, setIsMobile] = React.useState(false);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
  }, []);

  function handleResize() {
    if (window.innerWidth <= 620) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }

  return (
    <div className={classes.root}>
      <MainContainer width="40%" left>
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
            >
              Zmień avatar
            </Button>
          </div>
        ) : (
          <div className={classes.divRow}>
            <Avatar
              alt={props.user.email}
              src={props.user.avatar}
              className={classes.avatar}
            />
            <Button
              variant="contained"
              color="primary"
              style={{ margin: "10px" }}
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
                value={props.user.firstName}
                // onChange={handleChange}
                id="name-input"
              />
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
                value={props.user.lastName}
                // onChange={handleChange}
                id="name-input"
              />
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
              <Input
                value={props.user.telephone}
                // onChange={handleChange}
                id="name-input"
              />
            </div>
          </div>
        </div>
        <Button variant="contained" color="primary" style={{ margin: "15px" }}>
          Zapisz zmiany
        </Button>
      </MainContainer>
    </div>
  );
}
