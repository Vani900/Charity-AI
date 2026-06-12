import API from "./client";

export const getAdminStats = async () => {
  return API.get("/admin/stats");
};

export const getPendingNgos = async () => {
  return API.get("/admin/ngos/pending");
};

export const approveNgo = async (id: string, status: "approved" | "rejected") => {
  return API.put(`/admin/ngos/${id}/approve`, { status });
};

export const getFraudAlerts = async () => {
  return API.get("/admin/fraud");
};
