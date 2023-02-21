import { PlayerTypeAllowed } from "common";
import { Game } from "./classes/Game.js";
import { Player } from "./classes/Player.js";
import { getEnumValues } from "./utils.js";

export function getLowestUnusedCharacter(game: Game): PlayerTypeAllowed {
  const existingCharacters = new Set<PlayerTypeAllowed>();
  for (const player of game.players) {
    existingCharacters.add(player.character);
  }

  const allCharacters = new Set<PlayerTypeAllowed>();
  for (const character of getEnumValues(PlayerTypeAllowed)) {
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

export function getOwner(game: Game): Player {
  const player = getPlayer(game.ownerUserID, game);
  if (player === undefined) {
    throw new Error(`Failed to find the owner of game ID: ${game.id}`);
  }

  return player;
}

export function removePlayerFromGame(userID: number, game: Game): void {
  const playerIndex = getPlayerIndex(userID, game);
  if (playerIndex !== undefined) {
    game.players.splice(playerIndex, 1);
  }
}
