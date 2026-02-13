import {create} from "zustand";
import toast from "react-hot-toast";
import {axiosInstance} from "../lib/axios.js";

export const useAuthStore = create((set) => ({
    authUser: null,
    isLoggingIn: false,
    isSigningUp: false,
    isCheckingAuth: false,

    login: async (data) => {
        set({isLoggingIn: true});
        try {
            const res = await axiosInstance.post("/auth/login", data);
            
            set({authUser: res.data.user})
            toast.success(res.data.message);
        } catch (error) {
            console.error("Error loging in user", error);
            toast.error("Error logging in");
            set({authUser: null})
        } finally {
            set({isLoggingIn: false});
        }

    },

    signup: async (data) => {
        set({isSigningUp: true});
        try {
            const res = await axiosInstance.post("/auth/register", data);
            set({authUser: res.data.user});
            toast.success(res.data.message);
        } catch (error) {
            console.error("Error signing up user", error);
            toast.error("Error signing up")
        } finally {
            set({isSigningUp: false});
        }
    },

    checkAuth: async () => {
        set({isCheckingAuth: true});
        try {
            const {data} = await axiosInstance.get("/auth/get-profile");
            set({authUser: data.user});
        } catch (error) {
            console.error("Error checking auth", error);
        } finally {
            set({isCheckingAuth: false});
        }
    },

    logout: async () => {
        try {
            const {data} = await axiosInstance.get("/auth/logout");
            toast.success(data.message);
            set({authUser: null});
        } catch (error) {
            console.error("Error logging out user", error);
            toast.error("Error logging out");
        }
    }

}))

