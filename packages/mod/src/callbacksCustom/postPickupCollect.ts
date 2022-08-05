import { PickupVariant } from "isaac-typescript-definitions";
import { ModCallbackCustom, ModUpgraded } from "isaacscript-common";
import * as collectPennies from "../tasks/collectPennies";

export function init(mod: ModUpgraded): void {
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_PICKUP_COLLECT,
    coin,
    PickupVariant.COIN, // 20
  );
}

function coin(_pickup: EntityPickup) {
  collectPennies.postPickupCollectCoin();
}
