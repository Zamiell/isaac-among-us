import g from "../globals";
import { KilledDataToMod } from "../types/SocketCommands";

export function commandKilled(_data: KilledDataToMod): void {
  if (g.game === null) {
    return;
  }

  print("TODO");
}
