import axios from "axios";

export const baseUrl = "http://127.0.0.1:8000";
let apiBaseUrl = `/api`;

export const instance = axios.create({
  baseURL: `${apiBaseUrl}`,
});

instance.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    config.headers["Authorization"] = `Bearer ${user.token}`;
  }
  return config;
});
