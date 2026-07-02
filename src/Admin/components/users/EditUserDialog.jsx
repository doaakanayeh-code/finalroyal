import React from "react";
import { Button, TextField, MenuItem } from "@mui/material";
import CustomDialog from "../common/ConfirmDialog";

export default function EditUserDialog({
  open,
  onClose,
  editUser,
  setEditUser,
  onSave,
}) {
  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      title="Edit User"
      actions={
        <>
          <Button onClick={onClose}>Cancel</Button>

          <Button
            variant="contained"
            onClick={onSave}
            sx={{
              bgcolor: "#d18c96",
            }}
          >
            Save Changes
          </Button>
        </>
      }
    >
      {/* Username (Read Only) */}
      <TextField
        fullWidth
        margin="normal"
        label="Username"
        value={editUser.username}
        disabled
      />

      {/* Phone */}
      <TextField
        fullWidth
        margin="normal"
        label="Phone"
        value={editUser.phone}
        onChange={(e) =>
          setEditUser({
            ...editUser,
            phone: e.target.value,
          })
        }
      />

      {/* Role */}
      <TextField
        select
        fullWidth
        margin="normal"
        label="Role"
        value={editUser.role}
        onChange={(e) =>
          setEditUser({
            ...editUser,
            role: e.target.value,
          })
        }
      >
        <MenuItem value="user">User</MenuItem>
        <MenuItem value="provider">Provider</MenuItem>
      </TextField>
    </CustomDialog>
  );
}
