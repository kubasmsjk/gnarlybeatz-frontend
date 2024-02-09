import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const axiosNoAuth = axios.create({
  baseURL: BASE_URL,
});

export const axiosAuth = axios.create({
  baseURL: BASE_URL,
});

export default axiosNoAuth;
