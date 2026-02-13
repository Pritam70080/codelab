import { create } from "zustand";
import {axiosInstance} from "../lib/axios.js";
import toast from "react-hot-toast";

export const useProblemStore = create((set) => ({
    problems: [],
    problem: null,
    solvedProblems: [],
    isProblemsLoading: false,
    isProblemLoading: false,

    getAllProblems: async () => {
        try {
            set({isProblemsLoading: true});
            const res = await axiosInstance.get("/problems/get-all-problems");
            set({problems: res.data.problems});
        } catch (error) {
            toast.error("Error getting problems");
            console.error("Failed to get all problems", error);
        } finally {
            set({isProblemsLoading: false});
        }
    },

    getProblemById: async (id) => {
        try {
            set({isProblemLoading: true});
            const res = await  axiosInstance.get(`/problems/get-problem/${id}`);
            set({problem: res.data.problem});
            toast.success(res.data.message);
        } catch (error) {
            toast.error("Error getting the problem");
            console.error("Failed to get required problem", error);
        } finally {
            set({isProblemLoading: false});
        }
    },

    getSolvedProblems: async () => {
        try {
            set({isProblemsLoading: true});
            const res = await axiosInstance.get("/problems/get-solved-problems");
            set({solvedProblems: res.data.problems});

        } catch (error) {
            toast.error("Failed to get all solved problems");
            console.error("Failed to get all solved problems", error);
        } finally {
            set({isProblemsLoading: false});
        }
    }
}))