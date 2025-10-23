import axios from "axios";
const API_BASE_URL="https://expense-tracker-eu7d.onrender.com" || "https://friendly-adventure-5g796v74x6g7hvgg-8080.app.github.dev"
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
