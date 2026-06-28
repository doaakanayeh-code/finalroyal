import React, { useState } from "react";
import { TextField, Button, IconButton, InputAdornment, CircularProgress, Typography, Box, Container } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Resetpasswordim from "../assets/Resetpassword.png";
import { useTranslation } from "react-i18next";
import AuthLayout from "../Allcomponent/AuthLayout"; 
import axios from "axios";
import { useSearchParams } from "react-router-dom"; 

export default function ResetPassword({ switchToLogin }) {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (password.length < 8) {
      setErrorMessage("يجب أن تكون كلمة المرور 8 أحرف على الأقل");
      return;
    }

    if (password !== passwordConfirmation) {
      setErrorMessage("كلمتا المرور غير متطابقتين");
      return;
    }

    if (!token || !email) {
      setErrorMessage("رابط إعادة التعيين غير صالح أو منتهي الصلاحية.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/reset-password", {
        token: token,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation, 
      });

      setSuccessMessage(response.data.status || "تم إعادة تعيين كلمة المرور بنجاح!");
      
      setTimeout(() => {
        switchToLogin();
      }, 2500);

    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errors = error.response.data.errors;
        setErrorMessage(Object.values(errors)[0][0]);
      } else if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("حدث خطأ أثناء تحديث كلمة المرور، يرجى المحاولة لاحقاً");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    // 🌟 1. الطبقة الخلفية المعتمة لتغطية الشاشة بالكامل وصنع تأثير الـ Pop-up
    <Box 
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.45)", // تعتيم لطيف للخلفية
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999, // لضمان ظهورها فوق الهيدر والفوتر تماماً
        overflowY: "auto",
        p: 2
      }}
    >
      {/* 🌟 2. صندوق الواجهة المنبثقة الأبيض المحدد الحواف والأبعاد */}
      <Box 
        sx={{
          backgroundColor: "#fff", 
          borderRadius: "24px", // زوايا دائرية متناسقة مع المودال
          boxShadow: "0px 12px 40px rgba(0,0,0,0.15)",
          width: "100%",
          maxWidth: "460px", // العرض المثالي لتظهر ملمومة
          overflow: "hidden",
          animation: "fadeInUp 0.3s ease-out" // حركة دخول ناعمة
        }}
      >
        <AuthLayout
          image={Resetpasswordim}
          title={t('auth.reset_password_title')}
          description={t('auth.reset_password_desc')}
          footerText={t('auth.remember_password_text')}
          footerLinkText={t('auth.login_link')}
          onFooterLinkClick={switchToLogin}
        >
          <Container maxWidth="xs">
            <Box sx={{ p: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
              
              {errorMessage && (
                <Typography 
                  color="error" 
                  textAlign="center" 
                  variant="body2" 
                  sx={{ width: "100%", mb: 2.5, fontWeight: "600", backgroundColor: "#fdeded", py: 1, borderRadius: "10px" }}
                >
                  {errorMessage}
                </Typography>
              )}

              {successMessage && (
                <Typography 
                  color="success.main" 
                  textAlign="center" 
                  variant="body2" 
                  sx={{ width: "100%", mb: 2.5, fontWeight: "600", backgroundColor: "#edf7ed", py: 1, borderRadius: "10px" }}
                >
                  {successMessage}
                </Typography>
              )}

              <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                {/* NEW PASSWORD */}
                <TextField
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  placeholder={t('auth.new_password_placeholder')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  sx={{
                    mb: 2.5,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "30px",
                      backgroundColor: "#fff",
                      "& fieldset": { borderColor: "#ddd" },
                      "&:hover fieldset": { borderColor: "#d1a3a4" },
                      "&.Mui-focused fieldset": { borderColor: "#d1a3a4" },
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: "#be8f90" }}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {/* CONFIRM PASSWORD */}
                <TextField
                  fullWidth
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder={t('auth.confirm_password_placeholder')}
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  disabled={loading}
                  sx={{
                    mb: 4,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "30px",
                      backgroundColor: "#fff",
                      "& fieldset": { borderColor: "#ddd" },
                      "&:hover fieldset": { borderColor: "#d1a3a4" },
                      "&.Mui-focused fieldset": { borderColor: "#d1a3a4" },
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end" sx={{ color: "#be8f90" }}>
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {/* BUTTON */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading || !password || !passwordConfirmation}
                  sx={{
                    borderRadius: "30px",
                    backgroundColor: "#d1a3a4",
                    color: "#fff",
                    py: 1.5,
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: "600",
                    boxShadow: "none",
                    "&:hover": { backgroundColor: "#be8f90", boxShadow: "none" },
                    "&.Mui-disabled": { backgroundColor: "#e0e0e0", color: "#a6a6a6" }
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : t('auth.confirm_reset_btn')}
                </Button>
              </form>
            </Box>
          </Container>
        </AuthLayout>
      </Box>
    </Box>
  );
}