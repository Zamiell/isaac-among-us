import { Game } from "./types/Game";
import { Player } from "./types/Player";
import { PlayerType } from "./types/PlayerType";

export function getLowestUnusedCharacter(game: Game): PlayerType {
  const characters = new Set<PlayerType>();
  for (const player of game.players) {
    characters.add(player.character);
  }

  const validCharacters = new Set<PlayerType>();
  for (const character of Object.values(PlayerType)) {
    if (typeof character !== "string") {
      validCharacters.add(character);
    }
  }

  for (let i = 0; i < 50; i++) {
    if (!validCharacters.has(i)) {
      continue;
    }

    if (!characters.has(i)) {
      return i;
    }
  }

  throw new Error("Failed to find an available character.");
}

export function getPlayer(userID: number, game: Game): Player | null {
  for (let i = 0; i < game.players.length; i++) {
    const player = game.players[i];
    if (player.userID === userID) {
      return player;
    }
  }

  return null;
}

export function getPlayerIndex(userID: number, game: Game): number | null {
  for (let i = 0; i < game.players.length; i++) {
    const player = game.players[i];
    if (player.userID === userID) {
      return i;
    }
  }

  return null;
}

export function isPlayerInGame(userID: number, game: Game): boolean {
  for (const player of game.players) {
    if (player.userID === userID) {
      return true;
    }
  }

  return false;
}

export function isPlayerOwner(userID: number, game: Game): boolean {
  const playerIndex = getPlayerIndex(userID, game);
  return playerIndex === 0;
}

export function removePlayerFromGame(userID: number, game: Game): void {
  const playerIndex = getPlayerIndex(userID, game);
  if (playerIndex !== null) {
    game.players.splice(playerIndex, 1);
  }
}
