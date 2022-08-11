import { Role } from "common";
import { Game } from "./classes/Game";
import { create } from "./commands/create";
import { join } from "./commands/join";
import { games } from "./games";
import { sendEndGame } from "./sendGame";
import { getTCPSocketByUserID } from "./tcpSockets";

export function endGame(game: Game, winningRole: Role): void {
  sendEndGame(game, winningRole);

  games.delete(game.id);
  recreateGame(game);
}

function recreateGame(game: Game) {
  let newGameID: number | undefined;

  for (const player of game.players) {
    // Check if this player is online.
    const socket = getTCPSocketByUserID(player.userID);
    if (socket === undefined) {
      continue;
    }

    if (newGameID === undefined) {
      newGameID = create(player.userID, game.name, game.password);
      if (newGameID === undefined) {
        throw new Error(
          `Failed to create a new game after ending game ID: ${game.id}`,
        );
      }
    } else {
      join(player.userID, newGameID, false);
    }
  }
}
