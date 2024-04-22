import { EVENTNAME, REDISKEYS } from "../constants";
import { get, set } from "../redisOperations";
import EVENTS from "../handleEmitter";
import { userTurnStarted } from "./userTurnStarted";
import { checkWinner } from "./checkWinner";

const movePieces = async (movedata: any, socket: any) => {
  try {
    console.log("MOVE_PIECES data :: >>", socket.userId, movedata);

    let moveTable: any = await get(
      `${REDISKEYS.FULLTABLE}:${movedata.data.tableId}`
    );

    if (moveTable) {
      let userIndex = moveTable.playerInfo.findIndex(
        (userObj: any) => userObj._id == socket.userId
      );

      console.log("movetable.playerInfo", moveTable.playerInfo);
      let id = parseInt(movedata.data.id.charAt(1));
      console.log(
        "movetable.playerInfo[userIndex]",
        moveTable.playerInfo[userIndex]._id
      );
      if (moveTable.currentTurn == moveTable.playerInfo[userIndex]._id) {
        moveTable.board[id] = moveTable.playerInfo[userIndex].sign;
        await set(`${REDISKEYS.FULLTABLE}:${movedata.data.tableId}`, moveTable);

        let updateTable = await get(
          `${REDISKEYS.FULLTABLE}:${movedata.data.tableId}`
        );

        let tableId = movedata.data.tableId;
        let data: any = {
          eventName: EVENTNAME.MOVE_PIECES,
          data: {
            data: updateTable,
          },
        };
        console.log("updatetable :: >>> ", updateTable);
        EVENTS.sendToRoom(tableId, data);

        let winner = await checkWinner(updateTable, socket);
        if (winner === false) await userTurnStarted(tableId);
      }
    }
  } catch (error) {}
};

export { movePieces };
