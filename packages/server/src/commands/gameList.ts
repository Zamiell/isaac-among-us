import { isPlayerInGame } from "../game";
import { games } from "../games";
import { sendTCP } from "../sendTCP";
import { ExtraCommandData } from "../types/ExtraCommandData";
import { Socket } from "../types/Socket";
import {
  GameListDescription,
  NoData,
  SocketCommandServerToMod,
} from "../types/SocketCommands";

export function commandGameList(
  socket: Socket,
  _data: NoData,
  _extraData: ExtraCommandData,
): void {
  const { userID } = socket;
  if (userID === null) {
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
