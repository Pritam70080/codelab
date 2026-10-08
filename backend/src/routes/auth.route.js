import express from "express";

import { register, login, verifyEmail, getProfile, logout, updateProfile } from "../controllers/auth.controller.js";
import { isLoggedin } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.get("/verify-email/:token", verifyEmail);
authRouter.post("/login", login);
authRouter.get("/get-profile", isLoggedin, getProfile);
authRouter.get("/logout", isLoggedin, logout);
authRouter.put("/update-profile", isLoggedin, upload.single("profileImage"), updateProfile);

export default authRouter;