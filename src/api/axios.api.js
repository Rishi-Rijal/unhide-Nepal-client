import axios from "axios";

const baseURL = "https://unhide-nepal-server-gdfeb5g8dehrfedg.germanywestcentral-01.azurewebsites.net/";

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default api;
