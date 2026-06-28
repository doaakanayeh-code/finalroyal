import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { User } from "../Context/UserContext";
import Cookies from "universal-cookie";
import "../Css/Register.css";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Register({ switchToLogin, handleCloseModal }) {
  const { type } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [identifier, setIdentifier] = useState(""); 
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  
  const [role, setRole] = useState(type === "provider" ? "provider" : "user"); 
  const [idFront, setIdFront] = useState(null);
  const [idBack, setIdBack] = useState(null);
  const [accept, setAccept] = useState(false);

  const [loading, setLoading] = useState(false); 
  const [errorMessage, setErrorMessage] = useState("");
  const [waitingForVerification, setWaitingForVerification] = useState(false); 

  const cookie = new Cookies();
  const user = useContext(User);

  useEffect(() => {
    setRole(type === "provider" ? "provider" : "user");
  }, [type]);

  const validateForm = () => {
    setErrorMessage("");
    const trimmedIdentifier = identifier.trim();

    if (!name.trim()) {
      setErrorMessage("الرجاء إدخال الاسم");
      return false;
    }
    if (name.trim().length < 2) {
      setErrorMessage("يجب أن يكون الاسم أكثر من حرفين");
      return false;
    }
    if (!trimmedIdentifier) {
      setErrorMessage("الرجاء إدخال البريد الإلكتروني أو رقم الهاتف");
      return false;
    }

    const isNumeric = /^\d+$/.test(trimmedIdentifier);
    if (!isNumeric) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedIdentifier)) {
        setErrorMessage("الرجاء إدخال بريد إلكتروني صحيح أو رقم هاتف صحيح");
        return false;
      }
    }

    if (!idFront || !idBack) {
      setErrorMessage("الرجاء رفع صور الهوية الأمامية والخلفية للتحقق");
      return false;
    }

    if (password.length < 8) {
      setErrorMessage("يجب أن تكون كلمة المرور 8 محارف على الأقل");
      return false;
    }
    if (password !== passwordConfirmation) {
      setErrorMessage("كلمتا المرور غير متطابقتين");
      return false;
    }

    return true;
  };

  const onCloseClick = () => {
    if (handleCloseModal) {
      handleCloseModal(); 
    } else if (switchToLogin) {
      navigate("/"); 
      window.location.reload(); 
    } else {
      navigate(-1); 
    }
  };

  async function Submit(e) {
    e.preventDefault();
    setAccept(true);
    setErrorMessage(""); 

    // للتأكد في الـ Console أن الكود تم تنفيذه عند الضغط
    console.log("Submit triggered. Validating form...");

    if (!validateForm()) {
      console.log("Validation failed. Request stopped.");
      return;
    }

    console.log("Validation passed! Sending data to backend...");

    const formData = new FormData();
    formData.append("username", name.trim());
    formData.append("identifier", identifier.trim());
    formData.append("password", password);
    formData.append("password_confirmation", passwordConfirmation);
    formData.append("role", role); 
    
    if (idFront) formData.append("id_img_front", idFront);
    if (idBack) formData.append("id_img_back", idBack);

    setLoading(true); 
    const registrationToast = toast.loading("جاري إنشاء الحساب وإرسال رابط التفعيل...");

    try {
      let res = await axios.post("http://127.0.0.1:8000/api/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.dismiss(registrationToast);

      const token = res.data.token; 
      cookie.set("Bearer", token);

      const userDetails = res.data.user;
      if (user && typeof user.setAuth === "function") {
        user.setAuth({ token, userDetails });
      }

      toast.success("تم إرسال رابط التفعيل إلى بريدك الإلكتروني بنجاح! يرجى الضغط عليه لتفعيل الحساب.", {
        duration: 8000, 
      });

      setWaitingForVerification(true);

    } catch (err) {
      setLoading(false); 
      toast.dismiss(registrationToast);
      console.error("Registration Error Details:", err);
      
      if (err.response) {
        if (err.response.data && err.response.data.message) {
          setErrorMessage(err.response.data.message);
        } else if (err.response.status === 422) {
          setErrorMessage("البريد الإلكتروني أو الهاتف مستخدم بالفعل، أو البيانات غير صالحة");
        } else {
          setErrorMessage("حدث خطأ أثناء معالجة الهوية، يرجى التأكد من وضوح الصورة");
        }
      } else {
        setErrorMessage("تعذر الاتصال بالسيرفر، يرجى التحقق من الشبكة");
      }
    }
  }

  return (
    <div className={`register login ${role === "provider" ? "provider-mode" : ""}`}>
      <form onSubmit={Submit} noValidate>
        
        <button 
          type="button" 
          className="close-modal-btn" 
          onClick={onCloseClick}
          disabled={loading}
        >
          ×
        </button>

        <div style={{ textAlign: "center", marginBottom: "15px" }}>
          <h2 style={{ color: "#111827", fontSize: "1.4rem", fontWeight: "700" }}>
            {role === "provider" ? "Register as Provider" : "Create New Account"}
          </h2>
        </div>

        {/* 🌟 تم تعديل وإصلاح حقل الاسم هنا ليصبح نظيفاً بسطر واحد للـ onChange */}
        <label className="field-label">Name</label>
        <div className="input-box">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            disabled={loading}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <label className="field-label">Email or Phone</label>
        <div className="input-box">
          <input
            type="text"
            placeholder="Enter your email or phone number"
            value={identifier}
            disabled={loading}
            onChange={(e) => setIdentifier(e.target.value)}
          />
        </div>

        <div className="provider-fields-animation">
          <div className="provider-fields-container">
            
            <div className="upload-field-wrapper">
              <label className="field-label">ID Front Image</label>
              <div className="upload-container">
                <input 
                  type="file" 
                  id="idFrontInput" 
                  accept="image/*" 
                  disabled={loading}
                  onChange={(e) => setIdFront(e.target.files[0])} 
                  className="hidden-file-input"
                />
                <label htmlFor="idFrontInput" className="file-upload-box" style={{ opacity: loading ? 0.6 : 1 }}>
                  <i className="fa-solid fa-cloud-arrow-up upload-icon"></i>
                  <span className="upload-title">ID Front Image</span>
                  <span className="upload-subtitle">
                    {idFront ? `Selected: ${idFront.name}` : "Upload Photo"}
                  </span>
                </label>
              </div>
            </div>

            <div className="upload-field-wrapper">
              <label className="field-label">ID Back Image</label>
              <div className="upload-container">
                <input 
                  type="file" 
                  id="idBackInput" 
                  accept="image/*" 
                  disabled={loading}
                  onChange={(e) => setIdBack(e.target.files[0])} 
                  className="hidden-file-input"
                />
                <label htmlFor="idBackInput" className="file-upload-box" style={{ opacity: loading ? 0.6 : 1 }}>
                  <i className="fa-solid fa-cloud-arrow-up upload-icon"></i>
                  <span className="upload-title">ID Back Image</span>
                  <span className="upload-subtitle">
                    {idBack ? `Selected: ${idBack.name}` : "Upload Photo"}
                  </span>
                </label>
              </div>
            </div>

          </div>
        </div>

        <label className="field-label">Password</label>
        <div className="input-box">
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            disabled={loading}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <label className="field-label">Confirm Password</label>
        <div className="input-box">
          <input
            type="password"
            placeholder="Confirm password"
            value={passwordConfirmation}
            disabled={loading}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </div>

        {errorMessage && (
          <div className="error-message-banner" style={{ marginTop: "5px", marginBottom: "10px" }}>
            <i className="fa-solid fa-circle-exclamation" style={{ marginLeft: "8px" }}></i>
            {errorMessage}
          </div>
        )}

        <button type="submit" className="register-btn" disabled={loading}>
          {waitingForVerification ? (
            <>
              <i className="fa-solid fa-spinner fa-spin" style={{ marginLeft: "8px" }}></i>
              بانتظار تفعيل الرابط من الإيميل...
            </>
          ) : loading ? (
            "جاري معالجة البيانات..."
          ) : (
            "Register"
          )}
        </button>

        <div className="switch-auth">
          <span style={{ color: "#777" }}>Already have an account?</span>
          <span 
            onClick={() => !loading && switchToLogin()} 
            style={{ 
              color: "#d48b8b", 
              fontWeight: "600", 
              marginLeft: "5px", 
              cursor: loading ? "not-allowed" : "pointer" 
            }}
          >
            Login
          </span>
        </div>
      </form>
    </div>
  );
}