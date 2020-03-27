import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import ReactTooltip from "react-tooltip";
import MapChart from "./MapChart";

function App() {
  const [content, setContent] = useState("");
  return (
    <div className="App">
      <h1 color>COVID-19 INDIA TRACKER</h1>
      <p>Created by Krishnendu Sudheesh</p>
      <div style={{ overflow: "hidden" }}>
        <MapChart setTooltipContent={setContent} />
        <ReactTooltip multiline={true}>{content}</ReactTooltip>
      </div>
      <h1>end</h1>>
    </div>
  );
}

export default App;
