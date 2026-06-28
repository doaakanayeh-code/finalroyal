import { useContext, useState } from "react";
import axios from "axios";

import { User } from "../Context/UserContext";
import Cookies from "universal-cookie";

import "../Css/Login.css";

import { useNavigate } from "react-router-dom"; // استيراد useNavigate للتوجيه السلس

export default function Login({ switchToRegister, switchToForgot }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accept, setAccept] = useState(false);
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);

  // Cookie & Context & Navigation
  const navigate = useNavigate(); 
  const cookie = new Cookies();
  const user = useContext(User);

  async function Submit(e) {
    e.preventDefault();
    setAccept(true);
    setError(false); 

    try {
      let res = await axios.post("http://127.0.0.1:8000/api/login", {
        identifier: email, 
        password: password,
      });

      // طباعة الـ Response للتأكد دائماً من بنية البيانات في الـ Console
      console.log("Login Response Data:", res.data);

      // التعديل: فحص التوكن والمستخدم من داخل كائن data الراجع من السيرفر
      if (res.data && res.data.data && res.data.data.token) {
        const token = res.data.data.token;
        const userDetails = res.data.data.user;

        // حفظ التوكن في الكوكيز للموقع بالكامل
        cookie.set("Bearer", token, { path: "/" });

        if (user && typeof user.setAuth === "function") {
          user.setAuth({ token, userDetails });
        }

        // التوجيه إلى صفحة الخدمات
        navigate("/services");
      }

    } catch (err) {
      console.error("Login Error Details:", err);

      if (err.response) {
        setError(true);
      }
    }
  }

  return (
    <div className="register login">
      {/* noValidate لتعطيل الفحص الافتراضي للمتصفح ومنع بالون التحذير عند كتابة رقم الهاتف */}
      <form onSubmit={Submit} noValidate>
        {/* Email or Phone */}
        <label htmlFor="email">Email or Phone</label>
        <div className="input-box">
          <input
            type="text" 
            id="email"
            placeholder="Enter your email or phone number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <label htmlFor="password">Password</label>
        <div className="input-box">
          <input
            type={show ? "text" : "password"}
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <i
            className={`fa-solid ${show ? "fa-eye" : "fa-eye-slash"} eye`}
            onClick={() => setShow(!show)}
          ></i>
        </div>

        {/* Validation */}
        {password.length < 8 && accept && (
          <p className="error">Password must be more than 8 Char</p>
        )}

        <div
          style={{
            textAlign: "center",
            marginBottom: "20px",
            marginTop: "10px"
          }}
        >
          <span 
            onClick={switchToForgot} 
            className="forgot" 
            style={{ cursor: "pointer", fontSize: "14px" }}
          >
            Forgot Password?
          </span>
        </div>

        {/* Login Button */}
        <div style={{ textAlign: "center" }}>
          <button type="submit" className="login-btn">
            Login
          </button>
        </div>

        {/* Error */}
        {accept && error && <p className="error">Wrong Email Or Password</p>}

        {/* OR */}
        <div className="or">OR</div>

        <div className="social" style={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <a 
            href={`http://127.0.0.1:8000/auth/google/redirect`}
            className="google-login-link"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              width: "100%",
              padding: "12px",
              borderRadius: "25px",
              border: "1px solid #E8D0CB",
              backgroundColor: "#FFF8F6",
              color: "#4A1525",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "14px",
              boxShadow: "0 4px 10px rgba(74, 21, 37, 0.04)",
              transition: "all 0.3s ease"
            }}
          >
            <i className="fa-brands fa-google" style={{ fontSize: "16px", color: "#4A1525" }}></i>
            <span>Continue with Google</span>
          </a>
        </div>

        {/* Switch To Register */}
        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          <span
            style={{
              color: "#777",
              fontSize: "13px",
            }}
          >
            Don't have an account?
          </span>

          <span
            onClick={switchToRegister}
            style={{
              color: "#d48b8b",
              fontWeight: "600",
              marginLeft: "5px",
              cursor: "pointer",
            }}
          >
            Register
          </span>
        </div>
      </form>
    </div>
  );
}