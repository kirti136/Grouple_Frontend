import { useState } from "react";
import PropTypes from "prop-types";

function Login({ socket }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = () => {
    socket.emit("loginData", formData);

    socket.on("loginSuccess", (data) => {
      console.log("LOGIN SUCCESS", data);

      // Store the token in a cookie
      document.cookie = `token=${data.token}; max-age=3600`; // Expires after 1 hour
    });

    socket.on("loginError", (data) => {
      console.error(data.error);
    });
  };

  return (
    <>
      <h1>Login</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <input
          type="text"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInput}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleInput}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
    </>
  );
}

Login.propTypes = {
  socket: PropTypes.object.isRequired,
};

export default Login;
