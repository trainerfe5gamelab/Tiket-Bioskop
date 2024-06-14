import axios from "axios";
import jwtDecode from "jwt-decode";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
});

const checkTokenExpiration = (token) => {
  const decoded = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Token is expired
    localStorage.removeItem("token");
    window.location.href = "/login"; // Redirect to login page
  }
};

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      checkTokenExpiration(token);
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
