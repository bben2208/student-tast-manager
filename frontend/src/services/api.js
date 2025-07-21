// frontend/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://student-tast-manager.onrender.com/api",
  withCredentials: true,
});

export default api;
