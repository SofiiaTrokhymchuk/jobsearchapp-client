import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
});

instance.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export default instance;
