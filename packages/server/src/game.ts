import { Game } from "./types/Game";
import { Player } from "./types/Player";
import { PlayerType } from "./types/PlayerType";
import { getEnumValues } from "./utils";

export function getLowestUnusedCharacter(game: Game): PlayerType {
  const existingCharacters = new Set<PlayerType>();
  for (const player of game.players) {
    existingCharacters.add(player.character);
  }

  const allCharacters = new Set<PlayerType>();
  for (const character of getEnumValues(PlayerType)) {
    allCharacters.add(character);
  }

  for (let i = 0; i < 50; i++) {
    // eslint-disable-next-line isaacscript/strict-enums
    if (!allCharacters.has(i)) {
      continue;
    }

    // eslint-disable-next-line isaacscript/strict-enums
    if (!existingCharacters.has(i)) {
      return i;
    }
  }

  throw new Error("Failed to find an available character.");
}

export function getPlayer(userID: number, game: Game): Player | undefined {
  return game.players.find((player) => player.userID === userID);
}

export function getPlayerIndex(userID: number, game: Game): number | undefined {
  const player = getPlayer(userID, game);
  return player?.index;
}

export function isPlayerInGame(userID: number, game: Game): boolean {
  return game.players.some((player) => player.userID === userID);
}

export function isPlayerOwner(userID: number, game: Game): boolean {
  const playerIndex = getPlayerIndex(userID, game);
  return playerIndex === 0;
}

export function removePlayerFromGame(userID: number, game: Game): void {
  const playerIndex = getPlayerIndex(userID, game);
  if (playerIndex !== undefined) {
    game.players.splice(playerIndex, 1);
  }
}
