import axios from "axios";
export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const instance_token = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

instance_token.interceptors.request.use((config) => {
  let token = JSON.parse(localStorage.getItem("access_token"));
  config.headers["Authorization"] = "Bearer " + token;
  return config;
});
