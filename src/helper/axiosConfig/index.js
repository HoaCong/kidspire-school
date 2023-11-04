import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // Xử lý lỗi 401 ở đây (nếu cần)
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
