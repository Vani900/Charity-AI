const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getAdminStats = async () => {
  await delay(800);
  return { data: { success: true, data: { totalUsers: 15420, activeCampaigns: 432, fraudAlerts: 12 } } };
};

export const getPendingNgos = async () => {
  await delay(800);
  return { data: { success: true, data: [{ id: '1', name: 'Global Help', documents: 'verified' }] } };
};

export const approveNgo = async (id: string, status: "approved" | "rejected") => {
  await delay(500);
  return { data: { success: true, message: `NGO ${status}` } };
};

export const getFraudAlerts = async () => {
  await delay(800);
  return { data: { success: true, data: [{ id: 'alert1', reason: 'Multiple failed logins' }] } };
};
