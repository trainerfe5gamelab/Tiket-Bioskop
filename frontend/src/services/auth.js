import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = "http://localhost:5000/api";

export const login = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data);
    if (response.data.status) {
      // Save token to localStorage
      localStorage.setItem("token", response.data.token);

      // Decode the token to get user information
      const decoded = jwtDecode(response.data.token);

      // Check the user's role
      if (decoded.role === "admin") {
        // Redirect to admin dashboard
        window.location.href = "/dashboard";
      } else {
        // Redirect to user dashboard or home page
        window.location.href = "/";
      }

      return response.data;
    } else {
      console.error("Failed to fetch data:", response.data.message);
      return { error: response.data.message };
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return { error: "Network error" };
  }
};

export const Register = async (username, email, no_telp, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      email,
      no_telp,
      password,
    });

    if (response.data.status) {
      return { success: true, message: response.data.message };
    } else {
      return { success: false, error: response.data.message };
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Network error";
    return { success: false, error: errorMessage };
  }
};

export const getUser = (token) => {
  const decoded = jwtDecode(token);
  return decoded;
};
export const getUserAdmin = (token) => {
  const decoded = jwtDecode(token);
  return decoded;
};
