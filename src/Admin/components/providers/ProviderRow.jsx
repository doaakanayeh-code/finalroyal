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

export default function ProviderRow({
  provider,
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
      {/* Provider Name */}
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
            {provider.username?.charAt(0)}
          </Avatar>

          <Typography
            sx={{
              fontWeight: 600,
            }}
          >
            {provider.username}
          </Typography>
        </Box>
      </TableCell>

      {/* Email */}
      <TableCell align="center">{provider.email || "-"}</TableCell>

      {/* Phone */}
      <TableCell align="center">{provider.phone || "-"}</TableCell>

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
          {provider.role}
        </Typography>
      </TableCell>

      {/* Status */}
      <TableCell align="center">
        <Typography
          sx={{
            color: provider.is_blocked ? "#EF4444" : "#22C55E",
            fontWeight: "bold",
            fontSize: "15px",
          }}
        >
          {provider.is_blocked ? "Blocked" : "Active"}
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
          {new Date(provider.created_at).toLocaleDateString("en-GB")}
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
            <Tooltip title="Restore Provider">
              <IconButton
                color="success"
                onClick={() => onRestore(provider.id)}
              >
                <RestoreFromTrashIcon />
              </IconButton>
            </Tooltip>
          </Box>
        ) : (
          <TableActions
            row={provider}
            onEdit={onEdit}
            onDelete={() => onDelete(provider.id)}
            onBlockToggle={() =>
              provider.is_blocked
                ? onUnblock(provider.id)
                : onBlock(provider.id)
            }
            editTooltip="Edit Provider"
            deleteTooltip="Delete Provider"
            blockTooltip="Block Provider"
            unblockTooltip="Unblock Provider"
          />
        )}
      </TableCell>
    </TableRow>
  );
}
