import { endLiveMeeting, getMeetingById, startLiveMeeting } from "../services/meetingService.js";

export const startMeeting = async (req, res) => {
  const meeting = await startLiveMeeting({ title: req.body.title });
  res.status(201).json({ success: true, data: meeting });
};

export const endMeeting = async (req, res) => {
  const meeting = await endLiveMeeting({
    meetingId: req.body.meetingId,
    segments: req.body.segments ?? []
  });
  res.json({ success: true, data: meeting });
};

export const getMeeting = async (req, res) => {
  const meeting = await getMeetingById(req.params.id);
  res.json({ success: true, data: meeting });
};
