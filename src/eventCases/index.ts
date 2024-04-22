import { EVENTNAME } from "../constants";
import { movePieces } from "../playing/movePieces";
import { moveSuggestion } from "../playing/moveSuggestion";
import { signUpGame } from "../playing/signUpGame";

function eventHandler(socket: any) {
  socket.onAny((eventName: string, data: any) => {
    console.log(`eventName >> :: ${eventName}`);

    switch (eventName) {
      case EVENTNAME.SIGNUP:
        signUpGame(data, socket);
        break;

      case EVENTNAME.MOVE_PIECES:
        movePieces(data, socket);
        break;

      case EVENTNAME.MOVE_SUGGESTION:
        moveSuggestion(data, socket);
        break;
    }
  });
}

export default eventHandler;
