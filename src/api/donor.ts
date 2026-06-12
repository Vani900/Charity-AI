import API from "./client";

export const getNearbyNgos = async (lat: number, lng: number) => {
  return API.get(`/donations/nearby-ngos?latitude=${lat}&longitude=${lng}`);
};

export const createDonation = async (data: FormData | any) => {
  const isFormData = data instanceof FormData;
  return API.post("/donations", data, {
    headers: isFormData ? { "Content-Type": "multipart/form-data" } : undefined,
  });
};

export const getMyDonations = async (page = 1, limit = 10) => {
  return API.get(`/donations/my-history?page=${page}&limit=${limit}`);
};

export const getDonationTracking = async (id: string) => {
  return API.get(`/donations/${id}/tracking`);
};

export const getAiMatch = async (items: string, lat?: number, lng?: number) => {
  const params = new URLSearchParams({ items });
  if (lat !== undefined) params.append("latitude", String(lat));
  if (lng !== undefined) params.append("longitude", String(lng));
  return API.get(`/donations/ai-match?${params.toString()}`);
};
