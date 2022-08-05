import { ModCallbackCustom, ModUpgraded } from "isaacscript-common";
import * as disableMultiplayer from "../features/disableMultiplayer";

export function init(mod: ModUpgraded): void {
  mod.AddCallbackCustom(ModCallbackCustom.POST_PLAYER_INIT_LATE, main);
}

function main(player: EntityPlayer) {
  disableMultiplayer.postPlayerInitLate(player);
}
