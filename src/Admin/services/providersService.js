import api from "./adminApi";

// =========================
// Get Providers
// =========================
export const getProviders = async () => {
  const { data } = await api.get("/providers");
  return data;
};

// =========================
// Statistics
// =========================
export const getProviderStatistics = async () => {
  const response = await api.get("/admin/users-statistics");

  return {
    total: response.data.providers_stats?.total ?? 0,
    active: response.data.providers_stats?.active ?? 0,
    blocked: response.data.providers_stats?.blocked ?? 0,
    deleted: response.data.providers_stats?.deleted ?? 0,
  };
};

// =========================
// Filter
// =========================
export const filterProviders = async ({
  search = "",
  status = "",
  deleted = false,
}) => {
  const params = new URLSearchParams();

  if (search) params.append("search", search);

  if (status) params.append("status", status);

  if (deleted) params.append("trash", "only");

  const { data } = await api.get(
    `/admin/filtered-providers?${params.toString()}`,
  );

  return data.providers;
};

// =========================
// Add Provider
// =========================
export const addProvider = async (formData) => {
  const { data } = await api.post("/admin/providers/add", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

// =========================
// Update Provider
// =========================
export const updateProvider = async (id, provider) => {
  const { data } = await api.post(`/providers/${id}`, provider);
  return data;
};
// =========================
// Delete Provider
// =========================
export const deleteProvider = async (id) => {
  const { data } = await api.delete(`/providers/${id}`);
  return data;
};

// =========================
// Block Provider
// =========================
export const blockProvider = async (id) => {
  const { data } = await api.post(`/admin/users/${id}/block`);
  return data;
};

// =========================
// Unblock Provider
// =========================
export const unblockProvider = async (id) => {
  const { data } = await api.post(`/admin/users/${id}/unblock`);
  return data;
};
// ================= RESTORE =================

export const restoreProvider = async (id) => {
  const { data } = await api.post(`/admin/users/${id}/restore`);
  return data;
};
