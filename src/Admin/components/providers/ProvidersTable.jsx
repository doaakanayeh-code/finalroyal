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
import AdminTable from "../common/AdminTable";
import ProviderRow from "./ProviderRow";
import EditProviderDialog from "./EditProviderDialog";
import DeleteProviderDialog from "./DeleteProviderDialog";
import ConfirmDialog from "../common/ConfirmDialog";

import {
  blockProvider,
  unblockProvider,
  deleteProvider,
  restoreProvider,
  updateProvider,
} from "../../services/providersService";

const columns = [
  { id: "username", label: "Provider Name", minWidth: 220 },
  { id: "email", label: "Email", minWidth: 220 },
  { id: "phone", label: "Phone", minWidth: 170 },
  { id: "role", label: "Role", minWidth: 120, align: "center" },
  { id: "status", label: "Status", minWidth: 120, align: "center" },
  { id: "created_at", label: "Created At", minWidth: 180, align: "center" },
  { id: "actions", label: "Actions", minWidth: 320, align: "center" },
];

export default function ProvidersTable({
  providers,
  deleted = false,
  reloadProviders,
  reloadStatistics,
}) {
  const [selectedProviderId, setSelectedProviderId] = useState(null);

  const [openDelete, setOpenDelete] = useState(false);
  const [openRestore, setOpenRestore] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [editProvider, setEditProvider] = useState({
    id: "",
    username: "",
    phone: "",
    role: "provider",
    frontImage: null,
    backImage: null,
  });

  const reload = async () => {
    await reloadStatistics();

    if (deleted) {
      await reloadProviders(true);
    } else {
      await reloadProviders();
      await reloadStatistics();
    }
  };

  const handleBlock = async (id) => {
    try {
      await blockProvider(id);
      await reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnblock = async (id) => {
    try {
      await unblockProvider(id);
      await reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProvider(selectedProviderId);

      setOpenDelete(false);
      setSelectedProviderId(null);

      await reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleRestore = async () => {
    try {
      await restoreProvider(selectedProviderId);

      setOpenRestore(false);
      setSelectedProviderId(null);

      await reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();

      formData.append("username", editProvider.username);
      formData.append("identifier", editProvider.phone);

      if (editProvider.frontImage) {
        formData.append("id_img_front", editProvider.frontImage);
      }

      if (editProvider.backImage) {
        formData.append("id_img_back", editProvider.backImage);
      }

      await updateProvider(editProvider.id, formData);

      setOpenEdit(false);

      await reload();
    } catch (err) {
      console.error(err);
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
        {providers.length === 0 ? (
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
          <AdminTable
            columns={columns}
            rows={providers}
            RowComponent={ProviderRow}
            deleted={deleted}
            onEdit={(provider) => {
              setEditProvider({
                id: provider.id,
                username: provider.username,
                phone: provider.phone,
                role: provider.role,
                frontImage: null,
                backImage: null,
              });

              setOpenEdit(true);
            }}
            onDelete={(id) => {
              setSelectedProviderId(id);
              setOpenDelete(true);
            }}
            onRestore={(id) => {
              setSelectedProviderId(id);
              setOpenRestore(true);
            }}
            onBlock={handleBlock}
            onUnblock={handleUnblock}
          />
        )}
      </Paper>

      <EditProviderDialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        editProvider={editProvider}
        setEditProvider={setEditProvider}
        onSave={handleUpdate}
      />

      <DeleteProviderDialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onDelete={handleDelete}
      />

      <ConfirmDialog
        open={openRestore}
        onClose={() => setOpenRestore(false)}
        title="Restore Provider"
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
          Are you sure you want to restore this provider?
        </Typography>
      </ConfirmDialog>
    </>
  );
}
