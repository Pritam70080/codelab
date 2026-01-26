import express from "express";

import {isLoggedin} from "../middlewares/auth.middleware.js";
import { executeCode } from "../controllers/executeCode.controller.js";

const executionRouter = express.Router();

executionRouter.post("/", isLoggedin, executeCode);

export default executionRouter;