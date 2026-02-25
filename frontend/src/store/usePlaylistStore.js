import {create} from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const usePlaylistStore = create((set, get) => ({
    playlists: [],
    currentPlaylist: null,
    isLoading: false,
    error: null,

    createPlaylist: async (data) => {
        set({isLoading: true});
        try {
            const res = await axiosInstance.post("playlist/create", data);
            set((state) => ({playlists: [...state.playlists, res.data.playlist]}));
            toast.success(res.data.message || "Playlist created successfully");
        } catch (error) {
            console.error("Error creating playlist", error);
            toast.error("Error creating playlist");
        } finally {
            set({isLoading: false});
        }
    },

    getAllPlaylists: async () => {
        set({isLoading: true});
        try {
            const res = await axiosInstance.get("/playlist");
            set({playlists: res.data.playlists});
        } catch (error) {
            console.error("Error getting all playlist", error);
            toast.error("Error getting all playlists");
        } finally {
            set({isLoading: false});
        }
    },

    getPlaylistDetails: async (playlistId) => {
        set({isLoading: true});
        try {
            const res = await axiosInstance.get(`/playlist/${playlistId}`);
            set({currentPlaylist: res.data.playlist});
        } catch (error) {
            console.error("Error getting the required playlist", error);
            toast.error("Error getting the required playlist");
        } finally {
            set({isLoading: false});
        }
    },

    addProblemToPlaylist: async (playlistId, problemIds) => {
        try{
            set({isLoading: true})
            await axiosInstance.post(`/playlist/${playlistId}/add-problem`, {problemIds});
            toast.success("Problem got added");

            //Refresh the current playlists
            if(get().currentPlaylist?.id === playlistId) {
                await get().getPlaylistDetails(playlistId);
            }
        } catch(error) {
            console.error("Error adding problem to playlist", error);
            toast.error("Error adding problem to playlist")
        } finally {
            set({isLoading: false})
        }
    }
}))