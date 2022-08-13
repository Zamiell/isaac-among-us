import { ModCallback } from "isaac-typescript-definitions";
import * as actionInput from "../features/actionInput";
import * as doors from "../features/doors";
import * as pillCardInput from "../features/pillCardInput";
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
  actionInput.postUpdate();
  pillCardInput.postUpdate();
}
