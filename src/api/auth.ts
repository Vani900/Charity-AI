import API, { API_BASE_URL } from "./client";

export const registerUser = async (data: any) => {
  return API.post("/auth/register", data);
};

export const loginUser = async (data: any) => {
  return API.post("/auth/login", data);
};

export const sendOtp = async (data: { phone: string }) => {
  return API.post("/auth/send-otp", data);
};

export const verifyOtp = async (data: { phone: string; otp: string }) => {
  return API.post("/auth/verify-otp", data);
};

export const forgotPassword = async (data: { email: string }) => {
  return API.post("/auth/forgot-password", data);
};

export const getProfile = async () => {
  return API.get("/auth/profile");
};

export const updateProfile = async (data: { name?: string; phone?: string; address?: string }) => {
  return API.put("/auth/profile", data);
};

