import express from "express";

import {isLoggedin} from "../middlewares/auth.middleware.js";
import { executeCode, submitCode } from "../controllers/executeCode.controller.js";

const executionRouter = express.Router();

executionRouter.post("/", isLoggedin, executeCode);
executionRouter.post("/submit", isLoggedin, submitCode);

export default executionRouter;