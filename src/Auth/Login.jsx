import { useContext, useState } from "react";
import axios from "axios";

import { User } from "../Context/UserContext";
import Cookies from "universal-cookie";

import "./Login.css";

import { Link } from "react-router-dom";

export default function Login({ switchToRegister, switchToForgot }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accept, setAccept] = useState(false);
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);

  // Cookie
  const cookie = new Cookies();

  const user = useContext(User);

  async function Submit(e) {
    e.preventDefault();

    setAccept(true);

    try {
      let res = await axios.post("http://127.0.0.1:8000/api/login", {
        email: email,
        password: password,
      });

      const token = res.data.data.token;

      cookie.set("Bearer", token);

      const userDetails = res.data.data.user;

      user.setAuth({ token, userDetails });

      window.location.href = "/dashboard";
    } catch (err) {
      if (err.response.status === 401) {
        setError(true);
      }
    }
  }

  return (
    <div className="register login">
      <form onSubmit={Submit}>
        {/* Email */}
        <label htmlFor="email">Email</label>

        <div className="input-box">
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
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

        {/* Forgot Password */}
        <div
          style={{
            textAlign: "right",
            marginBottom: "20px",
          }}
        >
          <span onClick={switchToForgot} className="forgot">
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

        {/* Social */}
        <div className="social">
<a href={`http://127.0.0.1:8000/auth/google/redirect`}>
            <i className="fa-brands fa-google"></i>

            <span>Sign in with</span>
          </a>

          <button type="button" className="social-btn">
            <i className="fa-brands fa-apple"></i>

            <span>Sign in with</span>
          </button>
        </div>

        {/* Switch To Register */}
        <div
          style={{
            textAlign: "center",
            marginTop: "15px",
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
