const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const registerNgo = async (data: any) => {
  await delay(800);
  return { data: { success: true, message: "NGO Registered", token: "mock_jwt_token", user: { role: 'ngo' } } };
};

export const postRequirement = async (data: any) => {
  await delay(800);
  return { data: { success: true, message: "Requirement posted" } };
};

export const getNgoDashboard = async () => {
  await delay(800);
  return {
    data: {
      success: true,
      data: {
        totalDonations: 156,
        activePickups: 12,
        peopleHelped: 450,
      }
    }
  };
};

export const updateDonationStatus = async (id: string, status: 'pending'|'accepted'|'in_transit'|'delivered'|'cancelled', note?: string, location?: {longitude: number, latitude: number}) => {
  await delay(500);
  return { data: { success: true, message: "Status updated" } };
};

export const uploadNgoDocs = async (formData: FormData) => {
  await delay(1200);
  return { data: { success: true, message: "Documents uploaded" } };
};
