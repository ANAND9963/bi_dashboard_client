// src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080", // ✅ Change to your backend URL
  timeout: 10000,                   // Optional: 10s timeout
  headers: {
    "Content-Type": "application/json",
    // Add auth headers here if needed later
  },
});

export default axiosInstance;
