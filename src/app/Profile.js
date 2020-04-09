import React, { useEffect, useState } from "react";
import axios from "axios";
import { GET_USER_BY_AID_URL } from "../constants/API";
import { useSelector, useDispatch } from "react-redux";
import { LOAD_USER, START_LOAD_DATA } from "../constants/actionTypes";
import ProfileSkeleton from "../conteiners/ProfileSkeleton/ProfileSkeleton";
import "./index.css";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import ProfileBox from "../conteiners/ProfileBox"

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12)
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
    boxShadow: "-1px 3px 10px 1px rgba(0,0,0,0.25)"
  },
  divRow: {
    padding: "12px",
    margin: "4px",
    width: "80%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  divOneRowLeft: {
    padding: "12px",
    margin: "4px",
    width: "60%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "start",
    fontSize: "32px",
    fontFamily: "'Fredericka the Great', cursive",
    color: "#3f51b5",
    borderBottom: "2px solid #3f51b5"
  },
  divDataRow: {
    padding: "4px",
    margin: "4px",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "2px solid grey"
  },
  divDataCol: {
    padding: "4px",
    margin: "4px",
    width: "60%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "start"
  },
  name: {
    fontSize: "32px",
    fontFamily: "'Fredericka the Great', cursive"
  }
}));

export default function Profile() {
  const auth = useSelector(state => state.auth.authUser);
  const user = useSelector(state => state.user);
  const classes = useStyles();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (user.loading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [user.loading]);

  async function getUserData() {
    dispatch({ type: START_LOAD_DATA });
    await axios.get(GET_USER_BY_AID_URL + auth).then(res => {
      dispatch({ type: LOAD_USER, payload: res.data[0] });
    });
  }

  return isLoading ? (
    <ProfileSkeleton />
  ) : (
    <ProfileBox user={user}/>
  );
}
