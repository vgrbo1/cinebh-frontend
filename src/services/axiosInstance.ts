import axios from "axios";
import Cookie from "js-cookie";
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const xsrfToken = Cookie.get("XSRF-TOKEN");
  if (xsrfToken) {
    config.headers["X-XSRF-TOKEN"] = xsrfToken;
  }
  return config;
});

export default axiosInstance;
