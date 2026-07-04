import api from "./adminApi";

// ================= GET ALL MESSAGES =================

export const getMessages = async () => {
  const { data } = await api.get("/admin/messages");
  return data.messages;
};

// ================= GET ONE MESSAGE =================

export const getMessage = async (id) => {
  const { data } = await api.get(`/admin/messages/${id}`);
  return data.message;
};

// ================= REPLY =================

export const replyMessage = async (id, admin_reply) => {
  const { data } = await api.post(`/messages/${id}/reply`, {
    admin_reply,
  });

  return data;
};

// ================= DELETE =================

export const deleteMessage = async (id) => {
  const { data } = await api.delete(`/admin/messages/${id}`);
  return data;
};
