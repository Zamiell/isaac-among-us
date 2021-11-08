import { ModCallbacksCustom, ModUpgraded } from "isaacscript-common";
import * as collectPennies from "../tasks/collectPennies";

export function init(mod: ModUpgraded): void {
  mod.AddCallbackCustom(
    ModCallbacksCustom.MC_POST_PICKUP_COLLECT,
    coin,
    PickupVariant.PICKUP_COIN, // 20
  );
}

function coin(_pickup: EntityPickup) {
  collectPennies.postPickupCollectCoin();
}
