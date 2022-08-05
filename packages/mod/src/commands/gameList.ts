import * as chat from "../chat";
import * as autoLogin from "../features/autoLogin";
import g from "../globals";
import { sendTCP } from "../network/send";
import {
  GameListDataToMod,
  SocketCommandModToServer,
} from "../types/SocketCommands";

export function commandGameList(data: GameListDataToMod): void {
  if (data.gameList.length === 0) {
    chat.addLocal('No current games. (Create one with the "/create" command.)');
    autoLogin.onGameList(data.gameList);
    return;
  }

  let joinedToGameID: number | null = null;

  chat.addLocal("Current games:");
  let i = 1;
  for (const started of [false, true]) {
    for (const game of data.gameList) {
      if (game.started !== started) {
        continue;
      }

      const startedText = started ? "ongoing" : "unstarted";
      const joinedText = game.joined ? " (current game)" : "";
      chat.addLocal(`${i}) ${game.name} (${startedText})${joinedText}`);
      i++;

      if (game.joined) {
        joinedToGameID = game.id;
      }
    }
  }

  if (joinedToGameID !== null && g.game === null) {
    sendTCP(SocketCommandModToServer.RECONNECT, {
      gameID: joinedToGameID,
    });
    return;
  }

  autoLogin.onGameList(data.gameList);
}
