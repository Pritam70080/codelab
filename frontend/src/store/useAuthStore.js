import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";

export const useAuthStore = create((set) => ({
    authUser: null,
    isLoggingIn: false,
    isSigningUp: false,
    isCheckingAuth: false,
    isVerifyingEmail: false,

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);

            set({ authUser: res.data.user })
            toast.success(res.data.message);
        } catch (error) {
            console.error("Error loging in user", error);
            const message =
        error.response?.data?.message ||
        "Error logging in";
            set({ authUser: null })
            toast.error(message);
        } finally {
            set({ isLoggingIn: false });
        }

    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/register", data);
            toast.success(res.data.message);
        } catch (error) {
            console.error("Error signing up user", error);
            set({ authUser: null });
            toast.error("Error signing up");
        } finally {
            set({ isSigningUp: false });
        }
    },

    checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
            const { data } = await axiosInstance.get("/auth/get-profile");
            set({ authUser: data.user });
        } catch (error) {
            set({ authUser: null });
            console.error("Error checking auth", error);
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    logout: async () => {
        try {
            const { data } = await axiosInstance.get("/auth/logout");
            toast.success(data.message);
            set({ authUser: null });
        } catch (error) {
            console.error("Error logging out user", error);
            toast.error("Error logging out");
        }
    },
    verifyEmail: async (token) => {
        set({ isVerifyingEmail: true });

        try {
            const res = await axiosInstance.get(`/auth/verify-email/${token}`);

            return {
                success: true,
                message: res.data.message
            };

        } catch (error) {
            console.error("Error verifying email", error);

            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Unable to verify email"
            };

        } finally {
            set({ isVerifyingEmail: false });
        }
    },

}))

