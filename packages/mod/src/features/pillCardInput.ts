import { ButtonAction } from "isaac-typescript-definitions";
import { isActionPressedOnAnyInput, todo } from "isaacscript-common";
import { VentState } from "../enums/VentState";
import { g } from "../globals";
import { ventSwitchRoom } from "./vents";

let isPressed = false;

// ModCallback.POST_UPDATE (1)
export function postUpdate(): void {
  checkInput();
}

function checkInput() {
  if (!isActionPressedOnAnyInput(ButtonAction.PILL_CARD)) {
    isPressed = false;
    return;
  }

  if (isPressed) {
    return;
  }
  isPressed = true;

  pillCardPressed();
}

function pillCardPressed() {
  if (g.game !== null && g.game.ventState === VentState.IN_VENT) {
    ventSwitchRoom();
    return;
  }

  todo("other actions");
}
