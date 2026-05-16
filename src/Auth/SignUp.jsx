import { useContext, useState } from "react";
import axios from "axios";
import { User } from "../Context/UserContext";
import Cookies from "universal-cookie";
import "./Register.css";

export default function Register({ switchToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [accept, setAccept] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const cookie = new Cookies();
  const user = useContext(User);

  async function Submit(e) {
    e.preventDefault();
    setAccept(true);

    try {
      let res = await axios.post("http://127.0.0.1:8000/api/register", {
        name: name,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
      });

      const token = res.data.data.token;
      cookie.set("Bearer", token);

      const userDetails = res.data.data.user;

      user.setAuth({ token, userDetails });

      // بعد التسجيل
      window.location.href = "/dashboard";
    } catch (err) {
      if (err.response.status === 422) {
        setEmailError(true);
      }
    }
  }

  return (
    <div className="register login">
      <form onSubmit={Submit}>
        {/* Name */}
        <label>Name</label>

        <div className="input-box">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {name.length < 2 && accept && (
          <p className="error">Name must be more than 2 Char</p>
        )}

        {/* Email */}
        <label>Email</label>

        <div className="input-box">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {accept && emailError && (
          <p className="error">Email is already taken</p>
        )}

        {/* Password */}
        <label>Password</label>

        <div className="input-box">
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {password.length < 8 && accept && (
          <p className="error">Password must be more than 8 Char</p>
        )}

        {/* Confirm Password */}
        <label>Confirm Password</label>

        <div className="input-box">
          <input
            type="password"
            placeholder="Confirm password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </div>

        {passwordConfirmation !== password && accept && (
          <p className="error">Passwords do not match</p>
        )}

        {/* Register Button */}
        <button type="submit" className="register-btn">
          Register
        </button>

        {/* Switch To Login */}
        <div className="switch-auth">
          <span style={{ color: "#777" }}>Already have an account?</span>

          <span
            onClick={switchToLogin}
            style={{
              color: "#d48b8b",
              fontWeight: "600",
              marginLeft: "5px",
              cursor: "pointer",
            }}
          >
            Login
          </span>
        </div>
      </form>
    </div>
  );
}
