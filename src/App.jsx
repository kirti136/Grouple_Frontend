import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signin from "./pages/Signup";
import io from "socket.io-client";
import Booking from "./pages/Booking";

const socket = io("localhost:3000");

function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul style={{ display: "flex", listStyleType: "none", padding: 0 }}>
          <li style={{ marginRight: "10px" }}>
            <Link to="/">Register</Link>
          </li>
          <li style={{ marginRight: "10px" }}>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/booking">Booking</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route exact path="/" element={<Signin socket={socket} />} />
        <Route exact path="/login" element={<Login socket={socket} />} />
        <Route exact path="/booking" element={<Booking socket={socket} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
