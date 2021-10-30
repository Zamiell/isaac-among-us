import g from "../globals";
import { LeftDataToMod } from "../types/SocketCommands";
import { restart } from "../util";

export function commandLeft(data: LeftDataToMod): void {
  if (g.game === null || g.game.id !== data.gameID) {
    return;
  }

  g.game = null;
  restart();
}
