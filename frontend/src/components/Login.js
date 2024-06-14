import React, { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate, useLocation } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { login } from "../services/auth";

function Login() {
  const navigate = useNavigate();
  const location = useLocation(); // Use useLocation to get state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/"); // Redirect to home or dashboard if the user is already logged in
    }

    // Check if there's a success message from registration
    if (location.state && location.state.successMessage) {
      setSuccessMessage(location.state.successMessage);
    }
  }, [navigate, location.state]);

  const handleSignupClick = () => {
    navigate("/Register");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError("Email dan password harus diisi");
      return;
    }
    const response = await login({ email, password });
    if (response.token) {
      navigate("/"); // Redirect to home or dashboard after successful login
    } else {
      setError("Login gagal. Silakan periksa email dan password Anda.");
    }
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="login template d-flex justify-content-center align-items-center vh-100 text-dark">
      <div className="form-container p-5 rounded position-relative">
        <FaTimes
          className="close-icon position-absolute top-0 end-0 m-3"
          size={24}
          onClick={handleClose}
        />
        <form onSubmit={handleSubmit}>
          <h3 className="text-center">Sign In</h3>

          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}

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
              Sign In
            </button>
          </div>
          {error && <div className="text-danger mt-2">{error}</div>}
          <p className="text-end mt-2">
            Belum Punya Akun?
            <button onClick={handleSignupClick} className="ms-2 btn btn-link">
              Sign Up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
