import { Game } from "./classes/Game.js";

let currentGameID = 0; // Iterates upwards

/** Indexed by game ID. */
export const games = new Map<number, Game>();

export function getNewGameID(): number {
  currentGameID++;
  return currentGameID;
}

export function getGameByName(name: string): Game | undefined {
  const lowercaseTargetName = name.toLowerCase();
  for (const game of games.values()) {
    const lowercaseName = game.name.toLowerCase();
    if (lowercaseName === lowercaseTargetName) {
      return game;
    }
  }

  return undefined;
}

export function doesGameIDExist(gameID: number): boolean {
  return games.has(gameID);
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
