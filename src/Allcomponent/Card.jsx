import React from "react";
import { Box, Paper, Typography } from "@mui/material";
export default function DashboardCard({ title, icon, color, bg, children, sx = {} }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: "30px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "0 10px 40px rgba(0,0,0,0.04)",
        transition: "0.3s",
        "&:hover": { transform: "translateY(-5px)" },
        ...sx 
      }}
    >
      <Box sx={{ 
        width: 75, height: 75, borderRadius: "20px", 
        bgcolor: bg, color: color, 
        display: "flex", alignItems: "center", justifyContent: "center", mb: 2 
      }}>
        {icon && React.cloneElement(icon, { sx: { fontSize: 38 } })}
      </Box>
      
      <Typography sx={{ color: "#64748B", fontSize: "1.1rem", fontWeight: 600, mb: 2 }}>
        {title}
      </Typography>
      <Box sx={{ width: "100%" }}>
        {children}
      </Box>
    </Paper>
  );
}