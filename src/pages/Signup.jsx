import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function Signin({ socket }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [crudData, setCrudData] = useState([]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    socket.emit("registerUser", formData);
  };

  useEffect(() => {
    socket.emit("requestAllUsers");
    socket.on("allUsers", (alldata) => {
      setCrudData(alldata);
    });

    socket.on("userCreated", (user) => {
      socket.emit("requestAllUsers");
      console.log("USER CREATED", user);
    });

    socket.on("validationError", (err) => {
      console.log("validation error:", err);
    });

    socket.on("usersFetchError", (error) => {
      console.log("Error fetching users:", error.error);
    });

    socket.on("userCreationError", (error) => {
      console.log("Error creating user:", error.error);
    });

    return () => {
      // Clean up event listeners when component unmounts
      socket.off("allUsers");
      socket.off("userCreated");
      socket.off("userCreationError");
      socket.off("requestAllUsers");
      socket.off("validationError");
      socket.off("usersFetchError");
    };
  }, []);

  return (
    <>
      <h1>Register</h1>
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
          name="username"
          placeholder="Enter your username"
          value={formData.username}
          onChange={handleInput}
        />
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
      <button onClick={handleSubmit}>Add Data</button>

      <h2>User Data</h2>
      <div>
        <table border={1}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {crudData.map((data, index) => (
              <tr key={index}>
                <td>{data.id}</td>
                <td>{data.username}</td>
                <td>{data.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

Signin.propTypes = {
  socket: PropTypes.object.isRequired,
};

export default Signin;
