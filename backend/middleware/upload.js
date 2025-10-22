import multer from "multer";
import streamifier from "streamifier";
import cloudinary from "../utils/cloudinary.js";

// local memory storage
const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const uploadToCloudinary = (buffer, folder = "student_community") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};
