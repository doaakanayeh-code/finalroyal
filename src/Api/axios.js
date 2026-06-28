import axios from "axios";
const basurl = "http://localhost:8000/api";
import cookie from "cookie-universal";

const cookies = cookie();

// جلب التوكن من الكوكي
const token = cookies.get("Bearer");

// إنشاء instance من axios
export const Axios = axios.create({
  baseURL: basurl,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});