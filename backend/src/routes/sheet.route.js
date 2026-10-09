import express from "express";

import {
    addProblemsToSheet,
    createSheet,
    getAllSheets,
    getSheetById,
    getSheetProblem,
    getSheetProgress,
    reorderSheetProblems,
    updateSheet
} from "../controllers/sheet.controller.js";
import { isAdmin, isLoggedin } from "../middlewares/auth.middleware.js";

const sheetRouter = express.Router();

sheetRouter.get("/", isLoggedin, getAllSheets);
sheetRouter.post("/", isLoggedin, isAdmin, createSheet);
sheetRouter.get("/:sheetId/progress", isLoggedin, getSheetProgress);
sheetRouter.get("/:sheetId/problems/:problemId", isLoggedin, getSheetProblem);
sheetRouter.post("/:sheetId/problems", isLoggedin, isAdmin, addProblemsToSheet);
sheetRouter.patch("/:sheetId/problem-order", isLoggedin, isAdmin, reorderSheetProblems);
sheetRouter.get("/:sheetId", isLoggedin, getSheetById);
sheetRouter.put("/:sheetId", isLoggedin, isAdmin, updateSheet);

export default sheetRouter;