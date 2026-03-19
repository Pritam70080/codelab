import { create } from "zustand";
import toast from "react-hot-toast";

import { axiosInstance } from "../lib/axios.js";

export const useSubmissionStore = create((set) => ({
    isSubmissionLoading: false,
    submissions: [],
    submissionsForProblem: [],
    submissionCount: 0,

    getAllSubmissions: async () => {
        set({ isSubmissionLoading: true });
        try {
            const res = await axiosInstance.get("/submission/get-all-submissions");
            set({ submissions: res.data.submissions });

        } catch (error) {
            console.error("Error getting all submissions: ", error);
            toast.error("Error getting all submissions");
        } finally {
            set({ isSubmissionLoading: false });
        }
    },

    getSubmissionForProblem: async (problemId) => {
        try {
            set({ isSubmissionLoading: true });
            const res = await axiosInstance.get(`/submission/get-submissions/${problemId}`);
            set({ submissionsForProblem: res.data.submissions })
        } catch (error) {
            console.error("Error getting submissions for the problem: ", error);
            toast.error("Error getting submissions");
        } finally {
            set({ isSubmissionLoading: false });
        }
    },

    getSubmissionCountForProblem: async (problemId) => {
        try {
            const res = await axiosInstance.get(`/submission/get-submissions-count/${problemId}`);
            set({ submissionCount: res.data.count });
        } catch (error) {
            console.log("Error getting submission count for problem", error);
            toast.error("Error getting submission count for problem");
        }
    }
}));