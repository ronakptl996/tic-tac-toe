import express from "express";
const app = express();
import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv";
import path from "path";
import { redisConnection } from "./connections/redisConnection";
import { socketConnection } from "./connections/socketConnection";

let io: any;

(async () => {
  let server = http.createServer(app);
  io = new Server(server);
  app.use(express.json());

  // Set Path
  app.use(express.static("public"));
  app.use(express.urlencoded({ extended: true }));
  dotenv.config({
    path: "./.env",
  });

  await redisConnection();
  await socketConnection();
  const Port: string | Number = process.env.SERVER_PORT || 4300;

  app.get("/", (req, res) => {
    // res.sendFile(__dirname+'/public/index.html')
    console.log(path.join(__dirname, "../public/index.html"));
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  server.listen(Port, () => {
    console.log(`http server started at http://localhost:${Port}`);
  });
})();

export { io };
