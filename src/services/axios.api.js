import axios from "axios";

  // const isProd = Boolean(import.meta.env.VITE_IS_PROD);
  // const configuredBase = import.meta.env.VITE_SERVER_URI;
  // const baseURL = configuredBase ?? (isProd ? window.location.origin : "http://localhost:8000");
const baseURL = "http://localhost:8000";
const api = axios.create({
  baseURL,
  withCredentials: true,
});

export default api;
