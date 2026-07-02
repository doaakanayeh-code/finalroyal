import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

// ضعي هون رابط السيرفر الحقيقي عندك (Laravel)
const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:8000",
  withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
  const token = cookies.get("Bearer"); // تأكدي أن اسم الكوكيز عندك هو "Bearer" فعلاً
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;