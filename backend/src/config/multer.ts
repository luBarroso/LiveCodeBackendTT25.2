import { Request } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req: Request, file, callback) {
    let destinationFolder;

    if (file.mimetype.startsWith("video/")) {
      destinationFolder = path.join(__dirname, "..", "..", "uploads", "videos");
    } else if (file.mimetype.startsWith("audio/")) {
      destinationFolder = path.join(__dirname, "..", "..", "uploads", "audios");
    } else {
      destinationFolder = path.join(__dirname, "..", "..", "uploads", "photos");
    }

    fs.mkdirSync(destinationFolder, { recursive: true });

    callback(null, destinationFolder);
  },
  filename: function (req: Request, file, callback) {
    const { userEmail } = req.body;
    const normalizedFilename = file.originalname
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    callback(null, Date.now() + "_" + normalizedFilename);
  },
});

const photoUpload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 50,
    files: 9,
  },
  fileFilter: function (req: Request, file, callback) {
    const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg"];

    if (!allowedFileTypes.includes(file.mimetype)) {
      const messages = "Somente jpg, jpeg e png são suportados";

      return callback(new Error(messages));
    }

    callback(null, true);
  },
});

const audioUpload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 7,
    files: 10,
  },
  fileFilter: function (req: Request, file, callback) {
    const allowedFileTypes = ["audio/mp3", "audio/m4a"];

    if (!allowedFileTypes.includes(file.mimetype)) {
      const messages = "Somente arquivos mp3 e m4a";
      return callback(new Error(messages));
    }

    callback(null, true);
  },
});

export { photoUpload, audioUpload };
