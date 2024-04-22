import { EVENTNAME } from "../constants";
import EVENTS from "../handleEmitter";
import { clearGame } from "./clearGame";

export const checkWinner = async (data: any, socket: any) => {
  try {
    let table = data.board;
    let match = ["XXX", "OOO"];
    let winner = [
      table[0] + table[1] + table[2],
      table[3] + table[4] + table[5],
      table[6] + table[7] + table[8],
      table[0] + table[3] + table[6],
      table[1] + table[4] + table[7],
      table[2] + table[5] + table[8],
      table[0] + table[4] + table[8],
      table[2] + table[4] + table[6],
    ];

    let isTie = true;
    let winTable = false;
    for (let i = 0; i < winner.length; i++) {
      if (winner[i] === match[0]) {
        isTie = false;
        let winData = {
          eventName: EVENTNAME.WINNER,
          data: {
            data: "X",
            currentTurn: data.currentTurn,
          },
        };
        winTable = true;

        EVENTS.sendToRoom(data._id, winData);
        await clearGame(socket);
      } else if (winner[i] === match[1]) {
        isTie = false;
        let winData = {
          eventName: EVENTNAME.WINNER,
          data: {
            data: "O",
            currentTurn: data.currentTurn,
          },
        };
        winTable = true;
        EVENTS.sendToRoom(data._id, winData);
        await clearGame(socket);
      }
    }

    for (let i = 0; i < table.length; i++) {
      const element = table[i];
      if (element == null) {
        isTie = false;
      }
    }

    if (isTie) {
      let tieData = {
        eventName: EVENTNAME.WINNER,
        data: {
          data: "tie",
          currentTurn: data.currentTurn,
        },
      };
      winTable = true;
      isTie = false;
      EVENTS.sendToRoom(data._id, tieData);
      await clearGame(socket);
    }
    return winTable;
  } catch (error) {
    console.log("checkWinner ERROR :: >>", error);
  }
};
