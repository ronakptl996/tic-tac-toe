import { io } from "..";
import eventHandler from "../eventCases";
import { userDisconnect } from "../playing/userDisconnect";

const socketConnection = async () => {
  try {
    io.on("connection", async (socket: any) => {
      console.log(`${socket.id} connected!`);
      eventHandler(socket);
      socket.on("disconnect", (error: any) => {
        console.log(`Socket disconnected ${error}`);
        userDisconnect(socket);
      });
    });
  } catch (error) {
    console.log(`Error while connecting socket ${error}`);
  }
};

export { socketConnection };
