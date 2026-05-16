import React, { useState } from "react";
import { Box, Typography, TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Resetpasswordim from "../assets/Resetpassword.png";
// 1. استيراد Hook الترجمة
import { useTranslation } from "react-i18next";

export default function ResetPassword({ switchToLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // 2. تفعيل دالة الترجمة
  const { t } = useTranslation();

  return (
    <Box sx={{ width: "100%", textAlign: "center" }}>
      {/* IMAGE */}
      <img src={Resetpasswordim} alt="Reset" style={{ width: 180, marginBottom: 20 }} />

      {/* TITLE */}
      <Typography variant="h5" fontWeight="600" sx={{ mb: 1, color: "#2f2f2f" }}>
        {t('auth.reset_password_title')}
      </Typography>

      {/* DESCRIPTION */}
      <Typography variant="body2" sx={{ color: "#777", mb: 4, px: 2, lineHeight: 1.7 }}>
        {t('auth.reset_password_desc')}
      </Typography>

      {/* NEW PASSWORD */}
      <TextField
        fullWidth
        type={showPassword ? "text" : "password"}
        placeholder={t('auth.new_password_placeholder')}
        sx={{
          mb: 2,
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
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
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
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* BUTTON */}
      <Button
        fullWidth
        variant="contained"
        sx={{
          borderRadius: "30px",
          backgroundColor: "#d9a5a5",
          color: "#fff",
          py: 1.5,
          mb: 3,
          textTransform: "none",
          fontSize: "15px",
          boxShadow: "none",
          "&:hover": { backgroundColor: "#c88f8f", boxShadow: "none" },
        }}
      >
        {t('auth.confirm_reset_btn')}
      </Button>

      {/* BACK LOGIN */}
      <Typography variant="body2" sx={{ color: "#777" }}>
        {t('auth.remember_password_text')}
        <span
          onClick={switchToLogin}
          style={{
            color: "#d1a3a4",
            fontWeight: "600",
            marginLeft: "6px",
            marginRight: "6px", // إضافة مساحة للعربية أيضاً
            cursor: "pointer",
          }}
        >
          {t('auth.login_link')}
        </span>
      </Typography>
    </Box>
  );
}