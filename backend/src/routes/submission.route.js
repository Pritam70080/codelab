import express from "express";

import { getAllSubmissions, getSubmissionsCountForProblem, getSubmissionsForProblem } from "../controllers/submission.controller.js";
import { isLoggedin } from "../middlewares/auth.middleware.js";

const submissionRouter = express.Router();

submissionRouter.get("/get-all-submissions", isLoggedin, getAllSubmissions );
submissionRouter.get("/get-submissions/:problemId", isLoggedin, getSubmissionsForProblem );
submissionRouter.get("/get-submissions-count/:problemId", isLoggedin, getSubmissionsCountForProblem);

export default submissionRouter;