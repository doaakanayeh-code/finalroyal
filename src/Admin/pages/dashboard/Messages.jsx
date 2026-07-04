import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import MessageStatistics from "../../components/messages/MessageStatistics";
import MessagesTable from "../../components/messages/MessagesTable";

import {
  getMessages,
  replyMessage,
  deleteMessage,
} from "../../services/messagesService";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMessages = async () => {
    try {
      setLoading(true);

      const data = await getMessages();

      setMessages(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const statistics = useMemo(() => {
    return {
      total: messages.length,
      pending: messages.filter((m) => m.status === "pending").length,
      replied: messages.filter((m) => m.status === "replied").length,
    };
  }, [messages]);

  const handleReply = async (id, reply) => {
    try {
      await replyMessage(id, reply);
      loadMessages();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMessage(id);
      loadMessages();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container maxWidth="xl">
      <Box py={4}>
        {/* Header */}

        <Box
          sx={{
            mb: 5,
          }}
        >
          {" "}
          <Typography
            sx={{
              fontSize: "58px",
              fontWeight: 700,
              color: "#7C5664",
              fontFamily: "'Playfair Display', Georgia, serif",
              lineHeight: 1.2,
            }}
          >
            Contact Messages
          </Typography>
          <Typography
            sx={{
              mt: 1,
              color: "#6E6A6A",
              fontSize: "22px",
            }}
          >
            Manage customer inquiries, review messages and respond quickly to
            maintain excellent communication.
          </Typography>
        </Box>

        {/* Statistics */}

        <Box
          sx={{
            mb: 5,
          }}
        >
          <MessageStatistics
            statistics={statistics}
            activeFilter={null}
            onFilterChange={() => {}}
          />
        </Box>

        {/* Table */}

        <MessagesTable
          loading={loading}
          messages={messages}
          onReply={handleReply}
          onDelete={handleDelete}
        />
      </Box>
    </Container>
  );
}
