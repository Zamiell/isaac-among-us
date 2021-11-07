import { sendEndGame } from "./sendGame";
import { Game } from "./types/Game";
import { Player } from "./types/Player";
import { Role } from "./types/Role";

export function endGame(game: Game, winningRole: Role): void {
  sendEndGame(game, winningRole);

  game.started = false;
  resetPlayers(game);
}

function resetPlayers(game: Game) {
  const newPlayers: Player[] = [];
  for (const player of game.players) {
    const newPlayer = new Player(
      player.socketID,
      player.userID,
      player.username,
      player.character,
    );
    newPlayers.push(newPlayer);
  }
  game.players = newPlayers;
}
