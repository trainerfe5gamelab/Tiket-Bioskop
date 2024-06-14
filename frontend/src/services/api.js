import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const fetchMovies = async () => {
  try {
    const response = await axios.get(`${API_URL}/movie`);
    if (response.data.status) {
      return response.data.movies;
    } else {
      console.error("Failed to fetch data:", response.data.message);
      return [];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const fetchPromo = async () => {
  try {
    const response = await axios.get(`${API_URL}/promotion`);
    if (response.data.status) {
      return response.data.promotions;
    } else {
      console.error("Failed to fetch data:", response.data.message);
      return [];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const fetchTransactions = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/transaction/get`, {
      params: { userId: userId },
    });
    if (response.data.status) {
      return response.data.transactions.transaction;
    } else {
      console.error("Failed to fetch data:", response.data.message);
      return [];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const getById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/movie/${id}`);
    if (response.data.status) {
      return response.data.movies;
    } else {
      console.error("Failed to fetch data:", response.data.message);
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export const reviewPost = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/vote/create`, data);
    if (response.data.status) {
      // Simpan token ke localStorage
      localStorage.setItem("token", response.data.token);
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
export const createTransaction = async (orderData) => {
  const response = await axios.post("/api/transaction", orderData);
  return response.data.token;
};
