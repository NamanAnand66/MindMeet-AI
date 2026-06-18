import { AppError } from "../utils/AppError.js";
import { processUploadedMeeting } from "../services/meetingService.js";

export const uploadMeetingRecording = async (req, res) => {
  if (!req.file) {
    throw new AppError("Audio file is required.", 400);
  }

  const meeting = await processUploadedMeeting({
    file: req.file,
    title: req.body.title || req.file.originalname
  });

  res.status(201).json({ success: true, data: meeting });
};
