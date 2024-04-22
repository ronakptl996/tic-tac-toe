import { REDISKEYS } from "../constants";
import { del, get, set } from "../redisOperations";

const clearGame = async (socket: any) => {
  try {
    let boardId = socket.tableId;
    if (boardId) {
      let table: any = await get(`${REDISKEYS.FULLTABLE}:${boardId}`);
      if (table && table.playerInfo[0]) {
        await del(`${REDISKEYS.PLAYERS}:${table.playerInfo[0]._id}`);
        await del(`${REDISKEYS.PLAYERS}:${table.playerInfo[1]._id}`);
        await del(`${REDISKEYS.FULLTABLE}:${table._id}`);
      }
    }
  } catch (error) {
    console.log("cleargame ERROR :: >>", error);
  }
};

export { clearGame };
