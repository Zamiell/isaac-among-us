import { PickupVariant } from "isaac-typescript-definitions";
import { ModCallbackCustom } from "isaacscript-common";
import { mod } from "../mod";
import * as collectPennies from "../tasks/collectPennies";

export function init(): void {
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_PICKUP_COLLECT,
    coin,
    PickupVariant.COIN, // 20
  );
}

function coin(_pickup: EntityPickup) {
  collectPennies.postPickupCollectCoin();
}
