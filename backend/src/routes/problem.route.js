import express from "express";

import { createProblem, deleteProblem, getAllProblems, getAllProblemsSolvedByUser, getProblemById, updateProblem } from "../controllers/problem.controller.js";
import { isAdmin, isLoggedin } from "../middlewares/auth.middleware.js";

const problemRouter = express.Router();

problemRouter.post("/create-problem", isLoggedin, isAdmin, createProblem);
problemRouter.get("/get-all-problems", isLoggedin, getAllProblems);
problemRouter.get("/get-problem/:id", isLoggedin, getProblemById);
problemRouter.put("/update-problem/:id", isLoggedin, isAdmin, updateProblem);
problemRouter.delete("/delete-problem/:id", isLoggedin, isAdmin, deleteProblem);
problemRouter.get("/get-solved-problems", isLoggedin, getAllProblemsSolvedByUser);

export default problemRouter;