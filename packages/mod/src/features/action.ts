import { isActionPressedOnAnyInput } from "isaacscript-common";
import { kill } from "./kill";
import { ableToKillAPlayer } from "./killSubroutines";

let isPressed = false;

// ModCallbacks.MC_POST_UPDATE (1)
export function postUpdate(): void {
  checkInput();
}

function checkInput() {
  if (!isActionPressedOnAnyInput(ButtonAction.ACTION_BOMB)) {
    isPressed = false;
    return;
  }

  if (isPressed) {
    return;
  }
  isPressed = true;

  actionPressed();
}

function actionPressed() {
  if (ableToKillAPlayer()) {
    kill();
    return;
  }

  // TODO other actions
  // eslint-disable-next-line
  const poop = "lol";
}
