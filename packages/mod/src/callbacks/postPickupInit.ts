import { ModCallback, PickupVariant } from "isaac-typescript-definitions";
import * as loadSlotMachines from "../tasks/loadSlotMachines";

export function init(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_PICKUP_INIT, pill, PickupVariant.PILL);
}

function pill(pickup: EntityPickup) {
  loadSlotMachines.postPickupInitPill(pickup);
}
