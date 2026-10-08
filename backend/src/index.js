import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import {authRouter, executionRouter, playlistRouter, problemRouter, submissionRouter} from "./routes/index.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(urlencoded({extended: true}));
app.use(cors({
    origin: [process.env.FRONTEND_URL, process.env.BASE_URL],
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
    credentials: true
}));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello from CodeLab ❤️");
})

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/problems", problemRouter);
app.use("/api/v1/execute-code", executionRouter);
app.use("/api/v1/submission", submissionRouter);
app.use("/api/v1/playlist", playlistRouter);
app.use((req, res) => {
    res.status(404).json({ message: "Route not found", success: false });
})


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => { console.log(`Server is listening at port: ${PORT}`); })