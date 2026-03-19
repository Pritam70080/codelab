import { create } from "zustand";
import toast from "react-hot-toast";

import { axiosInstance } from "../lib/axios.js";

export const useExecutionStore = create((set) => ({
    isExecuting: false,
    submission: null,
    executeCode: async (source_code, language_id, stdin, expected_outputs) => {
        try {
            set({isExecuting: true});
            console.log("Submissions: ", JSON.stringify({
                source_code,
                language_id,
                stdin,
                expected_outputs
            }))
            const res = await axiosInstance.post("/execute-code", {source_code, language_id, stdin, expected_outputs});
            set({submission: res.data.submission});
            toast.success(res.data.message);
        } catch (error) {
            console.error("Error executing code: ", error);
            set({submission: null});
            toast.error("Error executing code 🙁");
        } finally {
            set({isExecuting: false});
        }
    },
    submitCode: async (source_code, language_id, stdin, problemId, expected_outputs) => {
        try {
            set({isExecuting: true});

            console.log("Submissions: ", JSON.stringify({
                source_code,
                language_id,
                stdin,
                expected_outputs
            }))

            const res = await axiosInstance.post("/execute-code/submit", {source_code, language_id, stdin, problemId, expected_outputs});

            set({submission: res.data.submission});
            
            toast.success(res.data.message);
        } catch (error) {
            console.error("Error submitting code: ", error);
            set({submission: null});
            toast.error("Error submitting code 🙁");
        } finally {
            set({isExecuting: false});
        }
    },
    clearSubmission: () => {
        set({submission: null});
    }
}))