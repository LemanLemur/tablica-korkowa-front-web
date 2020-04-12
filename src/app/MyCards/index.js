import React, { useEffect, useState } from "react";
import axios from "axios";
import { GET_USER_BY_AID_URL, GET_USERS_CARDS } from "../../constants/API";
import { useSelector, useDispatch } from "react-redux";
import { LOAD_USER, START_LOAD_DATA } from "../../constants/actionTypes";
import ProfileSkeleton from "../../conteiners/ProfileSkeleton/ProfileSkeleton";
import "./../index.css";
import { makeStyles } from "@material-ui/core/styles";

import { CARD_STATUS_DRAFT, CARD_STATUS_NOTACTIVE, CARD_STATUS_ACTIVE, CARD_STATUS_ENDED, CARD_STATUS_ARCHIVE } from "../../constants/actionTypes"


import HomeCard from "../../conteiners/HomeCard";

const useStyles = makeStyles(theme => ({
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12)
  },
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "40px",
    marginBottom: "20px",
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
  paper: {
    padding: "12px",
    width: "80%",
    display: "flex",
    //flexDirection: "column",
    //alignItems: "center",
    //justifyContent: "center",
    border: "0px solid grey",
    borderTop: "4px solid #3f51b5",
    boxShadow: "-1px 3px 10px 1px rgba(0,0,0,0.25)",
    background: "#fff"
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

export default function MyCards() {
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
    var data1 = [],
      data2 = [],
      i = 0;
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
    await axios.get(GET_USER_BY_AID_URL + auth).then(res => {
      dispatch({ type: LOAD_USER, payload: res.data[0] });
    });
  }

  async function fetchData() {
    await axios.get(GET_USERS_CARDS + auth).then((res) => {
      setDataMobile(res.data);
    });
  }

  return isLoading ? (
    <ProfileSkeleton />
  ) : (
      <div className={classes.root}>
        <div className={classes.paper}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12 col-md-3">

                <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                  <a className="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Ogłoszenia</a>
                  <a className="nav-link" id="v-pills-observe-tab" data-toggle="pill" href="#v-pills-observe" role="tab" aria-controls="v-pills-observe" aria-selected="false">Obserwowane</a>
                  <a className="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Messages</a>
                  <a className="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Settings</a>
                </div>
              </div>
              <div className="col-sm-12 col-md-9 justifyContent">
                <div className="tab-content" id="v-pills-tabContent">
                  <div className="tab-pane fade show active nav-pills" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">

                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                      <li className="nav-item">
                        <a className="nav-link" id="draft-tab" data-toggle="tab" href="#draft" role="tab" aria-controls="draft" aria-selected="false">Szkic</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" id="notactive-tab" data-toggle="tab" href="#notactive" role="tab" aria-controls="notactive" aria-selected="false">Nieaktywne</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link active" id="active-tab" data-toggle="tab" href="#active" role="tab" aria-controls="active" aria-selected="true">Aktywne</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" id="ended-tab" data-toggle="tab" href="#ended" role="tab" aria-controls="ended" aria-selected="false">Zakończone</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" id="archive-tab" data-toggle="tab" href="#archive" role="tab" aria-controls="archive" aria-selected="false">Archiwalne</a>
                      </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                      <div className="tab-pane fade" id="draft" role="tabpanel" aria-labelledby="draft-tab">
                        <div>
                          {isMobile ?
                            <div>
                              {dataMobile.filter(single => single.status === CARD_STATUS_DRAFT).map((card, idx) => (
                                <div key={idx}>
                                  <HomeCard
                                    id={card.id}
                                    isHit={card.isHit}
                                    type={card.type}
                                    level={card.level}
                                    avatar={card.avatar}
                                    tittle={card.tittle}
                                    price={card.price}
                                    city={card.city}
                                    endTime={card.endDate}
                                  />
                                </div>
                              ))}
                            </div>
                            :
                            <div className={classes.root}>
                              <div className={classes.row}>
                                <div className={classes.col}>
                                  {dataDesktop1.filter(single => single.status === CARD_STATUS_DRAFT).map((card, idx) => (
                                    <div key={idx}>
                                      <HomeCard

id={card.id}
                                        isHit={card.isHit}
                                        type={card.type}
                                        level={card.level}
                                        avatar={card.avatar}
                                        tittle={card.tittle}
                                        price={card.price}
                                        city={card.city}
                                        endTime={card.endDate}
                                      />
                                    </div>
                                  ))}
                                </div>

                              </div>
                            </div>
                          }
                        </div>

                      </div>
                      <div className="tab-pane fade" id="notactive" role="tabpanel" aria-labelledby="notactive-tab">
                        <div>
                          {isMobile ?
                            <div>
                              {dataMobile.filter(single => single.status === CARD_STATUS_NOTACTIVE).map((card, idx) => (
                                <div key={idx}>
                                  <HomeCard
                                    id={card.id}
                                    isHit={card.isHit}
                                    type={card.type}
                                    level={card.level}
                                    avatar={card.avatar}
                                    tittle={card.tittle}
                                    price={card.price}
                                    city={card.city}
                                    endTime={card.endDate}
                                  />
                                </div>
                              ))}
                            </div>
                            :
                            <div className={classes.root}>
                              <div className={classes.row}>
                                <div className={classes.col}>
                                  {dataDesktop1.filter(single => single.status === CARD_STATUS_NOTACTIVE).map((card, idx) => (
                                    <div key={idx}>
                                      <HomeCard

id={card.id}
                                        isHit={card.isHit}
                                        type={card.type}
                                        level={card.level}
                                        avatar={card.avatar}
                                        tittle={card.tittle}
                                        price={card.price}
                                        city={card.city}
                                        endTime={card.endDate}
                                      />
                                    </div>
                                  ))}
                                </div>

                              </div>
                            </div>
                          }
                        </div>

                      </div>
                      <div className="tab-pane fade show active" id="active" role="tabpanel" aria-labelledby="active-tab">

                        <div>
                          {isMobile ?
                            <div>
                              {dataMobile.filter(single => single.status === CARD_STATUS_ACTIVE).map((card, idx) => (
                                <div key={idx}>
                                  <HomeCard
                                    id={card.id}
                                    isHit={card.isHit}
                                    type={card.type}
                                    level={card.level}
                                    avatar={card.avatar}
                                    tittle={card.tittle}
                                    price={card.price}
                                    city={card.city}
                                    endTime={card.endDate}
                                  />
                                </div>
                              ))}
                            </div>
                            :
                            <div className={classes.root}>
                              <div className={classes.row}>
                                <div className={classes.col}>
                                  {dataDesktop1.filter(single => single.status === CARD_STATUS_ACTIVE).map((card, idx) => (
                                    <div key={idx}>
                                    {console.log(card)}
                                      <HomeCard

id={card.id}
                                        isHit={card.isHit}
                                        type={card.type}
                                        level={card.level}
                                        avatar={card.avatar}
                                        tittle={card.tittle}
                                        price={card.price}
                                        city={card.city}
                                        endTime={card.endDate}
                                      />
                                    </div>
                                  ))}
                                </div>

                              </div>
                            </div>
                          }
                        </div>



                      </div>
                      <div className="tab-pane fade" id="ended" role="tabpanel" aria-labelledby="ended-tab">
                        <div>
                          {isMobile ?
                            <div>
                              {dataMobile.filter(single => single.status === CARD_STATUS_ENDED).map((card, idx) => (
                                <div key={idx}>
                                  <HomeCard
                                    id={card.id}
                                    isHit={card.isHit}
                                    type={card.type}
                                    level={card.level}
                                    avatar={card.avatar}
                                    tittle={card.tittle}
                                    price={card.price}
                                    city={card.city}
                                    endTime={card.endDate}
                                  />
                                </div>
                              ))}
                            </div>
                            :
                            <div className={classes.root}>
                              <div className={classes.row}>
                                <div className={classes.col}>
                                  {dataDesktop1.filter(single => single.status === CARD_STATUS_ENDED).map((card, idx) => (
                                    <div key={idx}>
                                      <HomeCard

id={card.id}
                                        isHit={card.isHit}
                                        type={card.type}
                                        level={card.level}
                                        avatar={card.avatar}
                                        tittle={card.tittle}
                                        price={card.price}
                                        city={card.city}
                                        endTime={card.endDate}
                                      />
                                    </div>
                                  ))}
                                </div>

                              </div>
                            </div>
                          }
                        </div>


                      </div>
                      <div className="tab-pane fade" id="archive" role="tabpanel" aria-labelledby="archive-tab">
                        <div>
                          {isMobile ?
                            <div>
                              {dataMobile.filter(single => single.status === CARD_STATUS_ARCHIVE).map((card, idx) => (
                                <div key={idx}>
                                  <HomeCard
                                    id={card.id}
                                    isHit={card.isHit}
                                    type={card.type}
                                    level={card.level}
                                    avatar={card.avatar}
                                    tittle={card.tittle}
                                    price={card.price}
                                    city={card.city}
                                    endTime={card.endDate}
                                  />
                                </div>
                              ))}
                            </div>
                            :
                            <div className={classes.root}>
                              <div className={classes.row}>
                                <div className={classes.col}>
                                  {dataDesktop1.filter(single => single.status === CARD_STATUS_ARCHIVE).map((card, idx) => (
                                    <div key={idx}>
                                      <HomeCard

id={card.id}
                                        isHit={card.isHit}
                                        type={card.type}
                                        level={card.level}
                                        avatar={card.avatar}
                                        tittle={card.tittle}
                                        price={card.price}
                                        city={card.city}
                                        endTime={card.endDate}
                                      />
                                    </div>
                                  ))}
                                </div>

                              </div>
                            </div>
                          }
                        </div>

                      </div>
                    </div>

                  </div>
                  <div className="tab-pane fade" id="v-pills-observe" role="tabpanel" aria-labelledby="v-pills-observe-tab">...</div>
                  <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">...</div>
                  <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">...</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

