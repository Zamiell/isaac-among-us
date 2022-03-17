import { removePlayerFromGame } from "../game";
import { games } from "../games";
import { logGameEvent } from "../log";
import { sendChat, sendNewGameDescription } from "../sendGame";
import { sendTCP } from "../sendTCP";
import { ExtraCommandData } from "../types/ExtraCommandData";
import { Socket } from "../types/Socket";
import {
  LeaveDataToServer,
  SocketCommandServerToMod,
} from "../types/SocketCommands";

export function commandLeave(
  socket: Socket,
  _data: LeaveDataToServer,
  extraData: ExtraCommandData,
): void {
  const { game } = extraData;
  const { userID, username } = socket;

  if (game === null || userID === null || username === null) {
    return;
  }

  removePlayerFromGame(userID, game);
  sendTCP(socket, SocketCommandServerToMod.LEFT, {
    gameID: game.id,
  });
  sendNewGameDescription(game);
  sendChat(game, "", `${username} left the game.`);
  logGameEvent(
    game,
    `Player "${username}" left; ${game.players.length} total players remaining.`,
  );
  if (game.players.length === 0) {
    games.delete(game.id);
    logGameEvent(game, "Deleted.");
  }

  // Update the indexes of the remaining players
  game.players.forEach((player, i) => {
    player.index = i;
  });
}
