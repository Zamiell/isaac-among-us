import { Role } from "common";
import { Game } from "./classes/Game";
import { Player } from "./classes/Player";
import { sendEndGame } from "./sendGame";

export function endGame(game: Game, winningRole: Role): void {
  sendEndGame(game, winningRole);

  game.started = false;
  resetPlayers(game);
}

function resetPlayers(game: Game) {
  const newPlayers: Player[] = [];
  for (const player of game.players) {
    const newPlayer = new Player(
      player.index,
      player.socketID,
      player.userID,
      player.username,
      player.character,
    );
    newPlayers.push(newPlayer);
  }
  game.players = newPlayers;
}
