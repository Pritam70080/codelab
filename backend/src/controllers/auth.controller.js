import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { db } from "../libs/db.js";
import sendVerificationEmail from "../libs/sendMail.js";
import { UserRole } from "../generated/prisma/enums.ts";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({
                message: "All fields are required !",
                success: false
            })
        }
        const existingUser = await db.User.findUnique({
            where: {
                email
            }
        });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
                success: false
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const verificationToken = await jwt.sign({ id: email }, process.env.VERIFICATION_SECRET, { expiresIn: process.env.VERIFICATION_EXPIRY || "10m" });
        const newUser = await db.User.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: UserRole.USER,
                verificationToken
            }
        });
        if (!newUser) {
            return res.status(400).json({
                message: "User couldn't created",
                success: false
            })
        }
        const sentMail = await sendVerificationEmail(email, verificationToken);
        if (!sentMail) {
            res.status(400).json({
                message: "Error in sending mail",
                success: false
            })
        }
        return res.status(201).json({
            message: "User created successfully",
            success: true,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                image: newUser.email,
                role: newUser.role
            }
        });
    } catch (error) {
        console.error("Error in creating user", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }


}

export const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;
        if (!token) {
            return res.status(400).json({
                message: "No token provided",
                success: false
            });
        }
        const decoded = await jwt.verify(token, process.env.VERIFICATION_SECRET);
        const user = await db.User.findUnique({
            where: {
                email: decoded.id,
                verificationToken: token
            }
        });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }
        await db.User.update({
            where: {
                id: user.id
            },
            data: {
                verificationToken: null,
                isVerified: true
            }
        });
        return res.status(200).json({
            message: "User verified successfully",
            success: true
        });
    } catch (error) {
        console.error("Error verifying user", error);
        return res.status(500).json({
            message: "Token expired",
            success: false
        });
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            })
        }
        const user = await db.User.findUnique({
            where: {
                email
            }
        });
        if(!user) {
            return res.status(404).json({
                message: "User doesn't exist",
                success: false
            })
        }
        if(!user.isVerified) {
            return res.status(400).json({
                message: "User account is not verified",
                success: false
            })
        }
        const isMatched = await bcrypt.compare(password, user.password);
        if(!isMatched) {
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false
            })
        }  
        const accessToken = await jwt.sign({id: user.id}, process.env.ACCESSTOKEN_SECRET, {expiresIn: process.env.ACCESSTOKEN_EXPIRY});
        const refreshToken = await jwt.sign({id: user.id}, process.env.REFRESHTOKEN_SECRET, {expiresIn: process.env.REFRESHTOKEN_EXPIRY});
        await db.User.update({
            where: {
                id: user.id
            },
            data: {
                refreshToken
            }
        })
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 15 * 60 * 1000
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000
        });
        return res.status(200).json({
            message: "User logged in successfully",
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                image: user.email,
                role: user.role
            }
        })
    } catch (error) {
        console.error("Error logging in user", error);
        return res.status(500).json({
            message: "Internal server error",
            success: true
        })
    }
}

export const getProfile = async (req, res) => {
    try {
        return res.status(200).json({
            message: "User profile accessed",
            success: true,
            user: req.user
        })
    } catch (error) {
        console.error("Error in fecthing user", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

export const logout = async (req, res) => {
    try {
        const user = req.user;
        await db.User.update({
            where: {
                id: user.id
            },
            data: {
                refreshToken: null
            }
        });
        res.cookie("accessToken", null, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 0
        });
        res.cookie("refreshToken", null, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 0
        });
        res.status(200).json({
            message: "User logged out successfully",
            success: true
        });
    } catch (error) {
        console.error("Error logging out user", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}