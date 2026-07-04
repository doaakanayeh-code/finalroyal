import React from "react";
import {
  TableRow,
  TableCell,
  Avatar,
  Typography,
  Box,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

export default function MessageRow({ row, onOpen, onDelete }) {
  const message = row;

  return (
    <TableRow
      hover
      onClick={() => onOpen(message)}
      sx={{
        cursor: "pointer",
        backgroundColor: message.status === "pending" ? "#FFF6F8" : "#fff",
        transition: ".25s",
        "&:hover": {
          backgroundColor: "#FCECEF",
        },
      }}
    >
      {/* Sender */}
      <TableCell align="center">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Avatar sx={{ bgcolor: "#d18c96" }}>{message.name?.charAt(0)}</Avatar>

          <Typography fontWeight={700} color="#374151">
            {message.name}
          </Typography>
        </Box>
      </TableCell>

      {/* Email */}
      <TableCell align="center">
        <Typography
          sx={{
            color: "#64748B",
            fontSize: 14,
          }}
        >
          {message.email}
        </Typography>
      </TableCell>

      {/* Message */}
      <TableCell align="center">
        <Typography
          sx={{
            maxWidth: 320,
            mx: "auto",
            color: "#475569",
            fontSize: 14,
            textAlign: "right",
          }}
        >
          {message.message.length > 40
            ? `${message.message.substring(0, 40)}...`
            : message.message}
        </Typography>
      </TableCell>
      {/* Status */}
      <TableCell align="center">
        <Chip
          label={message.status === "pending" ? "Pending" : "Replied"}
          color={message.status === "pending" ? "warning" : "success"}
        />
      </TableCell>

      {/* Date */}
      <TableCell align="center">
        <Typography
          sx={{
            color: "#64748B",
            fontSize: 14,
          }}
        >
          {new Date(message.created_at).toLocaleDateString("en-GB")}
        </Typography>
      </TableCell>

      {/* Actions */}
      <TableCell align="center">
        <Tooltip title="Delete Message">
          <IconButton
            color="error"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(message.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}
