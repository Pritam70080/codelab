import { db } from "../libs/db.js";
import jwt from "jsonwebtoken";

export const isLoggedin = async (req, res, next) => {
    try {
        const accessToken = req.cookies?.accessToken;
        const refreshToken = req.cookies?.refreshToken;
        if (!accessToken && !refreshToken) {
            return res.status(401).json({
                message: "Please login to access the service",
                success: false
            })
        }
        if (accessToken) {
            try {
                const accessTokenDecoded = await jwt.verify(accessToken, process.env.ACCESSTOKEN_SECRET);
                const user = await db.user.findUnique({
                    where: {
                        id: accessTokenDecoded.id
                    },
                    select: {
                        id: true,
                        name: true,
                        image: true,
                        email: true,
                        role: true
                    }
                });
                if (!user) {
                    throw new Error("User not found");
                }
                req.user = user;
                return next();
            } catch (error) {
                console.log("Access Token is expired", error);
            }
        }
        if (!refreshToken) {
            return res.status(401).json({
                message: "Unauthorized access",
                success: false
            })
        }
        const refreshTokenDecoded = await jwt.verify(refreshToken, process.env.REFRESHTOKEN_SECRET);
        const user = await db.user.findUnique({
            where: {
                id: refreshTokenDecoded.id
            },
            select: {
                id: true,
                name: true,
                image: true,
                email: true,
                role: true
            }
        });
        if (!user) {
            return res.status(401).json({
                message: "Unauthorized access",
                success: false
            })
        }
        const newRefreshToken = await jwt.sign({ id: user.id }, process.env.REFRESHTOKEN_SECRET, { expiresIn: process.env.REFRESHTOKEN_EXPIRY || "1d" });
        const newAccessToken = await jwt.sign({ id: user.id }, process.env.ACCESSTOKEN_SECRET, { expiresIn: process.env.ACCESSTOKEN_EXPIRY || "15m" });
        await db.user.update(
            {
                where: {
                    id: user.id
                },
                data: {
                    refreshToken: newRefreshToken
                }
            });
        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            ssecure: true,
            sameSite: "none",
            maxAge: 15 * 60 * 1000
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            ssecure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000
        });
        req.user = user;
        return next();
    } catch (error) {
        console.error("Error validating tokens", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

export const isAdmin = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        if(!userId) {
            return res.status(401).json({
                message: " User Authentication failed",
                success: false
            })
        }
        const user = await db.user.findUnique({
            where: {
                id: userId
            },
            select: {
                role: true
            }
        })
        if(!user || user.role !== "ADMIN") {
            return res.status(403).json({
                message: "Forbidden - You are not allowed to perform the operation",
                success: false
            })
        }
        next();
    } catch (error) {
        console.error("Error checking Role", error);
        return res.status(500).json({
            messaage: "Internal server error",
            success: false
        })
    }
}