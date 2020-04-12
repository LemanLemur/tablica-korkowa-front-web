import React, { useEffect, useState } from "react";
import axios from "axios";
import { GET_USER_BY_AID_URL, GET_CARDS_BY_ID } from "../../constants/API";
import { useSelector, useDispatch } from "react-redux";
import { LOAD_USER, START_LOAD_DATA } from "../../constants/actionTypes";
import ProfileSkeleton from "../../conteiners/ProfileSkeleton/ProfileSkeleton";
import "./../index.css";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

import { CARD_STATUS_DRAFT, CARD_STATUS_NOTACTIVE, CARD_STATUS_ACTIVE, CARD_STATUS_ENDED, CARD_STATUS_ARCHIVE } from "../../constants/actionTypes"


import HomeCard from "../../conteiners/HomeCard";

const useStyles = makeStyles(theme => ({
  avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20)
  },
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "40px",
    marginBottom: "20px",
    position: "relative",
    marginLeft: "100px",
    marginRight: "100px",

  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  col: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative"
  },
  paperContainer: {
    width: "100%",
  },
  paperLeftCenter: {
    boxShadow: "-1px 3px 10px 1px rgba(0,0,0,0.25)",
    width: "74%",
    marginRight: "1%",
    float: "left",
    border: "0px solid grey",
    borderTop: "4px solid #3f51b5",
    background: "#fff"
  },
  paperLeft: {
    float: "left",
    width: "25%",
    padding: "10px",
  },
  paperCenter: {
    float: "left",
    width: "75%",
    padding: "10px",
  },
  paperRight: {
    float: "left",
    width: "25%",
    padding: "10px",
    //flexDirection: "column",
    //alignItems: "center",
    //justifyContent: "center",
    border: "0px solid grey",
    borderTop: "4px solid #3f51b5",
    boxShadow: "-1px 3px 10px 1px rgba(0,0,0,0.25)",
    background: "#fff"
  },
  paperRightContent: {
    marginRight: "auto",
    marginLeft: "auto",
  },
  
  divRow: {
    padding: "0px",
    margin: "0px",
    width: "100%",
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
  },
  justifyContent: {
    justifyContent: 'space-evenly',
    position: 'relative'
  },
  insideNav: {
    position: "relative",
    marginLeft: "auto",
    marginRight: "auto",
    left: "0",
    right: "0",
    padding: "0px",
    zIndex: "999"
  },
  outsideNav: {
    position: "relative",
    paddingTop: "50px"
  },
  mainCards: {
    marginTop: "50px"
  }

}));

export default function MyCards(props) {
  const auth = useSelector(state => state.auth.authUser);
  const user = useSelector(state => state.user);
  const [dataMobile, setDataMobile] = useState([]);
  const [dataDesktop1, setDataDesktop1] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  function handleResize() {
    if (window.innerWidth <= 1020) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }

  useEffect(() => {
    getUserData();
    window.addEventListener("resize", handleResize);
    handleResize();
  }, []);

  useEffect(() => {
    prepareData();
  }, [dataMobile]);

  function prepareData() {
    var data1 = [];
    dataMobile.forEach((data) => {
      data1.push(data);
    });
    setDataDesktop1(data1);
  }
  useEffect(() => {
    if (user.loading) {
      setIsLoading(true);

      fetchData();

    } else {
      setIsLoading(false);
    }
  }, [user.loading]);

  async function getUserData() {
    dispatch({ type: START_LOAD_DATA });
    await axios.get(GET_USER_BY_AID_URL + props.location.userID).then(res => {
      dispatch({ type: LOAD_USER, payload: res.data[0] });
    });
  }

  async function fetchData() {
    await axios.get(GET_CARDS_BY_ID + props.location.ID).then((res) => {
      setDataMobile(res.data);
    });
  }

  return isLoading ? (
    <ProfileSkeleton />
  ) : (

      <div className={classes.root}>
        {console.log(user)}
        {
          dataDesktop1.map((card, idx) => (
            <div className={classes.paperContainer} key={idx}>

              <div className={classes.paperLeftCenter} >
                <div className={classes.paperLeft} >
                  <Avatar alt="avatar" src={card.avatar} className={`${classes.avatar} ${props.isHit ? classes.avatarIsHit : ""}`} />
                  <div className={classes.Name}>
                    <span> {user.firstName + user.lastName} </span>
                    <span> {user.email} </span>
                    <span> {user.telephone} </span>

                  </div>
                </div>
                <div className={classes.paperCenter} >
                  <div className={classes.Name}>
                    <h1> {card.tittle} </h1>

                  </div>
                </div>
              </div>
              <div className={classes.paperRight}>
                <div className={classes.paperRightContent}>

                </div>

                {}
              </div>
            </div>
          ))
        }
      </div>
    );
}

