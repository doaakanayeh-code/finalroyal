import React from "react";
import {
  TableRow,
  TableCell,
  Avatar,
  Typography,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";

import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";

import TableActions from "../common/TableActions";

export default function UserRow({
  user,
  deleted = false,
  onEdit,
  onDelete,
  onRestore,
  onBlock,
  onUnblock,
}) {
  return (
    <TableRow
      hover
      sx={{
        "&:hover": {
          backgroundColor: "#F8FAFC",
        },
      }}
    >
      {/* Username */}
      <TableCell align="center">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Avatar
            sx={{
              bgcolor: "#d18c96",
            }}
          >
            {user.username?.charAt(0)}
          </Avatar>

          <Typography
            sx={{
              fontWeight: 600,
            }}
          >
            {user.username}
          </Typography>
        </Box>
      </TableCell>

      {/* Email */}
      <TableCell align="center">{user.email || "-"}</TableCell>

      {/* Phone */}
      <TableCell align="center">{user.phone || "-"}</TableCell>

      {/* Role */}
      <TableCell align="center">
        <Typography
          sx={{
            color: "#64748B",
            fontWeight: "bold",
            fontSize: "15px",
            textTransform: "capitalize",
          }}
        >
          {user.role}
        </Typography>
      </TableCell>

      {/* Status */}
      <TableCell align="center">
        <Typography
          sx={{
            color: user.is_blocked ? "#EF4444" : "#22C55E",
            fontWeight: "bold",
            fontSize: "15px",
          }}
        >
          {user.is_blocked ? "Blocked" : "Active"}
        </Typography>
      </TableCell>

      {/* Created At */}
      <TableCell align="center">
        <Typography
          sx={{
            color: "#64748B",
            fontWeight: 500,
            fontSize: "14px",
          }}
        >
          {new Date(user.created_at).toLocaleDateString("en-GB")}
        </Typography>
      </TableCell>

      {/* Actions */}
      <TableCell align="center">
        {deleted ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Tooltip title="Restore User">
              <IconButton color="success" onClick={() => onRestore(user.id)}>
                <RestoreFromTrashIcon />
              </IconButton>
            </Tooltip>
          </Box>
        ) : (
          <TableActions
            row={user}
            onEdit={onEdit}
            onDelete={() => onDelete(user.id)}
            onBlockToggle={() =>
              user.is_blocked ? onUnblock(user.id) : onBlock(user.id)
            }
            editTooltip="Edit User"
            deleteTooltip="Delete User"
            blockTooltip="Block User"
            unblockTooltip="Unblock User"
          />
        )}
      </TableCell>
    </TableRow>
  );
}
