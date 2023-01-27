import { TerminatedDataToMod } from "common";
import { restart } from "isaacscript-common";
import { g } from "../globals";

export function commandTerminated(_data: TerminatedDataToMod): void {
  if (g.game === null) {
    return;
  }

  g.game = null;
  restart();
}
