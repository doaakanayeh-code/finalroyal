import React, { useState, useRef, useContext } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Container,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../Context/ThemeContext"; 
import o0Image from "../assets/o0.png";

export default function ContactUs() {
  const theme = useTheme();
  const { mode } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [loading, setLoading] = useState(false);
  
  const isDark = mode === "dark";
  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();

  const handleSendMessage = async () => {
    if (!nameRef.current.value || !emailRef.current.value || !messageRef.current.value) {
      alert(t("contact.validation"));
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://127.0.0.1:8000/api/store", {
        name: nameRef.current.value,
        email: emailRef.current.value,
        message: messageRef.current.value,
      });
      alert(t("contact.success"));
      nameRef.current.value = "";
      emailRef.current.value = "";
      messageRef.current.value = "";
    } catch (error) {
      alert(t("contact.error"));
    } finally {
      setLoading(false);
    }
  };

  const getVariants = (xDir, yDir) => ({
    initial: { x: xDir * 300, y: yDir * 300, scale: 0.2, rotate: xDir * yDir * 90, opacity: 0, filter: "blur(10px)" },
    animate: { x: 0, y: 0, scale: 1, rotate: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 2, ease: [0.22, 1, 0.36, 1] } },
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 10 }} dir={i18n.dir()}>
      <Paper elevation={2} sx={{ overflow: "hidden", borderRadius: "24px", backgroundColor: isDark ? "#121212" : "#fff" }}>
        <Box sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", minHeight: "650px" }}>
          
          {/* الفورم */}
          <Box sx={{ flex: 1, p: { xs: 3, md: 6 }, backgroundColor: isDark ? "#1e1e1e" : "#fff" }}>
            <Typography variant="h3" sx={{ mb: 4, fontWeight: 600, color: isDark ? "#fff" : "#333" }}>
              {t("contact.title")}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {["name", "email", "message"].map((field) => (
                <Box key={field}>
                  <Typography sx={{ mb: 1, color: isDark ? "#ccc" : "#000" }}>{t(`contact.${field}`)} *</Typography>
                  <TextField 
                    fullWidth 
                    inputRef={field === "name" ? nameRef : field === "email" ? emailRef : messageRef} 
                    placeholder={t(`contact.${field}`)}
                    multiline={field === "message"}
                    rows={field === "message" ? 5 : 1}
                    sx={{ "& .MuiOutlinedInput-root": { color: isDark ? "#fff" : "#000", "& fieldset": { borderColor: isDark ? "#444" : "#ccc" } } }}
                  />
                </Box>
              ))}
              <Button
                variant="contained"
                onClick={handleSendMessage}
                disabled={loading}
                sx={{
                  backgroundColor: "#D18C96",
                  py: 1.5,
                  fontWeight: "bold",
                  borderRadius: "12px",
                  "&:hover": { backgroundColor: "#b97681" },
                }}
              >
                {loading ? t("contact.sending") : t("contact.send")}
              </Button>
            </Box>
          </Box>

          {/* قسم النص والموشن */}
          <Box sx={{ flex: 1, background: "linear-gradient(135deg,#b97681 0%,#d18c96 100%)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", p: 5 }}>
            <Typography variant="h4" sx={{ color: "#fff", fontWeight: "bold", mb: 2 }}>{t("contact.hero_title")}</Typography>
            <Typography sx={{ color: "#fff", opacity: 0.9, maxWidth: "350px", mb: 6 }}>{t("contact.hero_desc")}</Typography>
            <motion.div style={{ width: "220px", height: "220px", position: "relative" }} initial={{ scale: 0.8 }} animate={{ scale: [0.8, 1.05, 1] }} transition={{ duration: 2.5 }}>
              <Piece path={o0Image} variants={getVariants(-1, -1)} clip="inset(0 50% 50% 0)" />
              <Piece path={o0Image} variants={getVariants(1, -1)} clip="inset(0 0 50% 50%)" />
              <Piece path={o0Image} variants={getVariants(-1, 1)} clip="inset(50% 50% 0 0)" />
              <Piece path={o0Image} variants={getVariants(1, 1)} clip="inset(50% 0 0 50%)" />
            </motion.div>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

const Piece = ({ path, variants, clip }) => (
  <motion.div initial="initial" animate="animate" variants={variants} style={{ width: "220px", height: "220px", position: "absolute", overflow: "hidden" }}>
    <img src={path} alt="" style={{ width: "100%", height: "100%", objectFit: "contain", clipPath: clip }} />
  </motion.div>
);