import * as React from "react";
import { Dialog, DialogContent, Box, Typography, Button } from "@mui/material";

export default function CustomModal({
  open,
  onClose,
  title = "Delete chat?",
  descriptionPrefix = "This will delete",
  footerNote = "Visit settings to delete any memories saved during this chat.",
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: "24px", 
          padding: "16px",
          maxWidth: "450px",
          width: "100%",
          backgroundColor: "#ffffff !important", 
          backgroundImage: "none !important", 
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
        },
      }}
    >
      <DialogContent sx={{ bgcolor: "#ffffff" }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
          
          <Typography
            sx={{
              fontSize: "1.4rem",
              fontWeight: 600,
              color: "#000000",
              mb: 2,
              fontFamily: "inherit",
            }}
          >
            {title}
          </Typography>

          <Typography
            sx={{
              fontSize: "1.05rem",
              color: "#1e1e1e",
              mb: 1.5,
              lineHeight: 1.5,
              fontFamily: "inherit",
            }}
          >
            {descriptionPrefix}
          </Typography>

          <Typography
            sx={{
              fontSize: "0.9rem",
              color: "#71717a",
              mb: 4,
              lineHeight: 1.5,
              fontFamily: "inherit",
            }}
          >
            {footerNote}
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              width: "100%",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Button
              onClick={onClose}
              variant="text"
              sx={{
                color: "#000000",
                fontWeight: 600,
                px: 3,
                py: 1,
                borderRadius: "100px", 
                border: "1px solid",
                textTransform: "none",
                fontSize: "0.95rem",
                fontFamily: "inherit",
                "&:hover": {
                  bgcolor: "#f4f4f5",
                },
              }}
            >
              {cancelText}
            </Button>

            <Button
              onClick={onConfirm}
              variant="contained"
              disableElevation
              sx={{
                bgcolor: "#dc2626",
                color: "white",
                fontWeight: 600,
                px: 3,
                py: 1,
                borderRadius: "100px", 
                textTransform: "none",
                fontSize: "0.95rem",
                fontFamily: "inherit",
                "&:hover": {
                  bgcolor: "#b91c1c",
                },
              }}
            >
              {confirmText}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}