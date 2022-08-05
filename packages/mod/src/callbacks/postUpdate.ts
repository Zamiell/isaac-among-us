import { ModCallback } from "isaac-typescript-definitions";
import * as action from "../features/action";
import * as doors from "../features/doors";
import * as defeatMonstro from "../tasks/defeatMonstro";
import * as loadSlotMachines from "../tasks/loadSlotMachines";
import * as pushTNTBarrel from "../tasks/pushTNTBarrel";

export function init(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_UPDATE, main);
}

function main() {
  doors.postUpdate();
  pushTNTBarrel.postUpdate();
  loadSlotMachines.postUpdate();
  defeatMonstro.postUpdate();
  action.postUpdate();
}
