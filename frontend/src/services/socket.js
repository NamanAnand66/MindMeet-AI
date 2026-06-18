import { io } from "socket.io-client";

export const createMeetingSocket = () =>
  io(import.meta.env.VITE_SOCKET_URL || "http://localhost:8080", {
    transports: ["websocket"],
    autoConnect: false
  });
