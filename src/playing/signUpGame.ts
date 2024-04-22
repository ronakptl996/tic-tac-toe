import { EVENTNAME } from "../constants";
import { REDISKEYS } from "../constants";
import Events from "../handleEmitter";
import { tableFormat, userFormat } from "../defaultFormat";
import { del, get, getDataUsingKey, set } from "../redisOperations";
import bull from "../bull";

const signUpGame = async (signUpData: any, socket: any) => {
  try {
    signUpData.socketId = socket.id;
    let userDefault: any = userFormat(signUpData);
    console.log(userDefault);
    await set(`${REDISKEYS.PLAYERS}:${userDefault._id}`, userDefault);
    let getUser: any = await get(`${REDISKEYS.PLAYERS}:${userDefault._id}`);
    console.log("GETUSER", getUser);

    if (getUser) {
      socket.userId = getUser._id;
      let userData: any = {
        eventName: EVENTNAME.SIGNUP,
        data: {
          userId: getUser._id,
        },
      };
      Events.sendToSocket(socket.id, userData);
    }

    let getTables: any = await getDataUsingKey(REDISKEYS.TABLES);

    if (getTables?.length > 0) {
      for (let i = 0; i < getTables.length; i++) {
        if (getTables[i].playerInfo.length == 1) {
          getTables[i].playerInfo.push(getUser);
          getTables[i].activePlayer += 1;
          socket.tableId = getTables[i]._id;
          await set(`${REDISKEYS.FULLTABLE}:${getTables[i]._id}`, getTables[i]);

          await del(`${REDISKEYS.TABLES}:${getTables[i]._id}`);

          let table: any = await get(
            `${REDISKEYS.FULLTABLE}:${getTables[i]._id}`
          );
          socket.join(table._id);

          // Check Player turn who player will be play first
          if (table.activePlayer == table.maxPlayer) {
            console.log("table.activePlayer :: ", table.activePlayer);

            let firstTurn = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
            bull.addJob.delayTimer({
              time: 1000,
              jobId: getTables[i]._id,
              tableId: table._id,
              currentturn: firstTurn,
            });

            let roomData: any = {
              eventName: EVENTNAME.JOIN,
              data: {
                playerInfo: table.playerInfo,
                userId: getUser._id,
                board: table.board,
                tableId: table._id,
              },
            };
            Events.sendToRoom(table._id, roomData);
            let roomValidateData = {
              eventName: EVENTNAME.START,
              data: {
                currentturn: firstTurn,
                tableId: table._id,
                roundTimer: 5,
              },
            };
            Events.sendToRoom(table._id, roomValidateData);
          }
        }
      }
    } else {
      let gameTableDefaultFormat: any = await tableFormat(getUser);
      console.log("@@@@++++++gameTableDefaultFormat", gameTableDefaultFormat);
      gameTableDefaultFormat.activePlayer += 1;
      socket.tableId = gameTableDefaultFormat._id;

      await set(
        `${REDISKEYS.TABLES}:${gameTableDefaultFormat?._id}`,
        gameTableDefaultFormat
      );

      let board: any = await get(
        `${REDISKEYS.TABLES}:${gameTableDefaultFormat._id}`
      );

      console.log("******^&^^^^^board", board);

      socket.join(board._id);

      let roomData: any = {
        eventName: EVENTNAME.JOIN,
        data: {
          playerInfo: board.playerInfo,
          userId: getUser._id,
          board: board.board,
          tableId: board._id,
        },
      };
      Events.sendToRoom(board._id, roomData);
    }
  } catch (error) {
    console.log("joinGame ERROR", error);
  }
};

export { signUpGame };
