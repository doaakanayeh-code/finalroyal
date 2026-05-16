import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import Forgotpasswordim from "../assets/Forgotpassword.png";
// 1. استيراد الترجمة
import { useTranslation } from "react-i18next";

export default function ForgotPassword({ switchToLogin, switchToReset }) {
  const [email, setEmail] = useState("");
  // 2. تفعيل دالة الترجمة
  const { t } = useTranslation();

  function handleSubmit(e) {
    e.preventDefault();
    // هون لاحقاً بتحطي API تبع الإرسال
    switchToReset();
  }

  return (
    <Box sx={{ textAlign: "center", width: "100%" }}>
      {/* IMAGE */}
      <img
        src={Forgotpasswordim}
        alt="Forgot"
        style={{ width: 200, marginBottom: 20 }}
      />

      {/* TITLE */}
      <Typography variant="h5" fontWeight="600" sx={{ mb: 1, color: "#222" }}>
        {t('auth.forgot_password_title')}
      </Typography>

      {/* TEXT */}
      <Typography variant="body2" sx={{ color: "#777", mb: 4, px: 2, lineHeight: 1.8 }}>
        {t('auth.forgot_password_desc')}
      </Typography>

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          placeholder={t('auth.email_placeholder')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

        {/* BUTTON */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            borderRadius: "30px",
            backgroundColor: "#d1a3a4",
            color: "#fff",
            py: 1.5,
            mb: 3,
            textTransform: "none",
            fontSize: "1rem",
            boxShadow: "none",
            "&:hover": { backgroundColor: "#be8f90", boxShadow: "none" },
          }}
        >
          {t('auth.confirm_btn')}
        </Button>
      </form>

      {/* BACK TO LOGIN */}
      <Typography variant="body2" sx={{ color: "#777" }}>
        {t('auth.remember_password_text')}
        <span
          onClick={switchToLogin}
          style={{
            color: "#d1a3a4",
            fontWeight: "600",
            marginLeft: "6px",
            marginRight: "6px",
            cursor: "pointer",
          }}
        >
          {t('auth.login_link')}
        </span>
      </Typography>
    </Box>
  );
}