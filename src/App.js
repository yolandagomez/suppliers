import logo from './pngwing.com.png';
import './App.css';
import { Link } from "react-router-dom";
import Login, { Register } from "./pages/Login";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>SUPPLIERS</h1>
        <h3>Documentation Control</h3>
        {/* <a
          className="App-link"
          href="/register"
          target="_blank"
          rel="noopener noreferrer"
        >
          Register
        </a> */}
        <a to="/" component={Register}>Register</a>
        <p>Already suscribed? <a href="/login">Log in</a></p>
      </header>
    </div>
  );
}

export default App;
