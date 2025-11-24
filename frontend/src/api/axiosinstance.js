import axios from "axios";

// ✅ Use environment variable for both local + deployed setup
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL 
    ? `${import.meta.env.VITE_API_URL}/api`
    : "http://localhost:5000/api", // fallback for local dev
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
