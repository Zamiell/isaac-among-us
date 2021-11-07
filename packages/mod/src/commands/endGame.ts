import g from "../globals";
import { EndGameDataToMod } from "../types/SocketCommands";

export function commandEndGame(_data: EndGameDataToMod): void {
  if (g.game === null) {
    return;
  }

  const foo = "todo";
}
