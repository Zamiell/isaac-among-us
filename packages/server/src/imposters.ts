import { IS_DEV, Role } from "common";
import { getRandomArrayIndex } from "./array";
import { Game } from "./classes/Game";
import { repeat } from "./utils";

export function assignImpostors(game: Game): void {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (IS_DEV) {
    const firstPlayer = game.players[0];
    if (firstPlayer !== undefined) {
      firstPlayer.role = Role.CREW;
    }

    const secondPlayer = game.players[1];
    if (secondPlayer !== undefined) {
      secondPlayer.role = Role.IMPOSTER;
      game.impostorUserIDs.push(secondPlayer.userID);
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
