import React, { useState, useEffect } from "react";
import axios from "axios";
import HomeCard from "../conteiners/HomeCard";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
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
  },
});

function App() {
  const [dataMobile, setDataMobile] = useState([]);
  const [dataDesktop1, setDataDesktop1] = useState([]);
  const [dataDesktop2, setDataDesktop2] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    fetchData();
    window.addEventListener("resize", handleResize);
    handleResize();
  }, []);

  useEffect(() => {
    prepareData();
  }, [dataMobile]);

  async function fetchData() {
    await axios.get("http://localhost:3001/cards/NewestCards/3").then((res) => {
      setDataMobile(res.data);
    });
  }

  function handleResize() {
    if (window.innerWidth <= 1020) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }

  function prepareData() {
    var data1 = [],
      data2 = [],
      i = 0;
    dataMobile.forEach((data) => {
      if (i % 2 === 0) {
        data1.push(data);
      } else {
        data2.push(data);
      }
      i++;
    });
    setDataDesktop1(data1);
    setDataDesktop2(data2);
  }

  return isMobile ? (
    <div className={classes.root}>
      {dataMobile.map((card) => (
        <HomeCard
        type={card.type}
          level={card.level}
          avatar={card.avatar}
          subject={card.subject}
          price={card.price}
          city={card.city}
          endTime={card.endDate}
          />
      ))}
    </div>
  ) : (
    <div className={classes.root}>
      <div className={classes.row}>
        <div className={classes.col}>
          {dataDesktop1.map((card) => (
            <HomeCard
            type={card.type}
            level={card.level}
            avatar={card.avatar}
              subject={card.subject}
              price={card.price}
              city={card.city}
              endTime={card.endDate}
              />
          ))}
        </div>
        <div className={classes.col}>
          {dataDesktop2.map((card) => (
            <HomeCard
            type={card.type}
            level={card.level}
            avatar={card.avatar}
              subject={card.subject}
              price={card.price}
              city={card.city}
              endTime={card.endDate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
