import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  timeout: 120000
});

export const uploadRecording = async ({ title, file }) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("audio", file);

  const { data } = await api.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });

  return data.data;
};

export const getAnalytics = async () => {
  const { data } = await api.get("/analytics");
  return data.data;
};

export const getMeeting = async (id) => {
  const { data } = await api.get(`/meeting/${id}`);
  return data.data;
};

export const askArchive = async ({ question, meetingId }) => {
  const { data } = await api.post("/chat", { question, meetingId });
  return data.data;
};
