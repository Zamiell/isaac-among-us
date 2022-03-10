import { getRandomArrayIndex } from "./array";
import { IS_DEV } from "./constants";
import { Game } from "./types/Game";
import { Role } from "./types/Role";

export function assignImpostors(game: Game): void {
  if (IS_DEV) {
    game.players[1].role = Role.IMPOSTER;
    return;
  }

  const numImposters = getNumImposters(game);
  const imposterIndexes: number[] = [];
  for (let i = 0; i < numImposters; i++) {
    let index: number;
    do {
      index = getRandomArrayIndex(game.players);
    } while (imposterIndexes.includes(index));
    imposterIndexes.push(index);
  }

  for (const index of imposterIndexes) {
    const player = game.players[index];
    if (player !== undefined) {
      player.role = Role.IMPOSTER;
      game.impostors.push(player.userID);
    }
  }
}

function getNumImposters(game: Game) {
  if (game.players.length <= 5) {
    return 1;
  }

  return 2;
}
