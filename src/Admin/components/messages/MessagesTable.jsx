import { useState } from "react";
import { Paper, Box, Button } from "@mui/material";

import AdminTable from "../common/AdminTable";
import MessageRow from "./MessageRow";
import ReplyMessageDialog from "./ReplyMessageDialog";

const columns = [
  {
    id: "name",
    label: "Customer",
    minWidth: 220,
  },
  {
    id: "email",
    label: "Email",
    minWidth: 250,
  },
  {
    id: "message",
    label: "Message",
    minWidth: 320,
  },
  {
    id: "status",
    label: "Status",
    minWidth: 130,
    align: "center",
  },
  {
    id: "created_at",
    label: "Date",
    minWidth: 150,
    align: "center",
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 120,
    align: "center",
  },
];

export default function MessagesTable({
  loading,
  messages,
  onReply,
  onDelete,
}) {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [openReply, setOpenReply] = useState(false);

  const handleOpen = (message) => {
    setSelectedMessage(message);
    setOpenReply(true);
  };

  const handleReply = async (reply) => {
    try {
      await onReply(selectedMessage.id, reply);

      setOpenReply(false);
      setSelectedMessage(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await onDelete(id);

      if (selectedMessage?.id === id) {
        setOpenReply(false);
        setSelectedMessage(null);
      }
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
        <AdminTable
          loading={loading}
          columns={columns}
          rows={messages}
          RowComponent={MessageRow}
          onOpen={handleOpen}
          onDelete={handleDelete}
          emptyMessage="No Messages"
        />
      </Paper>

      <ReplyMessageDialog
        open={openReply}
        onClose={() => {
          setOpenReply(false);
          setSelectedMessage(null);
        }}
        message={selectedMessage}
        onReply={handleReply}
      />
    </>
  );
}
