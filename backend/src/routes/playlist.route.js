import express from "express";

import { isLoggedin } from "../middlewares/auth.middleware.js";
import { addProblemsToPlalist, createPlaylist, deletePlaylist, getAllPlaylists, getPlaylistById, removeProblemFromPlaylist } from "../controllers/playlist.controller.js";

const playlistRouter = express.Router();

playlistRouter.get("/", isLoggedin, getAllPlaylists);
playlistRouter.post("/create", isLoggedin, createPlaylist);
playlistRouter.get("/:playlistId", isLoggedin, getPlaylistById);
playlistRouter.delete("/:playlistId", isLoggedin, deletePlaylist);
playlistRouter.post("/:playlistId/add-problem", isLoggedin, addProblemsToPlalist);
playlistRouter.delete("/:playlistId/remove-problem", isLoggedin, removeProblemFromPlaylist)

export default playlistRouter;