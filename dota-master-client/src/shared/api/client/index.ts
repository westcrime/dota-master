import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_DOCKER_BACKEND_DOMAIN}/`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosInstance;
