import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/planets');
        if (!response.ok) {
          throw new Error("Data could not be fetched!");
        }
        const json_response = await response.json();
        setData(json_response); // assign JSON response to the data variable.
      } catch (error) {
        console.error("Error fetching planets:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Router>
        <div>
          <h1>Star Wars Universe Lookup</h1>
          <label>
            Who you looking for?{" "}
            <span>(Regular expressions are cool here)</span>
          </label>
          <input

          />
        </div>
      </Router>
    </>
  );
}

export default App;
