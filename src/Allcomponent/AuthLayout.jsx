import React from "react";
import { Box, Typography } from "@mui/material";

export default function AuthLayout({ 
  image, 
  title, 
  description, 
  footerText, 
  footerLinkText, 
  onFooterLinkClick, 
  children 
}) {
  return (
    <Box sx={{ textAlign: "center", width: "100%" }}>
      {image && <img src={image} alt="auth-visual" style={{ width: 180, marginBottom: 20 }} />}

      <Typography variant="h5" fontWeight="600" sx={{ mb: 1, color: "#222" }}>
        {title}
      </Typography>

      <Typography variant="body2" sx={{ color: "#777", mb: 4, px: 2, lineHeight: 1.7 }}>
        {description}
      </Typography>

      {children}

      {(footerText || footerLinkText) && (
        <Typography variant="body2" sx={{ color: "#777", mt: 3 }}>
          {footerText}
          <span
            onClick={onFooterLinkClick}
            style={{
              color: "#d1a3a4",
              fontWeight: "600",
              marginLeft: "6px",
              marginRight: "6px",
              cursor: "pointer",
            }}
          >
            {footerLinkText}
          </span>
        </Typography>
      )}
    </Box>
  );
}