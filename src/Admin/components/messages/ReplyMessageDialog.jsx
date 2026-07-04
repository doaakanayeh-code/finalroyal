import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
  Box,
  Paper,
  Avatar,
  Stack,
} from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ReplyIcon from "@mui/icons-material/Reply";

export default function ReplyMessageDialog({
  open,
  onClose,
  message,
  onReply,
}) {
  const [reply, setReply] = useState("");

  useEffect(() => {
    setReply(message?.admin_reply || "");
  }, [message]);

  const handleSend = () => {
    if (!reply.trim()) return;
    onReply(reply);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 4,
          width: 600,
          overflow: "hidden",
        },
      }}
    >
      {/* HEADER */}
      <DialogTitle
        sx={{
          bgcolor: "#d18c96",
          color: "#fff",
          fontWeight: 700,
          fontSize: 20,
          py: 2,
        }}
      >
        Contact Message
      </DialogTitle>

      {/* CONTENT */}
      <DialogContent sx={{ p: 3, bgcolor: "#fafafa" }}>
        <Stack spacing={2.5}>
          {/* CUSTOMER INFO */}

          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 3,
              bgcolor: "#fff",
              border: "1px solid #eee",
            }}
          >
            <Typography
              sx={{
                fontSize: 13,
                color: "#9CA3AF",
                fontWeight: 700,
                mb: 2,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Customer
            </Typography>

            <Stack spacing={2}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: "#d18c96",
                    width: 30,
                    height: 30,
                    fontSize: 15,
                  }}
                >
                  {message?.name?.charAt(0)}
                </Avatar>

                <Typography
                  sx={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: "#374151",
                  }}
                >
                  {message?.name}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <EmailIcon
                  sx={{
                    color: "#d18c96",
                    fontSize: 20,
                  }}
                />

                <Typography fontSize={14}>{message?.email}</Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <CalendarMonthIcon
                  sx={{
                    color: "#d18c96",
                    fontSize: 20,
                  }}
                />

                <Typography fontSize={14}>
                  {message?.created_at
                    ? new Date(message.created_at).toLocaleString()
                    : "-"}
                </Typography>
              </Box>
            </Stack>
          </Paper>

          {/* MESSAGE */}
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 3,
              bgcolor: "#fff7f9",
              border: "1px solid #f3d8de",
            }}
          >
            <Typography fontWeight={600} mb={1}>
              Message
            </Typography>

            <Typography
              sx={{
                fontSize: 14,
                lineHeight: 1.7,
                whiteSpace: "pre-wrap",
              }}
            >
              {message?.message}
            </Typography>
          </Paper>

          {/* REPLY */}
          <Box>
            <Typography fontWeight={600} mb={1}>
              Your Reply
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={4}
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Type your reply..."
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  bgcolor: "#fff",
                },
              }}
            />
          </Box>
        </Stack>
      </DialogContent>

      {/* FOOTER */}
      <DialogActions
        sx={{
          px: 3,
          py: 2,
          display: "flex",
          justifyContent: "flex-end",
          gap: 1.5,
          bgcolor: "#fff",
        }}
      >
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>

        <Button
          variant="contained"
          startIcon={<ReplyIcon />}
          onClick={handleSend}
          sx={{
            bgcolor: "#d18c96",
            borderRadius: 2,
            px: 3,
            "&:hover": {
              bgcolor: "#c07b87",
            },
          }}
        >
          Send Reply
        </Button>
      </DialogActions>
    </Dialog>
  );
}
