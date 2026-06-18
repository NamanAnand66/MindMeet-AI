import { Router } from "express";
import { uploadMeetingRecording } from "../controllers/uploadController.js";
import { audioUpload } from "../middlewares/upload.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const uploadRoutes = Router();

uploadRoutes.post("/", audioUpload.single("audio"), asyncHandler(uploadMeetingRecording));
