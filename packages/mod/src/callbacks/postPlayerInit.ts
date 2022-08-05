import { ModCallback } from "isaac-typescript-definitions";
import * as disableMultiplayer from "../features/disableMultiplayer";

export function init(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_PLAYER_INIT, main);
}

function main(player: EntityPlayer) {
  disableMultiplayer.postPlayerInit(player);
}
