import type { LeftDataToMod } from "common";
import { restart } from "isaacscript-common";
import { g } from "../globals";

export function commandLeft(data: LeftDataToMod): void {
  if (g.game === null || g.game.id !== data.gameID) {
    return;
  }

  g.game = null;
  restart();
}
