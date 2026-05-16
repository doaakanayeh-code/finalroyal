import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Container,
  Fab,
  Dialog,
  DialogContent,
  IconButton,
  Slide,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";

import o0Image from "../assets/o0.png";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ContactUs() {
  const [openModal, setOpenModal] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const getVariants = (xDir, yDir) => ({
    initial: {
      x: xDir * 300,
      y: yDir * 300,
      scale: 0.2,
      rotate: xDir * yDir * 90,
      opacity: 0,
      filter: "blur(10px)",
    },
    animate: {
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 2, ease: [0.22, 1, 0.36, 1] },
    },
  });

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 10 }}>
      {/* 1. الفورم الكامل في الصفحة الأساسية */}
      <Typography variant="h3" align="center" sx={{ mb: 4, fontWeight: "500", color: "#333" }}>
        Contact Us
      </Typography>
      
      <Paper elevation={1} sx={{ p: 4, borderRadius: "16px", border: "1px solid #e0e0e0" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Box>
            <Typography sx={{ mb: 1, fontWeight: "500" }}>Name *</Typography>
            <TextField fullWidth placeholder="Name" variant="outlined" />
          </Box>
          <Box>
            <Typography sx={{ mb: 1, fontWeight: "500" }}>Email *</Typography>
            <TextField fullWidth placeholder="Email" variant="outlined" />
          </Box>
          <Box>
            <Typography sx={{ mb: 1, fontWeight: "500" }}>Phone *</Typography>
            <TextField fullWidth placeholder="Phone Number" variant="outlined" />
          </Box>
          <Box>
            <Typography sx={{ mb: 1, fontWeight: "500" }}>Message *</Typography>
            <TextField fullWidth placeholder="Message" multiline rows={4} variant="outlined" />
          </Box>
          <Button variant="contained" sx={{ backgroundColor: "#D18C96", py: 1.5, fontWeight: "bold" }}>
            Send Message
          </Button>
        </Box>
      </Paper>

      {/* 2. الزر العائم */}
      <Fab
        onClick={() => setOpenModal(true)}
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
          backgroundColor: "#b97681",
          "&:hover": { backgroundColor: "#a3636d" },
          color: "white",
        }}
      >
        <ChatIcon />
      </Fab>

      {/* 3. الديالوج (التصميم المختصر + خلفية زهر) */}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        TransitionComponent={Transition}
        fullScreen={isMobile}
        maxWidth="lg"
        PaperProps={{ style: { borderRadius: isMobile ? 0 : "30px", overflow: "hidden" } }}
      >
        <DialogContent sx={{ p: 0, display: "flex", flexDirection: isMobile ? "column" : "row", minHeight: "500px" }}>
          
          <IconButton onClick={() => setOpenModal(false)} sx={{ position: "absolute", top: 15, left: 15, zIndex: 10 }}>
            <CloseIcon />
          </IconButton>

          {/* القسم الأيسر: المختصر (رقم الموبايل فقط) */}
          <Box sx={leftSectionStyle}>
            <Typography variant="h4" sx={titleStyle}>
              Your event, just a <br /> tap away..
            </Typography>
            <Typography sx={subtitleStyle}>
              Enter your number or email to complete your login as a Patient
            </Typography>
            
            <Box sx={inputGroupStyle}>
              <input type="text" placeholder="Enter your phone number" style={inputStyle} />
              <button style={buttonStyle}>Send Code</button>
            </Box>
          </Box>

          {/* القسم الأيمن: اللوغو مع الخلفية الزهر */}
          <Box sx={rightSectionStyle}>
            <motion.div
              style={logoWrapperStyle}
              initial={{ scale: 0.8 }}
              animate={{ scale: [0.8, 1.05, 1] }}
              transition={{ duration: 2.5 }}
            >
              <Piece path={o0Image} variants={getVariants(-1, -1)} clip="inset(0 50% 50% 0)" />
              <Piece path={o0Image} variants={getVariants(1, -1)} clip="inset(0 0 50% 50%)" />
              <Piece path={o0Image} variants={getVariants(-1, 1)} clip="inset(50% 50% 0 0)" />
              <Piece path={o0Image} variants={getVariants(1, 1)} clip="inset(50% 0 0 50%)" />
            </motion.div>
          </Box>

        </DialogContent>
      </Dialog>
    </Container>
  );
}

// مكون القطعة الواحدة للوغو
const Piece = ({ path, variants, clip }) => (
  <motion.div
    initial="initial"
    animate="animate"
    variants={variants}
    style={{ width: "150px", height: "150px", position: "absolute", overflow: "hidden" }}
  >
    <img src={path} alt="" style={{ width: "100%", height: "100%", objectFit: "contain", clipPath: clip }} />
  </motion.div>
);

// --- التنسيقات ---

const leftSectionStyle = {
  flex: 1,
  padding: { xs: "60px 20px", md: "60px" },
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  backgroundColor: "#fff"
};

const rightSectionStyle = {
  flex: 1,
  background: "linear-gradient(135deg, #b97681 0%, #d18c96 100%)", // التدرج الزهري
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: { xs: "300px", md: "auto" },
  position: "relative",
};

const logoWrapperStyle = { width: "150px", height: "150px", position: "relative" };
const titleStyle = { fontSize: "32px", fontWeight: "bold", color: "#222", mb: 2, lineHeight: "1.2" };
const subtitleStyle = { fontSize: "14px", color: "#888", mb: 4, maxWidth: "300px" };
const inputGroupStyle = { display: "flex", gap: "10px", width: "100%" };
const inputStyle = { flex: 1, padding: "12px 20px", borderRadius: "50px", border: "1px solid #ddd", outline: "none" };

const buttonStyle = {
  padding: "12px 24px",
  borderRadius: "50px",
  border: "none",
  backgroundColor: "#b97681", // زر "Send Code" صار زهري
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer",
  whiteSpace: "nowrap"
};