import { ModCallback } from "isaac-typescript-definitions";
import * as disableMultiplayer from "../features/disableMultiplayer";
import { mod } from "../mod";

export function init(): void {
  mod.AddCallback(ModCallback.POST_PLAYER_INIT, main);
}

function main(player: EntityPlayer) {
  disableMultiplayer.postPlayerInit(player);
}
