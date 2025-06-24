import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5002/api", // ✅ matches your Express server
  withCredentials: true, // optional, only if you're using cookies or sessions
});

export default api;
