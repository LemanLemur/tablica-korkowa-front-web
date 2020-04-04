import React, { useState, useEffect } from "react";
import axios from "axios";
import HomeCard from '../conteiners/HomeCrard';

function App() {
  const [data, setData] = useState([]);
  const [subject, setSubject] = useState(null);

  useEffect(() => {
    fetchData()
  });

  function fetchData() {
    axios.get("http://localhost:3001/cards").then(res => {
      const data = res.data;
      setData(data);
      setSubject(data[0].name);
      console.log(data);
    });
  }

  function handleChange(e) {
    setSubject(e.target.value);
  }

  return (
    <div>
      <HomeCard/>
    </div>
  );
}

export default App;
