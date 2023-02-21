import { GameListDescription, NoData, SocketCommandServerToMod } from "common";
import { isPlayerInGame } from "../game.js";
import { games } from "../games.js";
import { ExtraCommandData } from "../interfaces/ExtraCommandData.js";
import { Socket } from "../interfaces/Socket.js";
import { sendTCP } from "../sendTCP.js";

export function commandGameList(
  socket: Socket,
  _data: NoData,
  _extraData: ExtraCommandData,
): void {
  const { userID } = socket;
  if (userID === undefined) {
    return;
  }

  const gameList: GameListDescription[] = [];
  for (const game of games.values()) {
    const joined = isPlayerInGame(userID, game);
    const gameDescription: GameListDescription = {
      id: game.id,
      name: game.name,
      hasPassword: game.password !== null,
      numPlayers: game.players.length,
      started: game.started,
      joined,
    };
    gameList.push(gameDescription);
  }

  sendTCP(socket, SocketCommandServerToMod.GAME_LIST, {
    gameList,
  });
}
