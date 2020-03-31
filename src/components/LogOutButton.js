import React from "react";
import Button from "@material-ui/core/Button";
import firebase from "../firebase";
import { useDispatch } from "react-redux";
import { LOG_OUT } from "../constants/actionTypes";

export default function LogOutButton() {
  const dispatch = useDispatch();

  async function handleLogOut() {
    await firebase.logout().then(() => {
      dispatch({ type: LOG_OUT });
      localStorage.removeItem('uid');
      localStorage.removeItem("user_n");
    });
  }
  
  return (
    <React.Fragment>
      <Button color="inherit" onClick={handleLogOut}>Wyloguj</Button>
    </React.Fragment>
  );
}
