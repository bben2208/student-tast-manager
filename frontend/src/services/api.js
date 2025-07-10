import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true, // ✅ required if backend CORS allows credentials
});

export default api;
