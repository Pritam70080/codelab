import multer from "multer";
import { mkdir } from "node:fs";
import { randomUUID } from "node:crypto";
import { dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const uploadDirectory = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../../public/uploads"
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    mkdir(uploadDirectory, { recursive: true }, (error) => {
      cb(error, uploadDirectory);
    });
  },
  filename: (req, file, cb) => {
    cb(null, `${randomUUID()}${extname(file.originalname).toLowerCase()}`);
  },
});

export const upload = multer({ storage });