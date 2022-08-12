import { LeaveDataToServer, SocketCommandServerToMod } from "common";
import { removePlayerFromGame } from "../game";
import { games } from "../games";
import { ExtraCommandData } from "../interfaces/ExtraCommandData";
import { Socket } from "../interfaces/Socket";
import { logGameEvent } from "../log";
import {
  sendNewGameDescription,
  sendNewOwner,
  sendPlayerLeft,
} from "../sendGame";
import { sendTCP } from "../sendTCP";

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
  game.players.forEach((player, i) => {
    player.index = i;
  });

  // If the owner left, update the owner ID.
  if (userID === game.ownerUserID) {
    const firstPlayer = game.players[0];
    if (firstPlayer !== undefined) {
      game.ownerUserID = firstPlayer.userID;
      sendNewOwner(game);
    }
  }
}
