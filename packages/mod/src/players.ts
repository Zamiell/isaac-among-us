// Many player methods are located on the `AmongUsGame` class.

import { GameDescriptionPlayer } from "common";
import { g } from "./globals";

export function getOurPlayer(): GameDescriptionPlayer | undefined {
  if (g.game === null) {
    return undefined;
  }

  if (g.userID === null) {
    return undefined;
  }

  const player = g.game.getPlayerFromUserID(g.userID);
  if (player === undefined) {
    return undefined;
  }

  return player;
}

export function getOurPlayerIndex(): int | undefined {
  const ourPlayer = getOurPlayer();
  return ourPlayer === undefined ? undefined : ourPlayer.index;
}
