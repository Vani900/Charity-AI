import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const API = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptors to add JWT
API.interceptors.request.use((req) => {
  const storedUser = localStorage.getItem("charityai_user");
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      if (user.token) {
        req.headers.Authorization = `Bearer ${user.token}`;
      }
    } catch (e) {
      console.error("Failed to parse token", e);
    }
  }
  return req;
});

// Interceptor to handle 401 and refresh token
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    // 1. Format the error message consistently so components don't crash when reading err.response.data.message
    if (!error.response) {
      error.message = "Network Error: Please check your internet connection.";
    } else {
      error.message = error.response?.data?.message || "An unexpected error occurred.";
    }

    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(`${API_BASE_URL}/auth/refresh`, {}, { withCredentials: true });
        if (res.data.success) {
          const storedUser = localStorage.getItem("charityai_user");
          if (storedUser) {
            const user = JSON.parse(storedUser);
            user.token = res.data.data.token;
            localStorage.setItem("charityai_user", JSON.stringify(user));
          }
          originalRequest.headers.Authorization = `Bearer ${res.data.data.token}`;
          return API(originalRequest);
        }
      } catch (refreshError) {
        // If refresh fails, log out
        localStorage.removeItem("charityai_user");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default API;
