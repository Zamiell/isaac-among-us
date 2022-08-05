import { ModCallback } from "isaac-typescript-definitions";
import { log } from "isaacscript-common";
import * as disableMultiplayer from "../features/disableMultiplayer";

export function init(mod: Mod): void {
  mod.AddCallback(ModCallback.PRE_GAME_EXIT, main);
}

function main(shouldSave: boolean) {
  log(`MC_PRE_GAME_EXIT - shouldSave: ${shouldSave}`);

  disableMultiplayer.preGameExit(shouldSave);
}
