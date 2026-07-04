import React from "react";
import { Box, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

// مكوّن صغير أنيق لرفع صورة هوية واحدة مع معاينتها
export default function IdImageUploader({ label, previewUrl, onSelect }) {
  return (
    <Box sx={{ flex: "1 1 160px", minWidth: 160 }}>
      <Typography variant="caption" sx={{ display: "block", mb: 0.5, color: "#8a7a7a", fontWeight: "600" }}>
        {label}
      </Typography>
      <Box
        component="label"
        sx={{
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          height: 110, borderRadius: "12px", cursor: "pointer",
          border: "1.5px dashed #e6b9c0",
          backgroundColor: "#fff5f5",
          backgroundImage: previewUrl ? `url(${previewUrl})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          overflow: "hidden",
          "&:hover .overlay": { opacity: 1 },
        }}
      >
        <input
          type="file"
          hidden
          accept="image/jpeg,image/png,image/jpg,image/gif,image/svg+xml"
          onChange={(e) => onSelect(e.target.files[0])}
        />
        {!previewUrl && (
          <>
            <CloudUploadIcon sx={{ color: "#c86d7f", fontSize: 26 }} />
            <Typography variant="caption" sx={{ color: "#c86d7f", mt: 0.5, fontWeight: "600" }}>
              اختاري صورة
            </Typography>
          </>
        )}
        {previewUrl && (
          <Box
            className="overlay"
            sx={{
              position: "absolute", inset: 0,
              backgroundColor: "rgba(0,0,0,0.45)",
              display: "flex", alignItems: "center", justifyContent: "center",
              opacity: 0, transition: "opacity 0.2s",
            }}
          >
            <Typography variant="caption" sx={{ color: "#fff", fontWeight: "700" }}>
              تغيير الصورة
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}