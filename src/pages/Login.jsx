import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authcontext.jsx";
// import { useAuth } from "../context/authContext.jxs";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password,
        }
      );
      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      }
      // alert("Successfully Login");
    } catch (error) {
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error);
      } else {
        setError("Server Error");
      }
    }
  };

  return (
    <div
      className="flex flex-col items-center h-screen justify-center bg-gradient-to-b"
      style={{
        backgroundImage: "linear-gradient(to bottom, #0d9488 50%, #ffffff 50%)",
      }}
    >
      <h2 className="text-3xl text-white font-sevillana">
        Employee Management System
      </h2>
      <div>
        <h2 className="text-2xl font-bold mb-4">Login</h2>
      </div>
      {error && <p className=" error ">{error}</p>}
      <form className="form" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="email"
          ></input>
        </div>
        <div>
          <label htmlFor="Password" className="label">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            className="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
          <div>
            <label>
              <input type="checkbox" className="form-checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#" className="forgotPassword text-gray-600">
              Forgot password
            </a>
          </div>
        </div>
        <div className="buttonDiv">
          <button className="loginButton">Login</button>
        </div>
      </form>
    </div>
  );
};
export default Login;
