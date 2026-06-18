import http from "node:http";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { Server } from "socket.io";
import { env } from "./config/env.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";
import { apiRoutes } from "./routes/index.js";
import { initializeLiveMeetingSocket } from "./services/liveMeetingService.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: env.CLIENT_ORIGIN,
    methods: ["GET", "POST"]
  },
  maxHttpBufferSize: 1e7
});

app.use(helmet());
app.use(cors({ origin: env.CLIENT_ORIGIN }));
app.use(express.json({ limit: "2mb" }));
app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));

app.use("/api", apiRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

initializeLiveMeetingSocket(io);

server.listen(env.PORT, () => {
  console.log(`Meeting AI backend listening on port ${env.PORT}`);
});
