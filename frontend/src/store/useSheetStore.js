import { create } from "zustand";
import toast from "react-hot-toast";

import { axiosInstance } from "../lib/axios.js";

export const useSheetStore = create((set) => ({
  sheets: [],
  currentSheet: null,
  isLoadingSheets: false,
  isLoadingSheet: false,
  isSavingSheet: false,
  currentSheetProgress: null,

  getSheets: async ({ mine = false } = {}) => {
    set({ isLoadingSheets: true });
    try {
      const response = await axiosInstance.get("/sheet", {
        params: mine ? { mine: true } : undefined,
      });
      set({ sheets: response.data.sheets });
      return response.data.sheets;
    } catch (error) {
      console.error("Error fetching sheets", error);
      toast.error(error.response?.data?.message || "Unable to load sheets");
      return [];
    } finally {
      set({ isLoadingSheets: false });
    }
  },

  getSheetDetails: async (sheetId) => {
    set({ isLoadingSheet: true, currentSheet: null, currentSheetProgress: null });
    try {
      const response = await axiosInstance.get(`/sheet/${sheetId}`);
      set({ currentSheet: response.data.sheet });
      return response.data.sheet;
    } catch (error) {
      console.error("Error fetching sheet details", error);
      toast.error(error.response?.data?.message || "Unable to load this sheet");
      return null;
    } finally {
      set({ isLoadingSheet: false });
    }
  },

  getSheetProgress: async (sheetId) => {
    try {
      const response = await axiosInstance.get(`/sheet/${sheetId}/progress`);
      set({ currentSheetProgress: response.data.progress });
      return response.data.progress;
    } catch (error) {
      console.error("Error fetching sheet progress", error);
      toast.error(error.response?.data?.message || "Unable to load sheet progress");
      return null;
    }
  },

  createSheet: async (sheetData) => {
    set({ isSavingSheet: true });
    try {
      const response = await axiosInstance.post("/sheet", sheetData);
      toast.success(response.data.message || "Sheet created");
      return response.data.sheet;
    } catch (error) {
      console.error("Error creating sheet", error);
      toast.error(error.response?.data?.message || "Unable to create sheet");
      return null;
    } finally {
      set({ isSavingSheet: false });
    }
  },

  updateSheet: async (sheetId, updates) => {
    set({ isSavingSheet: true });
    try {
      const response = await axiosInstance.put(`/sheet/${sheetId}`, updates);
      set((state) => ({
        currentSheet: state.currentSheet?.id === sheetId ? {
          ...state.currentSheet,
          ...response.data.sheet,
        } : state.currentSheet,
        sheets: state.sheets.map((sheet) => sheet.id === sheetId
          ? { ...sheet, ...response.data.sheet }
          : sheet),
      }));
      toast.success(response.data.message || "Sheet updated");
      return response.data.sheet;
    } catch (error) {
      console.error("Error updating sheet", error);
      toast.error(error.response?.data?.message || "Unable to update sheet");
      return null;
    } finally {
      set({ isSavingSheet: false });
    }
  },

  addProblemsToSheet: async (sheetId, problemIds) => {
    set({ isSavingSheet: true });
    try {
      const response = await axiosInstance.post(`/sheet/${sheetId}/problems`, { problemIds });
      toast.success(response.data.message || "Problems added");
      return true;
    } catch (error) {
      console.error("Error adding problems to sheet", error);
      toast.error(error.response?.data?.message || "Unable to add problems");
      return false;
    } finally {
      set({ isSavingSheet: false });
    }
  },

  reorderSheetProblems: async (sheetId, problemIds) => {
    set({ isSavingSheet: true });
    try {
      const response = await axiosInstance.patch(`/sheet/${sheetId}/problem-order`, { problemIds });
      toast.success(response.data.message || "Problem order updated");
      return true;
    } catch (error) {
      console.error("Error reordering sheet problems", error);
      toast.error(error.response?.data?.message || "Unable to reorder problems");
      return false;
    } finally {
      set({ isSavingSheet: false });
    }
  },

  clearCurrentSheet: () => set({ currentSheet: null, currentSheetProgress: null }),
}));
