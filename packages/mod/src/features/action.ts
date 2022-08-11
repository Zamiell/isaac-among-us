import { ButtonAction } from "isaac-typescript-definitions";
import { isActionPressedOnAnyInput, todo } from "isaacscript-common";
import { kill } from "./kill";
import { ableToKillAPlayer } from "./killSubroutines";
import { reportDeadBody } from "./report";
import { ableToReportDeadBody } from "./reportSubroutines";

let isPressed = false;

// ModCallback.POST_UPDATE (1)
export function postUpdate(): void {
  checkInput();
}

function checkInput() {
  if (!isActionPressedOnAnyInput(ButtonAction.BOMB)) {
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

  if (ableToReportDeadBody()) {
    reportDeadBody();
    return;
  }

  todo("other actions");
}
