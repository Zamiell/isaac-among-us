import { TerminatedDataToMod } from "common";
import g from "../globals";
import { restart } from "../utils";

export function commandTerminated(_data: TerminatedDataToMod): void {
  if (g.game === null) {
    return;
  }

  g.game = null;
  restart();
}
