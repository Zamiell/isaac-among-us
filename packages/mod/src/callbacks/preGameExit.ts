import { log } from "isaacscript-common";
import * as disableMultiplayer from "../features/disableMultiplayer";

export function main(shouldSave: boolean): void {
  log(`MC_PRE_GAME_EXIT - shouldSave: ${shouldSave}`);

  disableMultiplayer.preGameExit(shouldSave);
}
