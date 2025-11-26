import axios from "axios";

const isProd = import.meta.env.VITE_IS_PROD === 'true' ;
const baseURL = isProd ? import.meta.env.VITE_APP_API_BASE_URL : "http://localhost:5000";

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default api;
