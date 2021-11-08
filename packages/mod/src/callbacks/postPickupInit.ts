import * as loadSlotMachines from "../tasks/loadSlotMachines";

export function init(mod: Mod): void {
  mod.AddCallback(
    ModCallbacks.MC_POST_PICKUP_INIT,
    pill,
    PickupVariant.PICKUP_PILL,
  );
}

function pill(pickup: EntityPickup) {
  loadSlotMachines.postPickupInitPill(pickup);
}
