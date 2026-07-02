import api from "./adminApi";

// ================= USERS =================

export const getUsers = async () => {
  const { data } = await api.get("/admin/users");
  return data.users;
};

export const updateUser = async (id, user) => {
  const { data } = await api.post(`/admin/users/${id}`, user);
  return data;
};

// ================= DELETE (Soft Delete) =================

export const deleteUser = async (id) => {
  const { data } = await api.delete(`/admin/users/${id}/soft-delete`);
  return data;
};

// ================= RESTORE =================

export const restoreUser = async (id) => {
  const { data } = await api.post(`/admin/users/${id}/restore`);
  return data;
};

// ================= BLOCK =================

export const blockUser = async (id) => {
  const { data } = await api.post(`/admin/users/${id}/block`);
  return data;
};

export const unblockUser = async (id) => {
  const { data } = await api.post(`/admin/users/${id}/unblock`);
  return data;
};

// ================= FILTER =================

export const getDeletedUsers = async () => {
  const { data } = await api.get("/admin/filtered-users?trash=only");
  return data.users;
};

export const filterUsers = async ({
  search = "",
  status = "",
  deleted = false,
}) => {
  const params = new URLSearchParams();

  if (search) params.append("search", search);

  if (status) params.append("status", status);

  if (deleted) params.append("trash", "only");

  const { data } = await api.get(`/admin/filtered-users?${params.toString()}`);

  return data.users;
};

// ================= STATISTICS =================

export const getStatistics = async () => {
  const response = await api.get("/admin/users-statistics");

  return {
    total: response.data.users_stats?.total ?? 0,
    active: response.data.users_stats?.active ?? 0,
    blocked: response.data.users_stats?.blocked ?? 0,
    deleted: response.data.users_stats?.deleted ?? 0,
  };
};

// ================= ADD USER =================

export const addUser = async (formData) => {
  const { data } = await api.post("/users/add", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

// ================= EXPORT =================

export const exportUsers = async () => {
  const response = await api.get("/users/export", {
    responseType: "blob",
  });

  return response;
};
