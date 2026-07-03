import axios from "axios";

const api = axios.create({
  baseURL: "/api", // Assuming your API is at /api
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
