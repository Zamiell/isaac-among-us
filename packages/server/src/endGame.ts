import type { Role } from "common";
import type { Game } from "./classes/Game.js";
import { games } from "./games.js";
import { sendEndGame } from "./sendGame.js";

export function endGame(game: Game, winningRole: Role): void {
  sendEndGame(game, winningRole);

  games.delete(game.id);
}

// We don't want to immediately recreate the game because players might be AFK, which would prevent
// the next game from starting.
/*
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
*/
