import express from "express";

import { createProblem } from "../controllers/problem.controller.js";
import { isAdmin, isLoggedin } from "../middlewares/auth.middleware.js";

const problemRouter = express.Router();

problemRouter.post("/create-problem", isLoggedin, isAdmin, createProblem);

export default problemRouter;