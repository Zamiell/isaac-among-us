import g from "../globals";
import { TerminatedDataToMod } from "../types/SocketCommands";
import { restart } from "../utils";

export function commandTerminated(_data: TerminatedDataToMod): void {
  if (g.game === null) {
    return;
  }

  g.game = null;
  restart();
}
