import { Router } from "express";
import { endMeeting, getMeeting, startMeeting } from "../controllers/meetingController.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const meetingRoutes = Router();

meetingRoutes.post("/start", asyncHandler(startMeeting));
meetingRoutes.post("/end", asyncHandler(endMeeting));
meetingRoutes.get("/:id", asyncHandler(getMeeting));
