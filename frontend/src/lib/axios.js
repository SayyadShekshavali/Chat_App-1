import axios from "axios";
const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001/api"
    : "https://chat-app-1-3tjs.onrender.com/api";
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
