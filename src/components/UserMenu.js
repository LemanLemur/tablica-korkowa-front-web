import React from "react";
import firebase from "../firebase";
import { useDispatch } from "react-redux";
import { LOG_OUT } from "../constants/actionTypes";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: "none",
    color: "black",
  },
}));

export default function LogOutButton() {
  const classes = useStyles();
  const dispatch = useDispatch();

//   const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  async function handleLogOut() {
    await firebase.logout().then(() => {
      dispatch({ type: LOG_OUT });
      localStorage.removeItem('uid');
      localStorage.removeItem("user_n");
    });
  }
  
  return (
    <div>
    <IconButton
      aria-label="account of current user"
      aria-controls="menu-appbar"
      aria-haspopup="true"
      onClick={handleMenu}
      color="inherit"
    >
      <AccountCircle />
    </IconButton>
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={open}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose}><Link to='/profile' className={classes.link}>Profil</Link></MenuItem>
      <MenuItem onClick={handleLogOut}><Link to='/' className={classes.link}>Wyloguj</Link></MenuItem>
    </Menu>
  </div>
  );
}
