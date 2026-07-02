import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  CircularProgress,
  Box,
  TableHead,
  TableRow,
  TableCell,
  Button,
  Typography,
} from "@mui/material";

import UserRow from "./UserRow";
import EditUserDialog from "./EditUserDialog";
import DeleteUserDialog from "./DeleteUserDialog";
import ConfirmDialog from "../common/ConfirmDialog";

import {
  blockUser,
  unblockUser,
  deleteUser,
  updateUser,
  restoreUser,
} from "../../services/usersService";

const columns = [
  { id: "username", label: "User Name", minWidth: 220 },
  { id: "email", label: "Email", minWidth: 220 },
  { id: "phone", label: "Phone", minWidth: 150 },
  { id: "role", label: "Role", minWidth: 120, align: "center" },
  { id: "status", label: "Status", minWidth: 120, align: "center" },
  { id: "created_at", label: "Created At", minWidth: 180, align: "center" },
  { id: "actions", label: "Actions", minWidth: 350, align: "center" },
];

export default function UsersTable({
  users,
  deleted = false,
  reloadUsers,
  reloadStatistics,
}) {
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [openDelete, setOpenDelete] = useState(false);
  const [openRestore, setOpenRestore] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [editUser, setEditUser] = useState({
    id: "",
    username: "",
    phone: "",
    role: "",
  });

  const reload = async () => {
    await reloadStatistics();

    if (deleted) {
      await reloadUsers(true);
    } else {
      await reloadUsers();
      await reloadStatistics();
    }
  };

  const handleBlock = async (id) => {
    try {
      await blockUser(id);
      await reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnblock = async (id) => {
    try {
      await unblockUser(id);
      await reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser(selectedUserId);

      setOpenDelete(false);
      setSelectedUserId(null);

      await reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleRestore = async () => {
    try {
      await restoreUser(selectedUserId);

      setOpenRestore(false);
      setSelectedUserId(null);

      await reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateUser(editUser.id, {
        username: editUser.username,
        phone: editUser.phone,
        role: editUser.role,
      });

      setOpenEdit(false);

      await reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          borderRadius: "30px",
          overflow: "hidden",
        }}
      >
        {users.length === 0 ? (
          <Box
            sx={{
              height: 350,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align || "center"}
                      sx={{
                        background: "#d18c96",
                        color: "#fff",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {users.map((user) => (
                  <UserRow
                    key={user.id}
                    user={user}
                    deleted={deleted}
                    onEdit={(user) => {
                      setEditUser({
                        id: user.id,
                        username: user.username,
                        phone: user.phone,
                        role: user.role,
                      });

                      setOpenEdit(true);
                    }}
                    onDelete={(id) => {
                      setSelectedUserId(id);
                      setOpenDelete(true);
                    }}
                    onRestore={(id) => {
                      setSelectedUserId(id);
                      setOpenRestore(true);
                    }}
                    onBlock={handleBlock}
                    onUnblock={handleUnblock}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      <EditUserDialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        editUser={editUser}
        setEditUser={setEditUser}
        onSave={handleUpdate}
      />

      <DeleteUserDialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onDelete={handleDelete}
      />

      <ConfirmDialog
        open={openRestore}
        onClose={() => setOpenRestore(false)}
        title="Restore User"
        actions={
          <>
            <Button onClick={() => setOpenRestore(false)}>Cancel</Button>

            <Button variant="contained" color="success" onClick={handleRestore}>
              Restore
            </Button>
          </>
        }
      >
        <Typography textAlign="center">
          Are you sure you want to restore this user?
        </Typography>
      </ConfirmDialog>
    </>
  );
}
