import axios from "axios";

let apiBaseUrl = "http://127.0.0.1:8000/api";

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
