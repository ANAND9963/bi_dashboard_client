// src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://7c05-67-84-52-101.ngrok-free.app", // ✅ Change to your backend URL
  timeout: 10000,                   // Optional: 10s timeout
  headers: {
    "Content-Type": "application/json",
    // Add auth headers here if needed later
  },
});

export default axiosInstance;
