import axios from "axios";
import queryString from "query-string";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const axiosClient = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
		"content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
	const token = cookies.get("token", { path: "/" });
	if (token) config.headers.Authorization = `Bear ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);
export default axiosClient;