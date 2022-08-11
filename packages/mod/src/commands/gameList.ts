import { GameListDataToMod, SocketCommandModToServer } from "common";
import { addLocalChat } from "../chat";
import * as autoLogin from "../features/autoLogin";
import g from "../globals";
import { sendTCP } from "../network/send";

export function commandGameList(data: GameListDataToMod): void {
  if (data.gameList.length === 0) {
    addLocalChat('No current games. (Create one with the "/create" command.)');
    autoLogin.onGameList(data.gameList);
    return;
  }

  let joinedToGameID: number | null = null;

  addLocalChat("Current games:");
  let i = 1;
  for (const started of [false, true]) {
    for (const game of data.gameList) {
      if (game.started !== started) {
        continue;
      }

      const startedText = started ? "ongoing" : "unstarted";
      const totalText = ` (num players: ${game.numPlayers})`;
      const joinedText = game.joined ? " (our current game)" : "";
      addLocalChat(
        `${i}) ${game.name} (${startedText})${totalText}${joinedText}`,
      );
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
