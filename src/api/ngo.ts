import API from "./client";

export const registerNgo = async (data: any) => {
  return API.post("/auth/register", { ...data, role: "ngo" });
};

export const postRequirement = async (data: any) => {
  return API.post("/ngo/requirements", data);
};

export const getNgoDashboard = async () => {
  return API.get("/ngo/dashboard");
};

export const updateDonationStatus = async (
  id: string,
  status: "pending" | "accepted" | "in_transit" | "delivered" | "cancelled",
  note?: string,
  location?: { longitude: number; latitude: number }
) => {
  return API.put(`/ngo/donations/${id}/status`, { status, note, location });
};

export const uploadNgoDocs = async (formData: FormData) => {
  return API.post("/ngo/upload-docs", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getNgoRequirements = async () => {
  return API.get("/ngo/requirements");
};
