import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { db } from "../libs/db.js";
import sendVerificationEmail from "../libs/sendMail.js";
import { deleteFromCloudinary, uploadToCloudinary } from "../libs/cloudinary.js";
import { UserRole } from "../generated/prisma/enums.ts";
import { unlink } from "node:fs/promises";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required !",
                success: false
            })
        }
        const existingUser = await db.user.findUnique({
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
        const newUser = await db.user.create({
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
            return res.status(400).json({
                message: "Error in sending mail",
                success: false
            })
        }
        return res.status(201).json({
            message: "Please verify your email address to complete your registration.",
            success: true,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                image: newUser.imageUrl,
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
                message: "Verification token is required",
                success: false
            });
        }

        let decoded;

        try {
            decoded = jwt.verify(
                token,
                process.env.VERIFICATION_SECRET
            );
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(400).json({
                    message: "Verification link has expired",
                    success: false
                });
            }

            return res.status(400).json({
                message: "Invalid verification token",
                success: false
            });
        }

        const user = await db.user.findUnique({
            where: {
                email: decoded.id,
                verificationToken: token
            }
        });

        if (!user) {
            return res.status(404).json({
                message: "Invalid or already used verification link",
                success: false
            });
        }

        if (user.isVerified) {
            return res.status(400).json({
                message: "Email is already verified",
                success: false
            });
        }

        await db.user.update({
            where: {
                id: user.id
            },
            data: {
                verificationToken: null,
                isVerified: true
            }
        });

        return res.status(200).json({
            message: "Email verified successfully",
            success: true
        });

    } catch (error) {
        console.error("Error verifying user", error);

        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            })
        }
        const user = await db.user.findUnique({
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
            return res.status(409).json({
                message: "User account is not verified",
                success: false
            })
        }
        const isMatched = await bcrypt.compare(password, user.password);
        if(!isMatched) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            })
        }  
        const accessToken = await jwt.sign({id: user.id}, process.env.ACCESSTOKEN_SECRET, {expiresIn: process.env.ACCESSTOKEN_EXPIRY});
        const refreshToken = await jwt.sign({id: user.id}, process.env.REFRESHTOKEN_SECRET, {expiresIn: process.env.REFRESHTOKEN_EXPIRY});
        await db.user.update({
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
                image: user.imageUrl,
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
        await db.user.update({
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

export const updateProfile = async (req, res) => {
    let uploadedImage;
    let updateCommitted = false;

    try {
        const userId = req.user.id;
        const body = req.body ?? {};
        const { name, password } = body;
        const existingUser = await db.user.findUnique({
            where: {
                id: userId
            }
        });
        if (!existingUser) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        const hasName = Object.prototype.hasOwnProperty.call(body, "name");
        const hasPassword = Object.prototype.hasOwnProperty.call(body, "password");

        if (!hasName && !hasPassword && !req.file) {
            return res.status(400).json({
                message: "At least one profile field must be provided",
                success: false
            });
        }

        const data = {};

        if (hasName) {
            if (typeof name !== "string" || !name.trim()) {
                return res.status(400).json({
                    message: "Name must be a non-empty string",
                    success: false
                });
            }
            data.name = name.trim();
        }

        if (hasPassword) {
            if (typeof password !== "string" || password.length === 0) {
                return res.status(400).json({
                    message: "Password must be a non-empty string",
                    success: false
                });
            }
            data.password = await bcrypt.hash(password, 10);
        }

        if (req.file) {
            uploadedImage = await uploadToCloudinary(req.file.path);
            data.imageUrl = uploadedImage.secure_url;
            data.imagePublicId = uploadedImage.public_id;
        }

        const updatedUser = await db.user.update({
            where: { id: userId },
            data
        });
        updateCommitted = true;

        if (uploadedImage && existingUser.imagePublicId) {
            try {
                await deleteFromCloudinary(existingUser.imagePublicId);
            } catch (error) {
                console.error("Error deleting previous profile image from Cloudinary", error);
            }
        }

        return res.status(200).json({
            message: "User profile updated successfully",
            success: true,
            user: {
                id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                image: updatedUser.imageUrl,
                role: updatedUser.role
            }
        });
    } catch (error) {
        if (uploadedImage && !updateCommitted) {
            try {
                await deleteFromCloudinary(uploadedImage.public_id);
            } catch (cleanupError) {
                console.error("Error cleaning up uploaded profile image", cleanupError);
            }
        }

        console.error("Error updating user profile", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    } finally {
        if (req.file?.path) {
            try {
                await unlink(req.file.path);
            } catch (error) {
                if (error.code !== "ENOENT") {
                    console.error("Error removing temporary profile image", error);
                }
            }
        }
    }
}