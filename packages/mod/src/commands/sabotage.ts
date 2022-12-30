import { SabotageDataToMod } from "common";
import { todo } from "isaacscript-common";
import g from "../globals";

export function commandSabotage(_data: SabotageDataToMod): void {
  if (g.game === null) {
    return;
  }

  todo();
}
