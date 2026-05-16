import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import calendarImg from "../assets/Calendar.png";

import Login from "../Auth/Login";
import Register from "../Auth/SignUp";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";

// 1. استيراد دالة الترجمة
import { useTranslation } from "react-i18next";

export default function BookingModal() {
  const [open, setOpen] = useState(true);
  const [view, setView] = useState("booking");

  // 2. تفعيل دالة الترجمة
  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      maxWidth="sm"
      PaperProps={{
        sx: {
          background: "transparent",
          boxShadow: "none",
          overflow: "visible",
        },
      }}
    >
      <DialogContent
        sx={{
          background: "#F3D5D5",
          borderRadius: "35px",
          width: "420px",
          p: 4,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* CLOSE */}
        <IconButton
          onClick={() => setOpen(false)}
          sx={{
            position: "absolute",
            top: 15,
            right: 15,
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* BOOKING VIEW */}
        {view === "booking" && (
          <div style={{ textAlign: "center" }}>
            <img
              src={calendarImg}
              alt="calendar"
              style={{
                width: 220,
                marginBottom: 20,
              }}
            />

            <Typography variant="h5" fontWeight="600" sx={{ mb: 1 }}>
              {t('booking_modal.title')}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "#777",
                mb: 4,
              }}
            >
              {t('booking_modal.subtitle')}
            </Typography>

            <Button
              fullWidth
              variant="contained"
              onClick={() => setView("login")}
              sx={{
                mb: 2,
                borderRadius: "30px",
                py: 1.5,
                backgroundColor: "#d1a3a4",
                textTransform: "none",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#be8f90",
                  boxShadow: "none",
                },
              }}
            >
              {t('auth.login_link')}
            </Button>

            <Button
              fullWidth
              variant="contained"
              onClick={() => setView("register")}
              sx={{
                borderRadius: "30px",
                py: 1.5,
                mb: 3,
                backgroundColor: "#d1a3a4",
                textTransform: "none",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#be8f90",
                  boxShadow: "none",
                },
              }}
            >
              {t('booking_modal.create_account')}
            </Button>

            <Typography
              variant="body2"
              sx={{
                color: "#999",
                cursor: "pointer",
              }}
              onClick={() => setOpen(false)}
            >
              {t('booking_modal.continue_guest')}
            </Typography>
          </div>
        )}

        {/* بقية الواجهات */}
        {view === "login" && (
          <Login
            switchToRegister={() => setView("register")}
            switchToForgot={() => setView("forgot")}
          />
        )}

        {view === "register" && (
          <Register switchToLogin={() => setView("login")} />
        )}

        {view === "forgot" && (
          <ForgotPassword
            switchToLogin={() => setView("login")}
            switchToReset={() => setView("reset")}
          />
        )}

        {view === "reset" && (
          <ResetPassword switchToLogin={() => setView("login")} />
        )}
      </DialogContent>
    </Dialog>
  );
}