import axios, { AxiosResponse } from "axios";
import Cookie from "js-cookie";
import { useAuthStore } from "../store/useAuthStore";
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
  withCredentials: true,
});

let refreshingToken: Promise<AxiosResponse<void>> | null = null;

axiosInstance.interceptors.request.use((config) => {
  const xsrfToken = Cookie.get("XSRF-TOKEN");
  if (xsrfToken) {
    config.headers["X-XSRF-TOKEN"] = xsrfToken;
  }
  return config;
});

function refreshToken(): Promise<AxiosResponse<void>> {
  return axiosInstance.post("/api/public/auth/refresh");
}

axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  async (error): Promise<unknown> => {
    const config = error.config;

    if (error.response?.status === 403 && !config._retry) {
      config._retry = true;
      try {
        refreshingToken = refreshingToken || refreshToken();
        await refreshingToken;
        refreshingToken = null;
        return axiosInstance(config);
      } catch (err) {
        refreshingToken = null;
        useAuthStore.getState().logout();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
export default axiosInstance;
