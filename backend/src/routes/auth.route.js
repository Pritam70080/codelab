import express from "express";

import { register, login, verifyEmail, getProfile, logout } from "../controllers/auth.controller.js";
import { isLoggedin } from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.get("/verify/:token", verifyEmail);
authRouter.post("/login", login);
authRouter.get("/get-profile", isLoggedin, getProfile);
authRouter.get("/logout", isLoggedin, logout);

export default authRouter;