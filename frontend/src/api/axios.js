import axios from "axios";

const api = axios.create({
  baseURL: "https://foodiehub-6l84.onrender.com",
  withCredentials: true,
});

export default api;
