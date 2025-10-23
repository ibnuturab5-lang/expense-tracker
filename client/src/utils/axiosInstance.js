import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://friendly-adventure-5g796v74x6g7hvgg-8080.app.github.dev",
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
