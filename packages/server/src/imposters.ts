import { IS_DEV, Role } from "common";
import type { Game } from "./classes/Game.js";
import { getRandomArrayIndex } from "./isaacScriptCommonTS.js";
import { repeat } from "./utils.js";

export function assignImpostors(game: Game): void {
  if (IS_DEV) {
    const firstPlayer = game.players[0];
    if (firstPlayer !== undefined) {
      firstPlayer.role = Role.IMPOSTER;
    }

    const secondPlayer = game.players[1];
    if (secondPlayer !== undefined) {
      secondPlayer.role = Role.CREW;
    }

    for (const player of game.players) {
      if (player.role === Role.IMPOSTER) {
        game.impostorUserIDs.push(player.userID);
      }
    }

    return;
  }

  const numImposters = getNumImposters(game);
  const imposterIndexes: number[] = [];
  repeat(numImposters, () => {
    const imposterIndex = getRandomArrayIndex(game.players, imposterIndexes);
    imposterIndexes.push(imposterIndex);
  });

  for (const index of imposterIndexes) {
    const player = game.players[index];
    if (player !== undefined) {
      player.role = Role.IMPOSTER;
      game.impostorUserIDs.push(player.userID);
    }
  }
}

function getNumImposters(game: Game) {
  if (game.players.length <= 5) {
    return 1;
  }

  return 2;
}
