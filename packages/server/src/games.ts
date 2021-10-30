import { Game } from "./types/Game";

let currentGameID = 0; // Iterates upwards

/** Indexed by game ID. */
export const games = new Map<number, Game>();

export function gameNameExists(name: string): boolean {
  const lowercaseTargetName = name.toLowerCase();
  for (const game of games.values()) {
    const lowercaseName = game.name.toLowerCase();
    if (lowercaseName === lowercaseTargetName) {
      return true;
    }
  }

  return false;
}

export function getNewGameID(): number {
  currentGameID += 1;
  return currentGameID;
}

export function getGameByName(name: string): Game | null {
  const lowercaseTargetName = name.toLowerCase();
  for (const game of games.values()) {
    const lowercaseName = game.name.toLowerCase();
    if (lowercaseName === lowercaseTargetName) {
      return game;
    }
  }

  return null;
}

export function isUserInAnyGames(userID: number): boolean {
  for (const game of games.values()) {
    for (const player of game.players) {
      if (player.userID === userID) {
        return true;
      }
    }
  }

  return false;
}
