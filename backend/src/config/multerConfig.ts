import multer from "multer";
import path from "path";
import crypto from "crypto";

export default {
  dest: path.resolve(__dirname, "..", "storage"),
  storage: multer.diskStorage({
    destination: (req, file, callback) => { callback(null, path.resolve(__dirname, "..", "storage")) },
    filename: (req, file, callback) => {
      crypto.randomBytes(16, (error, hash) => {
        if (error) callback(error, "");

        const fileName = `${hash.toString("hex")}-${encodeURIComponent(file.originalname)}`;
        callback(null, fileName);
      })
    },
  }),
  limits: { fileSize: 16 * 1024 * 1024 },
  fileFilter: (req: unknown, file: any, callback: any) => {
    const allowedMimes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
    ];
    if (allowedMimes.includes(file.mimetype))
      callback(null, true);
    else
      callback(new Error("Invalid file type"));
  }
}