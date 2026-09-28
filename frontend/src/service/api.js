import axios from "axios";

// Buat instance Axios dengan Base URL backend
const API = axios.create({
  baseURL: "http://localhost:5000",
});

// Interceptor: Menyesuaikan header Authorization secara otomatis
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default API;
