import React, { useState, useRef } from "react";
import { TextField, Button, Box, CircularProgress, Typography } from "@mui/material";
import Forgotpasswordim from "../assets/Forgotpassword.png";
import { useTranslation } from "react-i18next";
import AuthLayout from "../Allcomponent/AuthLayout"; 
import axios from "axios"; 
import { toast } from "react-toastify"; 

export default function ForgotPassword({ switchToLogin, switchToReset }) {
  const [step, setStep] = useState(1); 
  const [identifier, setIdentifier] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [waitingForLink, setWaitingForLink] = useState(false); // 🌟 حالة الانتظار لروابط الإيميل

  const [otp, setOtp] = useState(new Array(5).fill(""));
  const inputsRef = useRef([]);

  const { t } = useTranslation();

  // دالة لفحص ما إذا كان المدخل بريداً إلكترونياً
  const isEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); 

    if (identifier.trim() === "") {
      setErrorMessage("الرجاء إدخال البريد الإلكتروني أو رقم الهاتف");
      return;
    }

    setLoading(true);
    
    // إشعار تحميل منبثق ونظيف
    const resetToast = toast.loading("جاري فحص الحساب وإرسال التعليمات...");

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/forgot-password", {
        email: identifier.trim(),
      });

      toast.dismiss(resetToast);

      if (response.data.success || response.status === 200) {
        if (isEmail(identifier.trim())) {
          // 🌟 إظهار إشعار النجاح ليبقى ظاهراً للمستخدم ليقرأه
          toast.success("تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني بنجاح! يرجى تفقد صندوق الوارد والضغط عليه.", {
            autoClose: 8000
          });
          
          // 🌟 تفعيل حالة الانتظار والإبقاء على الـ Loader بالزر نشطاً
          setWaitingForLink(true);
        } else {
          // إذا كان رقم هاتف، نوقف اللودر وننتقل فوراً لخطوة الـ OTP كالمعتاد
          setStep(2); 
          setLoading(false);
        }
      }
    } catch (error) {
      setLoading(false); // نلغي التحميل فقط عند الخطأ لإتاحة المحاولة مجدداً
      toast.dismiss(resetToast);
      
      // 🌟 معالجة آمنة لرسائل الحماية (Throttling) والـ Bad Requests القادمة من الباك-إند
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        if (errorData.email) {
          setErrorMessage(typeof errorData.email === 'string' ? errorData.email : errorData.email[0]);
        } else if (errorData.message) {
          setErrorMessage(errorData.message);
        } else {
          setErrorMessage("الحساب المدخل غير مسجل لدينا أو البيانات غير صالحة.");
        }
      } else {
        setErrorMessage("حدث خطأ في الاتصال بالخادم، يرجى المحاولة لاحقاً.");
      }
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); 
    setLoading(true);    

    const otpCode = otp.join(""); 

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/verify-forgot-otp", {
        identifier: identifier,
        otp: otpCode,
      });

      if (response.data.verified || response.status === 200) {
        switchToReset(identifier, otpCode); 
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("رمز التحقق غير صحيح، يرجى المحاولة مجدداً");
      }
    } finally {
      setLoading(false); 
    }
  };

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;

    let newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value !== "" && index < 4) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <AuthLayout
      image={Forgotpasswordim}
      title={step === 1 ? t('auth.forgot_password_title') : "تحقق من رمز الأمان"}
      description={step === 1 ? t('auth.forgot_password_desc') : "أدخل الرمز المكون من 5 أرقام المرسل إلى حسابك"}
      footerText={t('auth.remember_password_text')}
      footerLinkText={t('auth.login_link')}
      onFooterLinkClick={switchToLogin}
    >
      
      {errorMessage && (
        <Typography color="error" textAlign="center" variant="body2" sx={{ mb: 2, fontWeight: "bold" }}>
          {errorMessage}
        </Typography>
      )}

      {step === 1 ? (
        <form onSubmit={handleEmailSubmit}>
          <TextField
            fullWidth
            placeholder={t('auth.email_placeholder')} 
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            disabled={loading || waitingForLink}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: "30px",
                backgroundColor: "#fff",
                "& fieldset": { borderColor: "#ddd" },
                "&:hover fieldset": { borderColor: "#d1a3a4" },
                "&.Mui-focused fieldset": { borderColor: "#d1a3a4" },
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              borderRadius: "30px",
              backgroundColor: "#d1a3a4",
              color: "#fff",
              py: 1.5,
              textTransform: "none",
              fontSize: "1rem",
              boxShadow: "none",
              "&:hover": { backgroundColor: "#be8f90", boxShadow: "none" },
            }}
          >
            {waitingForLink ? (
              <Box display="flex" alignItems="center" gap={1}>
                <CircularProgress size={20} color="inherit" />
                {"بانتظار الضغط على رابط الاستعادة..."}
              </Box>
            ) : loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              t('auth.confirm_btn')
            )}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleOtpSubmit}>
          <Box display="flex" justifyContent="center" gap={1.5} mb={5} dir="ltr">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                ref={(el) => (inputsRef.current[index] = el)}
                value={data}
                disabled={loading}
                onChange={(e) => handleOtpChange(e.target, index)}
                onKeyDown={(e) => handleOtpKeyDown(e, index)}
                style={{
                  width: "48px", 
                  height: "48px",
                  backgroundColor: "#fff",
                  border: "2px solid #ddd",
                  borderRadius: "12px",
                  textAlign: "center",
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  color: "#4A1525",
                  outline: "none",
                  transition: "all 0.2s",
                  opacity: loading ? 0.6 : 1
                }}
                onFocus={(e) => e.target.style.borderColor = "#d1a3a4"}
                onBlur={(e) => e.target.style.borderColor = "#ddd"}
              />
            ))}
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={otp.includes("") || loading} 
            sx={{
              borderRadius: "30px",
              backgroundColor: "#d1a3a4",
              color: "#fff",
              py: 1.5,
              textTransform: "none",
              fontSize: "1rem",
              boxShadow: "none",
              "&:hover": { backgroundColor: "#be8f90", boxShadow: "none" },
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "تأكيد الرمز"}
          </Button>

          <Box textAlign="center" mt={2}>
            <span 
              onClick={() => {
                if (!loading) {
                  setStep(1);
                  setWaitingForLink(false);
                  setOtp(new Array(5).fill("")); 
                  setErrorMessage("");
                }
              }} 
              style={{ 
                color: "#d1a3a4", 
                cursor: loading ? "not-allowed" : "pointer", 
                fontSize: "0.9rem", 
                textDecoration: "underline" 
              }}
            >
              تعديل البريد الإلكتروني / رقم الهاتف
            </span>
          </Box>
        </form>
      )}

    </AuthLayout>
  );
}