import { isKeyboardPressed } from "isaacscript-common";
import { disconnect } from "../network/socketClient";

const DISCONNECT_HOTKEY = Keyboard.KEY_F4;

let hotkeyPressed = false;

// ModCallbacks.MC_POST_UPDATE (1)
export function postUpdate(): void {
  if (isKeyboardPressed(DISCONNECT_HOTKEY)) {
    if (!hotkeyPressed) {
      hotkeyFunction();
    }
    hotkeyPressed = true;
  } else {
    hotkeyPressed = false;
  }
}

function hotkeyFunction() {
  disconnect();
}
