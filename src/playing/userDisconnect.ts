import { EVENTNAME, REDISKEYS } from "../constants";
import EVENTS from "../handleEmitter";
import { get } from "../redisOperations";
import { clearGame } from "./clearGame";

const userDisconnect = async (socket: any) => {
  let tableData = await get(`${REDISKEYS.FULLTABLE}:${socket.tableId}`);

  if (tableData) {
    if (tableData.playerInfo.length > 1) {
      const leftUserDetails = tableData.playerInfo.find(
        (user: { _id: any }) => user._id === socket.userId
      );

      let disconnectData = {
        eventName: EVENTNAME.DISCONNECT_USER,
        data: {
          leftUserDetails,
        },
      };

      EVENTS.sendToRoom(tableData._id, disconnectData);
      await clearGame(socket);
    }
  }
};

export { userDisconnect };
