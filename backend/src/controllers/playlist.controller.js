import { db } from "../libs/db.js";

export const createPlaylist = async (req, res) => {
    try {
        const {name, description} = req.body;
        const userId = req.user.id;
        if(!name) {
            return res.status(400).json({
                message: "Name is required",
                success: false
            })
        }
        const existingPlaylist = await db.playlist.findUnique({
            where: {
                name_userId: {
                    name,
                    userId
                }
            }
        });
        if(existingPlaylist) {
            return res.status(400).json({
                message: "Already playlist exist",
                success: false
            })
        }
        const newPlaylist = await db.playlist.create({
            data: {
                name, description, userId
            }
        })
        if(!newPlaylist) {
            return res.status(400).json({
                message: "Playlist couldn't created",
                success: false
            })
        }
        return res.status(201).json({
            message: "Playlist created successfully",
            success: true,
            playlist: newPlaylist
        })
    } catch (error) {
        console.error("Error creating playlist", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

export const addProblemsToPlalist = async (req, res) => {
    try {
        const {playlistId} = req.params;
        const {problemIds} = req.body;
        const playlist = await db.playlist.findFirst({
            where: {
                id: playlistId,
                userId: req.user.id
            }
        });
        if(!playlist) {
            return res.status(404).json({
                message: "No such playlist found",
                success: false
            })
        }
        if(!Array.isArray(problemIds) || problemIds.length === 0) {
            return res.status(400).json({
                message: "Invalid or Missing problem Ids",
                success: false
            })
        }
        const problemsInPlaylist = await db.problemsInPlaylist.createMany({
            data: problemIds.map((problemId) => ({
                problemId, playlistId
            })),
            skipDuplicates: true
        });
        if(!problemsInPlaylist) {
            return res.status(400).json({
                message: "Failed to add problems to playlist",
                success: false
            })
        }
        return res.status(201).json({
            message: "Problems added successfully",
            success: true,
            problemsInPlaylist
        })
    } catch (error) {
        console.error("Error adding problem to playlist", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

export const getAllPlaylists = async (req, res) => {
    try {
        const playlists = await db.playlist.findMany({
            where: {
                userId: req.user.id
            },
            include: {
                problems: {
                    include: {
                        problem: true
                    }
                }
            }
        });
        if(!playlists) {
            return res.status(400).json({
                message: "Failed to fetch all playlists",
                success: false
            })
        }
        return res.status(200).json({
            message: "Playlists fetched successfully",
            success: true,
            playlists
        })  
    } catch (error) {
        console.error("Error fetching all playlists");
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

export const getPlaylistById = async (req, res) => {
    try {
        const {playlistId} = req.params;
        const playlist = await db.playlist.findFirst({
            where: {
                userId: req.user.id,
                id: playlistId
            },
            include: {
                problems: {
                    include: {
                        problem: true
                    }
                }
            }
        });
        if(!playlist) {
            return res.status(404).json({
                message: "Failed to fetch required playlist",
                success: false
            })
        }
        return res.status(200).json({
            message: "Playlist fetched successfully",
            success: true,
            playlist
        });     
    } catch (error) {
        console.error("Error fetching the required playlist", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

export const deletePlaylist = async (req, res) => {
    try {
        const {playlistId} = req.params;
        const existingPlaylist = await db.playlist.findFirst({
            where: {
                id: playlistId,
                userId: req.user.id
            }
        })
        if(!existingPlaylist) {
            return res.status(404).json({
                message: "No such playlist found",
                success: false
            })
        }
        const playlist = await db.playlist.delete({
            where: {
                id: playlistId,
            }
        });
        if(!playlist) {
            return res.status(400).json({
                message: "Failed to delete the playlist",
                success: false
            })
        }
        return res.status(200).json({
            message: "Playlist deleted successfully",
            success: true,
            playlist
        })   
    } catch (error) {
        console.error("Error deleting the playlist", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

export const removeProblemFromPlaylist = async (req, res) => {
    try {
        const {playlistId} = req.params;
        const {problemIds} = req.body;
        const playlist = await db.playlist.findFirst({
            where: {
                id: playlistId,
                userId: req.user.id
            }
        });
        if(!playlist) {
            return res.status(400).json({
                message: "No such playlist found",
                success: false
            })
        }
        if(!Array.isArray(problemIds) || problemIds.length === 0) {
            return res.status(400).json({
                message: "Invalid or Missing problem Ids",
                success: false
            })
        }
        const deletedProblems = await db.problemsInPlaylist.deleteMany({
            where: {
                playlistId,
                problemId: {
                    in: problemIds
                }
            }
        });
        if(!deletedProblems) {
            return res.status(400).json({
                message: "Failed to delete problems from playlist",
                success: false
            })
        }
        return res.status(200).json({
            message: "Problems removed from the playlist",
            success: true,
            deletedProblems
        })
    } catch (error) {
        console.error("Error removing problem from playlist", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}