import { LeftDataToMod } from "common";
import g from "../globals";
import { restart } from "../utils";

export function commandLeft(data: LeftDataToMod): void {
  if (g.game === null || g.game.id !== data.gameID) {
    return;
  }

  g.game = null;
  restart();
}
