import React, { useState } from "react";
import { Box, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import calendarImg from "../assets/Calendar.png";

import Login from "../Auth/Login";
import Register from "../Auth/SignUp";
import ForgotPassword from "../Auth/ForgotPassword";
import ResetPassword from "../Auth/ResetPassword";
import AuthLayout from "../Allcomponent/AuthLayout"; 
import { useTranslation } from "react-i18next";

export default function BookingModal() {
  const [open, setOpen] = useState(true);
  const [view, setView] = useState("booking");
  const { t } = useTranslation();

  if (!open) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.4)", 
        display: "flex",
        alignItems: "center",      
        justifyContent: "center",    
        zIndex: 99999,              
      }}
    >
      <Box
        sx={{
          background: "#FFF8F6", 
          borderRadius: "35px",
          width: "420px",
          p: 4,
          position: "relative",
          overflow: "hidden",
          boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.15)", 
          mx: 2, 
        }}
      >
        <IconButton 
          onClick={() => setOpen(false)} 
          sx={{ position: "absolute", top: 15, right: 15, zIndex: 10, color: "#4A1525" }}
        >
          <CloseIcon />
        </IconButton>

        {view === "booking" && (
          <AuthLayout
            image={calendarImg}
            title={t('booking_modal.title')}
            description={t('booking_modal.subtitle')}
            footerText=""
            footerLinkText={t('booking_modal.continue_guest')}
            onFooterLinkClick={() => setOpen(false)}
          >
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
                "&:hover": { backgroundColor: "#be8f90", boxShadow: "none" },
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
                backgroundColor: "#d1a3a4",
                textTransform: "none",
                boxShadow: "none",
                "&:hover": { backgroundColor: "#be8f90", boxShadow: "none" },
              }}
            >
              {t('booking_modal.create_account')}
            </Button>
          </AuthLayout>
        )}

        {view === "login" && (
          <Login switchToRegister={() => setView("register")} switchToForgot={() => setView("forgot")} />
        )}

        {view === "register" && (
          <Register switchToLogin={() => setView("login")} />
        )}

        {view === "forgot" && (
          <ForgotPassword switchToLogin={() => setView("login")} switchToReset={() => setView("reset")} />
        )}

        {view === "reset" && (
          <ResetPassword switchToLogin={() => setView("login")} />
        )}
      </Box>
    </Box>
  );
}