import React, { useState } from "react";

import { fetchWeather } from "./api/fetchWeather";
import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [listening, setListening] = useState(false);
  window.addEventListener("online", () => alert("Became online"));
  window.addEventListener("offline", () => alert("Became offline"));
  window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new window.SpeechRecognition();
  recognition.interimResults = false;
  recognition.addEventListener("result", (e) => {
    // console.log(e.results[0]);
    setQuery(e.results[0][0].transcript);
  });

  recognition.addEventListener("end", (e) => {
    console.log(e);
    setListening(false);
  });
  const handleOnClick = () => {
    if (!listening) {
      recognition.start();
      setListening(true);
    }
  };
  return (
    <div className="main-container">
      <button onClick={handleOnClick}>
        {listening ? "Listening" : "Start"}
      </button>
      <p>You said: {query}</p>
    </div>
  );
};

export default App;
