import mongoose from "mongoose";

function userFormat(data: any) {
  try {
    const { playerName, socketId } = data;
    return {
      _id: new mongoose.Types.ObjectId().toString(),
      name: playerName,
      socketid: socketId,
      sign: null,
    };
  } catch (error) {
    console.log("userFormat ERROR", error);
  }
}

const tableFormat = async (userData: any) => {
  try {
    return {
      _id: new mongoose.Types.ObjectId().toString(),
      playerInfo: [userData],
      currentTurn: null,
      currentTurnSI: -1,
      activePlayer: 0,
      maxPlayer: 2,
      board: [null, null, null, null, null, null, null, null, null],
    };
  } catch (error) {
    console.log("tableFormat ERROR", error);
  }
};

export { userFormat, tableFormat };
