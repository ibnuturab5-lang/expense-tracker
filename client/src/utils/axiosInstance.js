import axios from "axios";
const API_BASE_URL="https://glowing-space-zebra-7vjxq7jrpj44cxq47-8080.app.github.dev"
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});
axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosInstance;
