import { create } from "zustand";
import axios from "axios";
import CheckAdmin from "../Store/CheckAdmin";

axios.defaults.withCredentials = true;
axios.defaults.baseURL =
  process.env.NODE_ENV === "production" ? "/api" : "http://localhost:5000/api";
export const useAuth = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  isAuthenticated: !!localStorage.getItem("user"),
  error: null,
  isLoading: false,
  isAdmin: false,
  isAdminLoading: true,

  setIsAdmin: (isAdmin) => set({ isAdmin }),

  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ isAuthenticated: !!token });
  },

  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user, isAuthenticated: true });
  },

  signup: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post("/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const { user, token } = response.data;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      const isAdmin = await CheckAdmin();
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        isAdmin,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post("/login", { email, password });
      const { user, token } = response.data;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      const isAdmin = await CheckAdmin();
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        isAdmin,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error logging in",
        isLoading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post("/logout");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      set({
        user: null,
        isAuthenticated: false,
        isAdmin: false,
        isAdminLoading: false,
        isLoading: false,
      });
    } catch (error) {
      set({ error: "Error logging out", isLoading: false });
      throw error;
    }
  },

  checkAdminOnLoad: async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const isAdmin = await CheckAdmin();
      set({
        user,
        isAuthenticated: true,
        isAdmin,
        isAdminLoading: false,
      });
    } else {
      set({ isAdminLoading: false });
    }
  },
}));

useAuth.getState().checkAdminOnLoad();
