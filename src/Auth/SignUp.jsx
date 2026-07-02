import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { User } from "../Context/UserContext";
import Cookies from "universal-cookie";
import "../Css/Register.css";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Register({ switchToLogin, handleCloseModal, isModal = true }) {
  const { type } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [identifier, setIdentifier] = useState(""); 
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  
  const [role, setRole] = useState(type === "provider" ? "provider" : "user"); 
  const [idFront, setIdFront] = useState(null);
  const [idBack, setIdBack] = useState(null);

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
    if (!name.trim() || name.trim().length < 2) {
      setErrorMessage("الرجاء إدخال اسم صحيح");
      return false;
    }
    if (!identifier.trim()) {
      setErrorMessage("الرجاء إدخال البريد أو الهاتف");
      return false;
    }
    if (!idFront || !idBack) {
      setErrorMessage("الرجاء رفع صور الهوية");
      return false;
    }
    if (password.length < 8) {
      setErrorMessage("كلمة المرور يجب أن تكون 8 محارف على الأقل");
      return false;
    }
    if (password !== passwordConfirmation) {
      setErrorMessage("كلمتا المرور غير متطابقتين");
      return false;
    }
    return true;
  };

  const onCloseClick = () => {
    if (handleCloseModal) handleCloseModal();
    else navigate(-1);
  };

  async function Submit(e) {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("username", name.trim());
    formData.append("identifier", identifier.trim());
    formData.append("password", password);
    formData.append("password_confirmation", passwordConfirmation);
    formData.append("role", role); 
    formData.append("id_img_front", idFront);
    formData.append("id_img_back", idBack);

    setLoading(true);
    const toastId = toast.loading("جاري إنشاء الحساب...");

    try {
      let res = await axios.post("http://127.0.0.1:8000/api/register", formData);
      toast.dismiss(toastId);
      cookie.set("Bearer", res.data.token);
      if (user?.setAuth) user.setAuth({ token: res.data.token, userDetails: res.data.user });
      toast.success("تم التسجيل بنجاح!");
      setWaitingForVerification(true);
    } catch (err) {
      setLoading(false);
      toast.dismiss(toastId);
      setErrorMessage(err.response?.data?.message || "حدث خطأ أثناء التسجيل");
    }
  }

  return (
    <div className={`register ${isModal ? "login-modal" : "login-inline"} ${role === "provider" ? "provider-mode" : ""}`}>
   <form onSubmit={Submit} noValidate>
  {isModal && (
    <button type="button" className="close-modal-btn" onClick={onCloseClick} disabled={loading}>×</button>
  )}

  {/* عنوان الصفحة - تأكد من اللون الأسود */}
  <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#111827" }}>
    {role === "provider" ? "Register as Provider" : "Create New Account"}
  </h2>

  {/* حقل الاسم */}
  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '5px' }}>Name</label>
  <div className="input-box">
    <input type="text" placeholder="Enter your name" value={name} disabled={loading} onChange={(e) => setName(e.target.value)} />
  </div>

  {/* حقل البريد */}
  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '5px' }}>Email or Phone</label>
  <div className="input-box">
    <input type="text" placeholder="Enter email or phone" value={identifier} disabled={loading} onChange={(e) => setIdentifier(e.target.value)} />
  </div>

  {/* حاوية الهوية */}
  <div className="provider-fields-container" style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
    <div className="upload-field-wrapper" style={{ flex: 1 }}>
      <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '5px' }}>ID Back Image</label>
      <input type="file" id="idBackInput" accept="image/*" onChange={(e) => setIdBack(e.target.files[0])} className="hidden-file-input" />
      <label htmlFor="idBackInput" className="file-upload-box">
         <span className="upload-title">ID Back Image</span>
         <span className="upload-subtitle">{idBack ? idBack.name : "Upload Photo"}</span>
      </label>
    </div>
    <div className="upload-field-wrapper" style={{ flex: 1 }}>
      <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '5px' }}>ID Front Image</label>
      <input type="file" id="idFrontInput" accept="image/*" onChange={(e) => setIdFront(e.target.files[0])} className="hidden-file-input" />
      <label htmlFor="idFrontInput" className="file-upload-box">
         <span className="upload-title">ID Front Image</span>
         <span className="upload-subtitle">{idFront ? idFront.name : "Upload Photo"}</span>
      </label>
    </div>
  </div>
  {/* بقية الحقول (كلمة المرور) */}
  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '5px' }}>Password</label>
  <div className="input-box">
    <input type="password" placeholder="Enter password" value={password} disabled={loading} onChange={(e) => setPassword(e.target.value)} />
  </div>
    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '5px' }}>Password Confirmation</label>
  <div className="input-box">
    <input type="password" placeholder="Confirm password" value={passwordConfirmation} disabled={loading} onChange={(e) => setPasswordConfirmation(e.target.value)} />
  </div>

        {errorMessage && <div className="error-message-banner">{errorMessage}</div>}

        <button type="submit" className="register-btn" disabled={loading}>
          {waitingForVerification ? "انتظر التفعيل..." : loading ? "جاري المعالجة..." : "Register"}
        </button>

        <div className="switch-auth" style={{ textAlign: 'center', marginTop: '10px' }}>
          <span>Already have an account? </span>
          <span onClick={() => !loading && switchToLogin()} style={{ color: "#d48b8b", cursor: "pointer", fontWeight: "bold" }}>Login</span>
        </div>
      </form>
    </div>
  );
}