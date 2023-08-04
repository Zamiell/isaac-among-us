import type { LeaveDataToServer } from "common";
import { SocketCommandServerToMod } from "common";
import { removePlayerFromGame } from "../game.js";
import { games } from "../games.js";
import type { ExtraCommandData } from "../interfaces/ExtraCommandData.js";
import type { Socket } from "../interfaces/Socket.js";
import { logGameEvent } from "../log.js";
import {
  sendNewGameDescription,
  sendNewOwner,
  sendPlayerLeft,
} from "../sendGame.js";
import { sendTCP } from "../sendTCP.js";

export function commandLeave(
  socket: Socket,
  _data: LeaveDataToServer,
  extraData: ExtraCommandData,
): void {
  const { game } = extraData;
  const { userID, username } = socket;

  if (game === undefined || userID === undefined || username === undefined) {
    return;
  }

  removePlayerFromGame(userID, game);
  sendTCP(socket, SocketCommandServerToMod.LEFT, {
    gameID: game.id,
  });
  sendPlayerLeft(game, userID); // This has to be before the game description is sent.
  sendNewGameDescription(game);
  logGameEvent(
    game,
    `Player "${username}" left; ${game.players.length} total players remaining.`,
  );
  if (game.players.length === 0) {
    games.delete(game.id);
    logGameEvent(game, "Deleted.");
  }

  // Update the indexes of the remaining players.
  for (const [i, player] of game.players.entries()) {
    player.index = i;
  }

  // If the owner left, update the owner ID.
  if (userID === game.ownerUserID) {
    const firstPlayer = game.players[0];
    if (firstPlayer !== undefined) {
      game.ownerUserID = firstPlayer.userID;
      sendNewOwner(game);
    }
  }
}
