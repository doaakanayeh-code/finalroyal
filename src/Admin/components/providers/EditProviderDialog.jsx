import React from "react";
import { Button, TextField, MenuItem } from "@mui/material";
import CustomDialog from "../common/ConfirmDialog";

export default function EditProviderDialog({
  open,
  onClose,
  editProvider,
  setEditProvider,
  onSave,
}) {
  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      title="Edit Provider"
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
      {/* اسم المزود (للعرض فقط) */}
      <TextField
        fullWidth
        margin="normal"
        label="Provider Name"
        value={editProvider.username}
        disabled
      />

      {/* الهاتف */}
      <TextField
        fullWidth
        margin="normal"
        label="Phone"
        value={editProvider.phone}
        onChange={(e) =>
          setEditProvider({
            ...editProvider,
            phone: e.target.value,
          })
        }
      />

      {/* الدور */}
      <TextField
        select
        fullWidth
        margin="normal"
        label="Role"
        value={editProvider.role}
        onChange={(e) =>
          setEditProvider({
            ...editProvider,
            role: e.target.value,
          })
        }
      >
        <MenuItem value="provider">Provider</MenuItem>
        <MenuItem value="user">User</MenuItem>
      </TextField>
    </CustomDialog>
  );
}
