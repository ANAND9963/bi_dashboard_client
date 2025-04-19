// src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://5bf1-2603-8080-a900-8b50-1b6-61ed-b176-9ac6.ngrok-free.app", // ✅ Change to your backend URL
  timeout: 10000,                   // Optional: 10s timeout
  headers: {
    "Content-Type": "application/json",
    // Add auth headers here if needed later
  },
});

export default axiosInstance;
