import { GameListDescription, NoData, SocketCommandServerToMod } from "common";
import { isPlayerInGame } from "../game";
import { games } from "../games";
import { ExtraCommandData } from "../interfaces/ExtraCommandData";
import { Socket } from "../interfaces/Socket";
import { sendTCP } from "../sendTCP";

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
