import { REDISKEYS } from "../constants";
import { get } from "../redisOperations";
import EVENTS from "../handleEmitter";
import { EVENTNAME } from "../constants";

const moveSuggestion = async (data: any, socket: any) => {
  try {
    console.log("MOVE SUGGESTION:: >>", data);

    let tableData: any = await get(`${REDISKEYS.FULLTABLE}:${data.tableId}`);
    console.log("tableData:: >>", tableData);

    let board = tableData.board;

    if (tableData) {
      let currentMoveUser = tableData.playerInfo[tableData.currentTurnSI];
      console.log("currentMoveUser :: >", currentMoveUser);

      let currentMoveUserSign = currentMoveUser.sign;
      let oppoUserSign;
      if (currentMoveUserSign == "X") {
        oppoUserSign = "O";
      } else {
        oppoUserSign = "X";
      }

      let ranNumber = board[Math.floor(Math.random() * board.length - 1) + 1];
      if (currentMoveUser) {
        if (
          board[0] == currentMoveUserSign &&
          board[1] == currentMoveUserSign &&
          board[2] == null
        ) {
          ranNumber = 2;
          console.log("condition 25 called", board);
        } else if (
          board[0] == currentMoveUserSign &&
          board[2] == currentMoveUserSign &&
          board[1] == null
        ) {
          ranNumber = 1;
          console.log("condition 26 called", board);
        } else if (
          board[1] == currentMoveUserSign &&
          board[2] == currentMoveUserSign &&
          board[0] == null
        ) {
          ranNumber = 0;
          console.log("condition 27 called", board);
        } else if (
          board[3] == currentMoveUserSign &&
          board[4] == currentMoveUserSign &&
          board[5] == null
        ) {
          ranNumber = 5;
          console.log("condition 28 called", board);
        } else if (
          board[3] == currentMoveUserSign &&
          board[5] == currentMoveUserSign &&
          board[4] == null
        ) {
          ranNumber = 4;
          console.log("condition 29 called", board);
        } else if (
          board[4] == currentMoveUserSign &&
          board[5] == currentMoveUserSign &&
          board[3] == null
        ) {
          ranNumber = 3;
          console.log("condition 30 called", board);
        } else if (
          board[6] == currentMoveUserSign &&
          board[7] == currentMoveUserSign &&
          board[8] == null
        ) {
          ranNumber = 8;
          console.log("condition 31 called", board);
        } else if (
          board[6] == currentMoveUserSign &&
          board[8] == currentMoveUserSign &&
          board[7] == null
        ) {
          ranNumber = 7;
          console.log("condition 32 called", board);
        } else if (
          board[7] == currentMoveUserSign &&
          board[8] == currentMoveUserSign &&
          board[6] == null
        ) {
          ranNumber = 6;
          console.log("condition 33 called", board);
        } else if (
          board[0] == currentMoveUserSign &&
          board[3] == currentMoveUserSign &&
          board[6] == null
        ) {
          ranNumber = 6;
          console.log("condition 34 called", board);
        } else if (
          board[0] == currentMoveUserSign &&
          board[6] == currentMoveUserSign &&
          board[3] == null
        ) {
          ranNumber = 3;
          console.log("condition 35 called", board);
        } else if (
          board[3] == currentMoveUserSign &&
          board[6] == currentMoveUserSign &&
          board[0] == null
        ) {
          ranNumber = 0;
          console.log("condition 36 called", board);
        } else if (
          board[1] == currentMoveUserSign &&
          board[4] == currentMoveUserSign &&
          board[7] == null
        ) {
          ranNumber = 7;
          console.log("condition 37 called", board);
        } else if (
          board[1] == currentMoveUserSign &&
          board[7] == currentMoveUserSign &&
          board[4] == null
        ) {
          ranNumber = 4;
          console.log("condition 38 called", board);
        } else if (
          board[4] == currentMoveUserSign &&
          board[7] == currentMoveUserSign &&
          board[1] == null
        ) {
          ranNumber = 1;
          console.log("condition 39 called", board);
        } else if (
          board[2] == currentMoveUserSign &&
          board[5] == currentMoveUserSign &&
          board[8] == null
        ) {
          ranNumber = 8;
          console.log("condition 40 called", board);
        } else if (
          board[2] == currentMoveUserSign &&
          board[8] == currentMoveUserSign &&
          board[5] == null
        ) {
          ranNumber = 5;
          console.log("condition 41 called", board);
        } else if (
          board[5] == currentMoveUserSign &&
          board[8] == currentMoveUserSign &&
          board[2] == null
        ) {
          ranNumber = 2;
          console.log("condition 41 called", board);
        } else if (
          board[0] == currentMoveUserSign &&
          board[4] == currentMoveUserSign &&
          board[8] == null
        ) {
          ranNumber = 8;
          console.log("condition 42 called", board);
        } else if (
          board[0] == currentMoveUserSign &&
          board[8] == currentMoveUserSign &&
          board[4] == null
        ) {
          ranNumber = 4;
          console.log("condition 43 called", board);
        } else if (
          board[4] == currentMoveUserSign &&
          board[8] == currentMoveUserSign &&
          board[0] == null
        ) {
          ranNumber = 0;
          console.log("condition 44 called", board);
        } else if (
          board[2] == currentMoveUserSign &&
          board[4] == currentMoveUserSign &&
          board[6] == null
        ) {
          ranNumber = 6;
          console.log("condition 45 called", board);
        } else if (
          board[2] == currentMoveUserSign &&
          board[6] == currentMoveUserSign &&
          board[4] == null
        ) {
          ranNumber = 4;
          console.log("condition 46 called", board);
        } else if (
          board[4] == currentMoveUserSign &&
          board[6] == currentMoveUserSign &&
          board[2] == null
        ) {
          ranNumber = 2;
          console.log("condition 47 called", board);
        } else if (
          board[0] == oppoUserSign &&
          board[1] == oppoUserSign &&
          board[2] == null
        ) {
          console.log("cond 1 call");
          ranNumber = 2;
        } else if (
          board[0] == oppoUserSign &&
          board[2] == oppoUserSign &&
          board[1] == null
        ) {
          ranNumber = 1;
          console.log("condition 2 called");
        } else if (
          board[1] == oppoUserSign &&
          board[2] == oppoUserSign &&
          board[0] == null
        ) {
          ranNumber = 0;
          console.log("condition 3 called");
        } else if (
          board[3] == oppoUserSign &&
          board[4] == oppoUserSign &&
          board[5] == null
        ) {
          ranNumber = 5;
          console.log("condition 4 called", board);
        } else if (
          board[3] == oppoUserSign &&
          board[5] == oppoUserSign &&
          board[4] == null
        ) {
          ranNumber = 4;
          console.log("condition 5 called", board);
        } else if (
          board[4] == oppoUserSign &&
          board[5] == oppoUserSign &&
          board[3] == null
        ) {
          ranNumber = 3;
          console.log("condition 6 called", board);
        } else if (
          board[6] == oppoUserSign &&
          board[7] == oppoUserSign &&
          board[8] == null
        ) {
          ranNumber = 8;
          console.log("condition 7 called", board);
        } else if (
          board[6] == oppoUserSign &&
          board[8] == oppoUserSign &&
          board[7] == null
        ) {
          ranNumber = 7;
          console.log("condition 8 called", board);
        } else if (
          board[7] == oppoUserSign &&
          board[8] == oppoUserSign &&
          board[6] == null
        ) {
          ranNumber = 6;
          console.log("condition 9 called", board);
        } else if (
          board[0] == oppoUserSign &&
          board[3] == oppoUserSign &&
          board[6] == null
        ) {
          ranNumber = 6;
          console.log("condition 10 called", board);
        } else if (
          board[0] == oppoUserSign &&
          board[6] == oppoUserSign &&
          board[3] == null
        ) {
          ranNumber = 3;
          console.log("condition 11 called", board);
        } else if (
          board[3] == oppoUserSign &&
          board[6] == oppoUserSign &&
          board[0] == null
        ) {
          ranNumber = 0;
          console.log("condition 12 called", board);
        } else if (
          board[1] == oppoUserSign &&
          board[4] == oppoUserSign &&
          board[7] == null
        ) {
          ranNumber = 7;
          console.log("condition 13 called", board);
        } else if (
          board[1] == oppoUserSign &&
          board[7] == oppoUserSign &&
          board[4] == null
        ) {
          ranNumber = 4;
          console.log("condition 14 called", board);
        } else if (
          board[4] == oppoUserSign &&
          board[7] == oppoUserSign &&
          board[1] == null
        ) {
          ranNumber = 1;
          console.log("condition 15 called", board);
        } else if (
          board[2] == oppoUserSign &&
          board[5] == oppoUserSign &&
          board[8] == null
        ) {
          ranNumber = 8;
          console.log("condition 16 called", board);
        } else if (
          board[2] == oppoUserSign &&
          board[8] == oppoUserSign &&
          board[5] == null
        ) {
          ranNumber = 5;
          console.log("condition 17 called", board);
        } else if (
          board[5] == oppoUserSign &&
          board[8] == oppoUserSign &&
          board[2] == null
        ) {
          ranNumber = 2;
          console.log("condition 18 called", board);
        } else if (
          board[0] == oppoUserSign &&
          board[4] == oppoUserSign &&
          board[8] == null
        ) {
          ranNumber = 8;
          console.log("condition 19 called", board);
        } else if (
          board[0] == oppoUserSign &&
          board[8] == oppoUserSign &&
          board[4] == null
        ) {
          ranNumber = 4;
          console.log("condition 20 called", board);
        } else if (
          board[4] == oppoUserSign &&
          board[8] == oppoUserSign &&
          board[0] == null
        ) {
          ranNumber = 0;
          console.log("condition 21 called", board);
        } else if (
          board[2] == oppoUserSign &&
          board[4] == oppoUserSign &&
          board[6] == null
        ) {
          ranNumber = 6;
          console.log("condition 22 called", board);
        } else if (
          board[2] == oppoUserSign &&
          board[6] == oppoUserSign &&
          board[4] == null
        ) {
          ranNumber = 4;
          console.log("condition 23 called", board);
        } else if (
          board[4] == oppoUserSign &&
          board[6] == oppoUserSign &&
          board[2] == null
        ) {
          ranNumber = 2;
          console.log("condition 24 called", board);
        } else if (
          (board[0] == currentMoveUserSign ||
            board[2] == currentMoveUserSign ||
            board[6] == currentMoveUserSign ||
            board[8] == currentMoveUserSign) &&
          board[4] == null
        ) {
          ranNumber = 4;
          console.log("condition 48 called", board);
        } else if (
          (board[1] == currentMoveUserSign ||
            board[3] == currentMoveUserSign ||
            board[5] == currentMoveUserSign ||
            board[7] == currentMoveUserSign) &&
          board[1] != oppoUserSign &&
          board[3] != oppoUserSign &&
          board[5] != oppoUserSign &&
          board[7] != oppoUserSign
        ) {
          console.log("condition new :: >> ");
          if (board[1] == null) ranNumber = 1;
          else if (board[3] == null) ranNumber = 3;
          else if (board[5] == null) ranNumber = 5;
          else if (board[7] == null) ranNumber = 7;
        } else if (board[4] == currentMoveUserSign) {
          console.log("condition 49 called", board);
          if (board[0] == null) ranNumber = 0;
          else if (board[2] == null) ranNumber = 2;
          else if (board[6] == null) ranNumber = 6;
          else if (board[8] == null) ranNumber = 8;
        }
      }

      EVENTS.sendToSocket(currentMoveUser.socketid, {
        eventName: EVENTNAME.MOVE_SUGGESTION,
        id: "A" + ranNumber,
      });
    }
  } catch (error) {
    console.log(`MOVE SUGGESTION ERROR: ${error}`);
  }
};

export { moveSuggestion };
