import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import "./Signup.css";
import { Register } from "../services/auth";

function Signup() {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [no_telp, setNoTelp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Redirect to home if already logged in
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  const handleSigninClick = () => {
    navigate("/Sign");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username === "" || email === "" || password === "" || no_telp === "") {
      setError("Please fill in all fields.");
    } else {
      const { success, message, error } = await Register(
        username,
        email,
        no_telp,
        password
      );
      if (success) {
        setSuccessMessage(message);
        navigate("/Sign", { state: { successMessage: message } });
      } else {
        setError(error || "Registration failed. Please try again.");
      }
    }
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="signup template d-flex justify-content-center align-items-center text-dark">
      <div className="form-container p-5 rounded bg-white position-relative">
        <FaTimes
          className="close-icon position-absolute top-0 end-0 m-3"
          size={24}
          onClick={handleClose}
        />
        <form onSubmit={handleSubmit}>
          <h3 className="text-center">Sign Up</h3>

          <div className="mb-3">
            <label htmlFor="username">
              Username<span className="required">*</span>
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-person-fill"></i>
              </span>
              <input
                type="text"
                id="username"
                placeholder="Enter Username"
                className="form-control"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="no_telp">
              Phone<span className="required">*</span>
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-telephone-fill"></i>
              </span>
              <input
                type="text"
                id="no_telp"
                placeholder="Enter Phone Number"
                className="form-control"
                value={no_telp}
                onChange={(e) => setNoTelp(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              Email <span className="required">*</span>
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-envelope-fill"></i>
              </span>
              <input
                type="email"
                id="email"
                placeholder="Enter Email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              Password <span className="required">*</span>
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-lock-fill"></i>
              </span>
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="d-grid">
            <button className="btn btn-primary" type="submit">
              Sign Up
            </button>
          </div>
          {error && <div className="text-danger mt-2">{error}</div>}
          <p className="text-end mt-2">
            Already Registered?{" "}
            <button onClick={handleSigninClick} className="ms-2 btn btn-link">
              Sign In
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
