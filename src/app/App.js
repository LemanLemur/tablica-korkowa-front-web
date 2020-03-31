import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [subject, setSubject] = useState(null);

  useEffect(() => {
    fetchData()
  });

  function fetchData() {
    // axios.get("http://localhost:3001/subjects").then(res => {
    //   const data = res.data;
    //   setData(data);
    //   setSubject(data[0].name);
    // });
  }

  function handleChange(e) {
    setSubject(e.target.value);
  }

  return (
    // <div className="App">
      <header className="App-header">
        <button className="App-button font-div" onClick={""}>
          Okey
        </button>
        <div className="font-div">Wybierz przedmiot:</div>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={subject}
          onChange={e => handleChange(e)}
          label="Przedmiot"
          style={{width: "150px"}}
        >
          {data.map(subject => (
            <MenuItem value={subject.name}>{subject.name}</MenuItem>
          ))}
        </Select>
      </header>
    // </div>
  );
}

export default App;
