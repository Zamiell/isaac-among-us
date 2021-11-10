import * as debugFunction from "../debugFunction";
import * as action from "../features/action";
import * as disconnectHotkey from "../features/disconnectHotkey";
import * as doors from "../features/doors";
import * as defeatMonstro from "../tasks/defeatMonstro";
import * as loadSlotMachines from "../tasks/loadSlotMachines";
import * as pushTNTBarrel from "../tasks/pushTNTBarrel";

export function main(): void {
  debugFunction.postUpdate();
  disconnectHotkey.postUpdate();
  doors.postUpdate();
  pushTNTBarrel.postUpdate();
  loadSlotMachines.postUpdate();
  defeatMonstro.postUpdate();
  action.postUpdate();
}
