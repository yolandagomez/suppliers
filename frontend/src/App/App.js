import React from "react";

import logo from '../pngwing.com.png';
import './App.css';
import { Link } from "react-router-dom";
import Suppliers from "../pages/Suppliers/Suppliers";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="log" />
        <h1>SUPPLIERS</h1>
        <h3>Documentation Control</h3>
        <a
          className="App-link"
          href="/Suppliers"
          target="_blank"
          rel="noopener noreferrer"
        >
          Start here
        </a>
        {/* <a to="/" component={Register}>Register</a> */}
        {/* <p>Start here <a to="/suppliers" component={Suppliers}>Log in</a></p> */}
      </header>
    </div>
  );
}

export default App;
